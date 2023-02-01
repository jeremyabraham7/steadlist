import { Field, InputType } from "type-graphql"

@InputType()
export class IdeaContext {
    @Field({ nullable: true }) userId: string
    @Field({ nullable: true }) category: string
    @Field({ nullable: true }) subcategory: string
}
