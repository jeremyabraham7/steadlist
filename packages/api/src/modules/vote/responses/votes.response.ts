import { ObjectType } from "type-graphql"

import { ConnectionResponse } from "../../shared/response/connection.response"
import { Vote } from "../vote.model"

// @ObjectType({ isAbstract: true })
// export class IdeaWithVoteCounts extends Vote implements Prisma.Vote {
//     // @Field(() => Float) downvotes: number
//     // @Field(() => Float) upvotes: number
//     // @Field(() => Float) total_votes: number
//     // @Field(() => Float) net_votes: number
// }

@ObjectType()
export class VotesResponse extends ConnectionResponse(() => [Vote]) {}
