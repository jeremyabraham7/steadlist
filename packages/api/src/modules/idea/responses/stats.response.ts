import { Field, Int, ObjectType } from "type-graphql"

@ObjectType()
export class IdeaStats {
    @Field(() => Int) totalCount: number
    @Field(() => Int) todayCount: number
}