import { Args, Arg, Query, Resolver, Mutation } from "type-graphql"
import { Service, Inject } from "typedi"
import { IdeaService } from "../idea/idea.service"

import { FindFirstVoteArgs, FindManyVoteArgs } from "@generated"

import { prisma } from "../../lib/prisma"
import { Vote } from "./vote.model"
import { IdeaWithVoteCountsResponse } from "../idea/responses/ideas.response"
import { VotesResponse } from "./responses/votes.response"
import { AddVoteInput } from "./inputs/addVote.input"

@Service()
@Resolver(() => Vote)
export default class VoteResolver {
    @Inject(() => IdeaService)
        ideaService: IdeaService

    @Query(() => Vote, { nullable: true })
    async vote(@Args() args: FindFirstVoteArgs): Promise<Vote | null> {
        return await prisma.vote.findFirst(args)
    }

    @Query(() => VotesResponse)
    async votes(@Args() args: FindManyVoteArgs): Promise<VotesResponse> {
        const items = await prisma.vote.findMany({ ...args })
        const count = await prisma.vote.count({ ...args, take: undefined, skip: undefined })
        return { items, count }
    }

    @Mutation(() => IdeaWithVoteCountsResponse)
    async addVote(@Arg('data') data: AddVoteInput): Promise<IdeaWithVoteCountsResponse | null> {
        const { userId, ideaId, type } = data
        await prisma.vote.upsert({
            where: {
                userVoteId: { userId, ideaId }
            },
            update: { userId, ideaId, type },
            create: { userId, ideaId, type }
        })
        const res = await this.ideaService.getIdeaWithContext(ideaId, userId)
        
        // Is this DRAFT and made by same user? Set to PUBLISHED when voted
        if (res?.status == 'DRAFT' && res?.userId == userId && type == 'UP') {
            await prisma.idea.update({ where: { id: res.id }, data: { status: 'PUBLISHED' } })
            res.status = 'PUBLISHED'
        }

        // Send it off!
        console.log(res)
        return res
    }
}
