import { InputType, Field } from "type-graphql"
import { User } from "../user.model"

@InputType()
export class GenerateInput implements Partial<User> {
    @Field({ nullable: true }) email?: string
}
