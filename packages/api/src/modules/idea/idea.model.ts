import * as Prisma from "@prisma/client"
import { Field, ObjectType } from "type-graphql"

import { IdeaStatus } from "@generated"

import { BaseModel } from "../shared/base.model"

@ObjectType()
export class Idea extends BaseModel implements Prisma.Idea {
    @Field() text: string
    @Field() category: string
    @Field() subcategory: string
    @Field() modality: string
    prompt: string
    @Field({ nullable: true }) userInput: string
    @Field({ nullable: true }) userId: string

    @Field(() => IdeaStatus) status: Prisma.IdeaStatus
}
