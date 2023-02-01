import { IsNotEmpty } from "class-validator"
import { Field, InputType } from "type-graphql"

@InputType()
export class createIdeaInput {
    @IsNotEmpty()
    @Field() userId: string

    @IsNotEmpty()
    @Field() topic: string
    
    @IsNotEmpty()
    @Field() category: string

    @IsNotEmpty()
    @Field() subcategory: string
}
