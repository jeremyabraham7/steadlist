import { Args, Query, Resolver, Arg, Mutation, Int } from "type-graphql"
import { GraphQLError } from 'graphql'
import { Inject, Service } from "typedi"
import NoNoWords from 'bad-words'

import { FindFirstIdeaArgs, FindManyIdeaArgs, AggregateIdeaArgs } from "@generated"

import { prisma } from "../../lib/prisma"
import { Idea } from "./idea.model"
import { IdeaService } from "./idea.service"
import { IdeasResponse, IdeaWithVoteCountsResponse } from "./responses/ideas.response"
import { IdeaStats } from "./responses/stats.response"
import { createIdeaInput } from "./inputs/create.input"
import { GPT3Service } from '../gpt3/gpt3.service'
import { IdeaContext } from "./inputs/context.input"

// DATA
import BadWords from '../../lib/data/bad-words'
import { CategoryTopics } from '../../lib/data/categories__topics-rev1'
import Modalities from "../../lib/data/modalities"

// TODO: FIX TYPESCRIPT
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const randomEl = (arr) => arr[Math.floor(Math.random() * arr?.length)]

@Service()
@Resolver(() => Idea)
export default class IdeaResolver {
    @Inject(() => IdeaService)
        ideaService: IdeaService
    @Inject(() => GPT3Service)
        gpt3: GPT3Service

    @Query(() => Idea, { nullable: true })
    async idea(@Args() args: FindFirstIdeaArgs): Promise<Idea | null> {
        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await prisma.idea.findFirst(args)
    }

    @Query(() => IdeaWithVoteCountsResponse, { nullable: true })
    async randomIdea(@Arg("data") data: IdeaContext, @Args() args: FindFirstIdeaArgs): Promise<IdeaWithVoteCountsResponse | null> {
        const { userId, category, subcategory } = data
        return this.ideaService.getRandomIdea(userId, category, subcategory)
    }


    @Query(() => IdeasResponse)
    async ideas(
            @Arg("userId", { nullable: true }) userId: string, 
            @Arg("orderBy", { nullable: true }) orderBy: string, 
            @Arg("createdAt", type => [Int], { nullable: true }) createdAt: number[], 
            @Args() args: FindManyIdeaArgs
    ): Promise<IdeasResponse> {
        const items = this.ideaService.listIdeasWithContext(userId, orderBy, createdAt)
        const count = await prisma.idea.count({ ...args, take: undefined, skip: undefined })
        
        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return { items, count }
    }

    /**
     * Create Random Idea -- used for automatic idea generation
     */
    // TODO: Dont allow public access
    @Mutation(() => Boolean)
    async createRandomIdeas (): Promise<Boolean> {

        // Get random categories/topics
        const cats = CategoryTopics

            // Lets not randomly generate for these categories
            // TODO: FIX TYPESCRIPT
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .filter(c => ['IT & Software', 'Development', 'Office Productivity'].includes(c.value) == false)

        const category = randomEl(cats)
        const subcategory = randomEl(category.subcats)

        // Mix in user prompts
        const prompts = await this.ideaService.getTopPrompts(category?.value, subcategory?.value)
        console.info(`[INFO] ${prompts.length} user prompts for "${category?.value} > ${subcategory?.value}": `, prompts)

        // NOTE because there is no limit on the number of user prompts we're pulling at any given time
        //      our hard coded random prompts should become less used
        const topic = randomEl([ 
            ...prompts.map(p => p.userInput),
            ...subcategory.topics
        ])

        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // console.log('CREATE RANDOM', topic?.title, category?.label, subcategory?.label)
        await this.createIdea({ topic, category: category?.value, subcategory: subcategory?.value })
        return true
    }

    /**
     * Create new set of ideas from prompt/categories
     */
    @Mutation(() => IdeasResponse)
    async createIdea(@Arg("data") data: createIdeaInput/*, @Args() args: FindManyIdeaArgs*/): Promise<IdeasResponse> {

        const { userId, topic, category, subcategory } = data

        // Check for inappropriate content
        const NoNoFilter = new NoNoWords()
        NoNoFilter.addWords(...BadWords)

        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (NoNoFilter.isProfane(topic)) throw new GraphQLError(`This topic would result in inappropriate or offensive content`, { extensions: { code: 'CONTENT_INAPPROPRIATE' } })
        if (topic.trim().length < 5) throw new GraphQLError(`Topic too short`/*, { extensions: { code: 'VALIDATION_TOO_LONG' } }*/)
        if (topic.length > 100) throw new GraphQLError(`Topic too long`/*, { extensions: { code: 'VALIDATION_TOO_LONG' } }*/)

        const modality = randomEl(Modalities) // random modality
        const prompt = modality.prompt({ topic, category, subcategory })
        console.log(prompt)

        const ideas = await this.gpt3.completion({
            prompt,
            max_tokens: 150,
            temperature: 0.7,
            top_p: 1,
            presence_penalty: 0,
            frequency_penalty: 0,
            stop: ["\n4."],
        })
        console.log(ideas.data)

        // TODO: Move to service?
        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const text = [...ideas.data.choices[0].text?.matchAll(/^[0-9].\s(.*?)$/gm)]
        const cleanedIdeas = text.map(match => match[1])
        // --- type/grammer fixes?

        // console.log(topic, category)
        // console.log(cleanedIdeas)

        // Save to database
        const items = await prisma.$transaction(
            cleanedIdeas.map((text) => prisma.idea.create({
                data: {
                    text,
                    prompt,
                    category,
                    subcategory,
                    userInput: topic,
                    modality: modality.value,
                    status: userId ? 'DRAFT' : 'PUBLISHED', // dont auto-publish user content
                    userId,
                },
            }))
        )

        // console.log(items)

        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return { items }
    }

    @Query(() => IdeaStats)
    async ideaStats(@Args() args: AggregateIdeaArgs): Promise<IdeaStats> {
        // Force status where clause
        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (args.where) args.where.status = 'PUBLISHED'
        
        // Force date where clause
        const todayArgs = args
        if (todayArgs.where) todayArgs.where.createdAt = { gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) }
        
        const [ total, today ] = await Promise.all([
            // Total Stats
            prisma.idea.aggregate({
                where: { status: 'PUBLISHED' },
                ...args,
                
                _count: true,
            }),
            
            // Today Stats
            prisma.idea.aggregate({
                where: { status: 'PUBLISHED', createdAt: { gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)) } },
                ...todayArgs,
                
                _count: true,
            })
        ])

        // console.log(total, today)
        return { 
            totalCount: total._count, 
            todayCount: today._count,
        }
    }
}
