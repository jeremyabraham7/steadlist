import { Service } from "typedi"
import { prisma } from "../../lib/prisma"
import { IdeasResponse, IdeaWithVoteCountsResponse } from "./responses/ideas.response"

const PROMPT_THRESHOLD = 2 // Net votes required for a prompt to be included in random idea generation

/**
 * Rough Query Builder for all the RAW queries we're forced to use with Prisma :(
 */
const Query = {

    voteDateFilter (createdAt?: number[] | undefined) {
        // DATE FILTER
        let VOTE_DATE_FILTER = ''
        if (createdAt) VOTE_DATE_FILTER = `AND "public"."Vote"."createdAt" BETWEEN CURRENT_DATE - ${createdAt[0] || 0} AND CURRENT_DATE - ${createdAt[1] || 0}`

        return VOTE_DATE_FILTER
    },

    voteContext (voteCreatedAt?: number[] | undefined) {
        const SELECT = `,
            COALESCE("down"._aggr_count_votes, 0)::INTEGER as downvotes,
            COALESCE("up"._aggr_count_votes, 0)::INTEGER as upvotes,
            COALESCE("lul"._aggr_count_votes, 0)::INTEGER as lulvotes,
            (COALESCE("up"._aggr_count_votes, 0)::INTEGER + COALESCE("down"._aggr_count_votes, 0)::INTEGER + COALESCE("lul"._aggr_count_votes, 0)::INTEGER) as total_votes,
            (COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) as net_votes,
            to_json(user_vote) as user_vote`


        // TODO: See about limiting joins by using some sort of GROUP BY on vote.type
        const FROM = `
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'UP' ${Query.voteDateFilter(voteCreatedAt)} GROUP BY "public"."Vote"."ideaId") 
                AS "up" ON ("public"."Idea"."id" = "up"."ideaId")
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'DOWN' ${Query.voteDateFilter(voteCreatedAt)} GROUP BY "public"."Vote"."ideaId") 
                AS "down" ON ("public"."Idea"."id" = "down"."ideaId")
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'LUL' ${Query.voteDateFilter(voteCreatedAt)} GROUP BY "public"."Vote"."ideaId") 
                AS "lul" ON ("public"."Idea"."id" = "lul"."ideaId")
            LEFT JOIN 
                (SELECT * FROM "public"."Vote" WHERE "public"."Vote"."userId"::text = $1) 
                AS "user_vote" ON ("public"."Idea"."id" = "user_vote"."ideaId")`
        
        return { FROM, SELECT }
    }
}


@Service()
export class IdeaService {

    /**
     * QUERIES
     */
    async listIdeasWithContext(userId: string, orderBy: string, createdAt: number[]): Promise<IdeasResponse> {
        // SORT
        // Default to top voted
        let SORT = `ORDER BY (COALESCE("up"._aggr_count_votes, 0) - COALESCE("down"._aggr_count_votes, 0)) DESC`
        if (orderBy == 'new') SORT = `ORDER BY "public"."Idea"."createdAt" DESC`
        if (orderBy == 'lul') SORT = `ORDER BY (COALESCE("up"._aggr_count_votes, 0) - COALESCE("down"._aggr_count_votes, 0)) DESC`

        // Use our homebrewed query builder
        const { FROM, SELECT } = Query.voteContext(createdAt)

        // Query
        return await prisma.$queryRawUnsafe(`
            SELECT 
                "public"."Idea".*
                ${SELECT}
            FROM 
                "public"."Idea"
                ${FROM}
            WHERE 
                "public"."Idea".status = 'PUBLISHED'
            ${SORT}
            LIMIT 25`, userId)
    }

    // Used for training data
    async listTopIdeas(): Promise<IdeasResponse> {
        let stats = await prisma.$queryRaw`
            SELECT 
                COUNT("public"."Idea".id)::INTEGER as count,
                MAX(COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) as max_votes,
                MIN(COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) as min_votes
            FROM 
                "public"."Idea"
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'UP' GROUP BY "public"."Vote"."ideaId") 
                AS "up" ON ("public"."Idea"."id" = "up"."ideaId")
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'DOWN' GROUP BY "public"."Vote"."ideaId") 
                AS "down" ON ("public"."Idea"."id" = "down"."ideaId")
            WHERE "public"."Idea".status = 'PUBLISHED'`

        // TODO: FIX TYPESCRIPT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        stats = stats[0]

        // console.log('stats', stats)

        // Get top 20% of ideas
        return await prisma.$queryRawUnsafe<IdeasResponse>(`
            SELECT 
                "public"."Idea".*,
                COALESCE("down"._aggr_count_votes, 0)::INTEGER as downvotes,
                COALESCE("up"._aggr_count_votes, 0)::INTEGER as upvotes,
                (COALESCE("up"._aggr_count_votes, 0)::INTEGER + COALESCE("down"._aggr_count_votes, 0)::INTEGER) as total_votes,
                (COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) as net_votes
            FROM 
                "public"."Idea"
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'UP' GROUP BY "public"."Vote"."ideaId") 
                AS "up" ON ("public"."Idea"."id" = "up"."ideaId")
            LEFT JOIN 
                (SELECT "public"."Vote"."ideaId", COUNT(*) AS "_aggr_count_votes" FROM "public"."Vote" WHERE "public"."Vote"."type" = 'DOWN' GROUP BY "public"."Vote"."ideaId") 
                AS "down" ON ("public"."Idea"."id" = "down"."ideaId")
            WHERE "public"."Idea".status = 'PUBLISHED'
            ORDER BY (COALESCE("up"._aggr_count_votes, 0) - COALESCE("down"._aggr_count_votes, 0)) DESC
            LIMIT ${
            // TODO: FIX TYPESCRIPT
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Math.ceil(stats.count * 0.20) || 100
            }`)
    }

    async getIdeaWithContext(ideaId: string, userId: string): Promise<IdeaWithVoteCountsResponse | null> {
        const { FROM, SELECT } = Query.voteContext()
        const res = await prisma.$queryRawUnsafe<[IdeaWithVoteCountsResponse]>(`
            SELECT 
                "public"."Idea".*
                ${SELECT}
            FROM 
                "public"."Idea"
                ${FROM}
            WHERE "public"."Idea".id::TEXT = $2
            ORDER BY (COALESCE("up"._aggr_count_votes, 0) - COALESCE("down"._aggr_count_votes, 0)) DESC
            LIMIT 1
        `, userId, ideaId)
        return res[0]
    }

    async getRandomIdea(userId: string, category: string | null, subcategory: string | null): Promise<IdeaWithVoteCountsResponse | null> {
        const { FROM, SELECT } = Query.voteContext()
        const res = await prisma.$queryRawUnsafe<[IdeaWithVoteCountsResponse]>(`
            SELECT 
                "public"."Idea".*
                ${SELECT}
            FROM 
                "public"."Idea"
                ${FROM}
            WHERE 
                "public"."Idea".status = 'PUBLISHED'
                AND user_vote IS NULL -- user hasnt voted for this
                AND (COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) > -3
                ${ category ? `AND "public"."Idea".category = $2` : '' }
                ${ subcategory ? `AND "public"."Idea".subcategory = $3` : '' }
            ORDER BY random() DESC -- randomize
            LIMIT 1`, userId, category || '', subcategory || '')
        return res[0]
    }

    async getTopPrompts(category: string | null, subcategory: string | null): Promise<[IdeaWithVoteCountsResponse]> {
        const { FROM } = Query.voteContext()
        const res = await prisma.$queryRawUnsafe<[IdeaWithVoteCountsResponse]>(`
            SELECT 
                LOWER("public"."Idea"."userInput") as "userInput",
                (SUM(COALESCE("up"._aggr_count_votes, 0))::INTEGER - SUM(COALESCE("down"._aggr_count_votes, 0))::INTEGER) as net_votes
            FROM 
                "public"."Idea"
                ${FROM}
            WHERE 
                "public"."Idea".status = 'PUBLISHED'
                AND "public"."Idea"."userId" IS NOT NULL

                -- This is only getting ideas with >3 net votes vs getting all and filtering prompts with total of >3 net votes across all ideas
                -- AND (COALESCE("up"._aggr_count_votes, 0)::INTEGER - COALESCE("down"._aggr_count_votes, 0)::INTEGER) > ${PROMPT_THRESHOLD}
                ${ category ? `AND "public"."Idea".category = $2` : '' }
                ${ subcategory ? `AND "public"."Idea".subcategory = $3` : '' }
            GROUP BY "userInput"
            HAVING (SUM(COALESCE("up"._aggr_count_votes, 0))::INTEGER - SUM(COALESCE("down"._aggr_count_votes, 0))::INTEGER) > ${PROMPT_THRESHOLD}
            ORDER BY (SUM(COALESCE("up"._aggr_count_votes, 0)) - SUM(COALESCE("down"._aggr_count_votes, 0))) DESC`,
        '', category || '', subcategory || '')

        return res
    }

}
