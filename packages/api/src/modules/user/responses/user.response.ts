import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class UserResponse {
  @Field() id: string
}
