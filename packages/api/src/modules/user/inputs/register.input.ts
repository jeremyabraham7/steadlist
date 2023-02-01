import { IsNotEmpty, Length } from "class-validator"
import { Field, InputType } from "type-graphql"

import { User } from "../user.model"

@InputType()
export class RegisterInput implements Partial<User> {
    @IsNotEmpty()
    @Field({ nullable: true })
        id?: string

    @IsNotEmpty()
    @Field({ nullable: true })
        firstName: string

    @IsNotEmpty()
    @Field({ nullable: true })
        lastName: string

    @IsNotEmpty()
    @Field()
        password: string

    @IsNotEmpty()
    @Length(8)
    @Field()
        email: string
}
