import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { GPT3ModelStatus } from "@generated"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class GPT3Model extends BaseModel implements Prisma.GPT3Model {
    @Field() tuneId: string
    @Field({ nullable: true }) model: string
    @Field({ nullable: true }) succeededAt: Date
    @Field(() => GPT3ModelStatus) status: Prisma.GPT3ModelStatus
}