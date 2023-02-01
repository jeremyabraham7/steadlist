import * as Prisma from "@prisma/client"
import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

import { Vote } from "../vote.model"
import { VoteType } from "@generated"

@InputType()
export class AddVoteInput implements Partial<Vote> {
    @IsNotEmpty()
    @Field()
        userId: string

    @IsNotEmpty()
    @Field()
        ideaId: string

    @IsNotEmpty()
    @Field(() => VoteType)
        type: Prisma.VoteType
}
