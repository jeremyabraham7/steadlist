import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { VoteType } from "@generated"
import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Vote extends BaseModel implements Prisma.Vote {
    @Field() id: string
    @Field() ideaId: string
    @Field() userId: string

    @Field(() => VoteType)
        type: Prisma.VoteType
}
