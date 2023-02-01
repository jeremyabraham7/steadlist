import * as Prisma from "@prisma/client"
import { ObjectType, Field, Float } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Idea } from "../idea.model"
import { Vote } from "../../vote/vote.model"

@ObjectType({ isAbstract: true })
export class IdeaWithVoteCountsResponse extends Idea implements Prisma.Idea {
    @Field(() => Float) downvotes: number
    @Field(() => Float) upvotes: number
    @Field(() => Float) lulvotes: number
    @Field(() => Float) total_votes: number
    @Field(() => Float) net_votes: number

    @Field({ nullable: true }) user_vote?: Vote
}

@ObjectType()
export class IdeasResponse extends ConnectionResponse(() => [IdeaWithVoteCountsResponse]) {}
export class Ideas extends ConnectionResponse(() => [Idea]) {}
