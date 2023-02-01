import { Field, InputType } from "type-graphql"

@InputType()
export class GPT3CompletionInput {
    @Field()
        prompt?: string

    @Field()
        model?: string

    @Field()
        max_tokens?: number

    @Field()
        temperature?: number

    @Field()
        top_p?: number

    @Field()
        presence_penalty?: number

    @Field()
        frequency_penalty?: number
    
    @Field()
        bestOf?: number

    @Field()
        n?: number

    @Field()
        stop?: [string]
}