// TODO: FIX TYPESCRIPT
// eslint-disable-next-line
// @ts-nocheck

import { Service, Inject } from "typedi"
import { Configuration, OpenAIApi } from 'openai'
import { OPENAI_API_KEY, OPENAI_CUSTOM_MODEL } from "../../lib/config"

import { GPT3CompletionInput } from "./inputs/completion.input"
import { IdeaService } from "../idea/idea.service"
import { prisma } from "../../lib/prisma"

import * as fs from 'fs'
import path from 'path'
// import { IdeasResponse } from "../idea/responses/ideas.response"

// DATA
import { TrainingData } from "../../lib/data/modalities"

@Service()
export class GPT3Service {
    @Inject(() => IdeaService)
        ideaService: IdeaService

    private readonly config
    private readonly openai

    // Setup OpenAI
    constructor() {
        // this.key = OPENAI_API_KEY
        this.config = new Configuration({
            apiKey: OPENAI_API_KEY,
        })
        this.openai = new OpenAIApi(this.config)
    }

    async trainingData () {
        // TODO: We probably want to iteratively train the model vs. full re-trains...
        //       - Dont use base training every time... only for fresh trains
        //       - Find way to flag which ideas have been using in training so we arent doubling up when iteratively training
        //          - GPT3ModelTrainingIdeas relational table?

        // Base Training Data
        const data = TrainingData

        /** START OF DYNAMIC TRAINING */

        // Get top voted ideas from database
        // const ideas: IdeasResponse = await this.ideaService.listTopIdeas()
        // data.push(
        //     ...ideas
        //         .filter(idea => idea.net_votes > 0)
        //         .map(idea => ({
        //             prompt: idea.prompt,
        //             completion: `1. ${idea.text}`,
        //         }))
        // )

        // Shim in seed data if we dont yet have enough vote-based data
        // const MIN_LENGTH = 100
        // if (data.length < MIN_LENGTH) {
        //     const categoryData = await fs.readFileSync(path.resolve(__dirname, '../../lib/data/udemy-cat-topics.json'))
        //     const categories = JSON.parse(categoryData.toString())

        //     const courseData = await fs.readFileSync(path.resolve(__dirname, '../../lib/data/udemy-top-courses.json'))
        //     const courses = JSON.parse(courseData.toString())
        //         .sort((a, b) => b.reviewCount - a.reviewCount)

        //         // Get category data for course
        //         .map(course => {
        //             // Utils to find course
        //             const findTopic = topics => topics.filter(t => t.url == course.topic)[0]
        //             const findSubcat = subcats => subcats.filter(s => !!findTopic(s.topics))[0]
        //             const findCat = () => categories.filter(c => !!findSubcat(c.subcat))[0]
                    
        //             // Find course stuff
        //             const courseCat = findCat()
        //             const courseSubcat = findSubcat(courseCat.subcat)
        //             const courseTopic = findTopic(courseSubcat.topics)

        //             course.category = courseCat.label
        //             course.subcategory = courseSubcat.label
        //             course.topic = courseTopic.title

        //             return course
        //         })

        //         // Remove certain categories from training dataset
        //         .filter(c => ['IT & Software', 'Development', 'Office Productivity'].includes(c.category) == false)

        //         // Splice difference from minimum dataset size
        //         .slice(0, MIN_LENGTH - data.length)

        //     data.push(
        //         ...courses
        //             .map(course => ({
        //                 prompt: `Generate online course product ideas about ${course.topic}\n\n`,
        //                 completion: `1. ${course.subtitle}`,
        //             }))
        //     )
        // }

        /** END OF DYNAMIC TRAINING */

        // Write to jsonl
        const file = path.resolve(__dirname, '../../lib/data/gpt3-model-training.jsonl')
        fs.writeFileSync(file, data.map(d => JSON.stringify(d)).join('\n'))

        return { file, data }
    }

    async tuneModel (file: string, model: string) {
        
        // No model override specified, let pull from DB or use base model
        if (!model) model = await this.modelId()

        // Upload training file
        const responseFile = await this.openai.createFile(
            fs.createReadStream(file),
            "fine-tune"
        )
            .catch(e => {
                throw e.response.data
            })


        console.log('responseFile', responseFile.data)
        
        // Train model
        return await this.openai.createFineTune({
            training_file: responseFile.data?.id,
            suffix: 'upsell-ai-v1',
            model,
        })
            .catch(e => {
                throw e.response.data
            })
    }

    async modelId () {
        // Get latest fine-tuned model
        const model = await prisma.gPT3Model.findFirst({
            where: { status: { equals: 'SUCCEEDED' } },
            orderBy: { createdAt: 'desc' }
        })

        // No model found
        if (!model) {
            console.info('[INFO] ', `No model found, using base model "${OPENAI_CUSTOM_MODEL}"`)
        }

        // Model or base model
        return model?.model || OPENAI_CUSTOM_MODEL
    }

    async getLatestFineTune (fetch = true) {
        const model = await prisma.gPT3Model.findFirst({
            where: { 
                AND: [
                    // Not in a final status
                    { status: { not: 'CANCELLED' } },
                    { status: { not: 'SUCCEEDED' } },
                ]
            },
            orderBy: { createdAt: 'desc' }
        })

        // If we dont have a fine tune in the database
        if (!model) throw 'NO_PENDING_MODEL_FOUND'

        console.log(model)
        const fineTune = fetch ? await this.openai.retrieveFineTune(model.tuneId) : null

        return { model, fineTune }
    }

    async listModels () {
        // Upload training file
        return await this.openai.listFineTunes()
    }

    async completion(args: GPT3CompletionInput) {
        // No model override specified, let pull from DB or use base model
        let model
        if (!args?.model) model = await this.modelId()

        return await this.openai.createCompletion({
            model,
            // model: 'davinci:ft-personal-2022-09-30-08-08-51',
            // prompt: `\nInput: ${prompt.industry} ${prompt.text} ${prompt.product}\nOutput: `,
            max_tokens: 75,
            // temperature: 1,
            // top_p: 0,
            presence_penalty: 2,
            // frequency_penalty: 2,
            // bestOf: 1,
            // n: 3,
            // stream: false,
            // stop: ['\n'],

            // Merge in args
            ...args,
        })
    }




    // getSignedUrlForGet(key: string): string {
    //     // TODO: use signing for everything?
    //     return S3_URL + key
    // }

    // getSignedUrlForPut(data: S3SignedUrlInput): SignedResponse {
    //     const s3Params = {
    //         Bucket: this.bucket,
    //         Key: data.key,
    //         Expires: 60,
    //         ContentType: data.fileType,
    //         ACL: "public-read",
    //     }
    //     return { uploadUrl: s3.getSignedUrl("putObject", s3Params), key: data.key, url: S3_URL + data.key }
    // }

    // getBulkSignedUrlForPut(data: S3BulkSignedUrlInput): SignedResponse[] {
    //     const urls = data.files.map((file) => {
    //         const s3Params = {
    //             Bucket: this.bucket,
    //             Key: file.key,
    //             Expires: 60,
    //             ContentType: file.fileType,
    //             ACL: "public-read",
    //         }
    //         return { uploadUrl: s3.getSignedUrl("putObject", s3Params), url: S3_URL + file.key, key: file.key }
    //     })
    //     return urls
    // }

    // async bulkDestroy(keys: string[]) {
    //     if (keys.length === 0) return true
    //     const objects = keys.map((key) => ({ Key: key }))
    //     try {
    //         await s3
    //             .deleteObjects({
    //                 Bucket: this.bucket,
    //                 Delete: { Objects: objects },
    //             })
    //             .promise()
    //     } catch (err) {
    //         Sentry.captureException(err)
    //     } finally {
    //         return true
    //     }
    // }

    // async destroy(key: string) {
    //     try {
    //         await s3.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    //     } catch (err) {
    //         Sentry.captureException(err)
    //     } finally {
    //         return true
    //     }
    // }

    // async upload(data: { key: string; body: string | Buffer | Uint8Array | Blob; contentType: string }) {
    //     try {
    //         await s3
    //             .putObject({
    //                 Key: data.key,
    //                 Bucket: this.bucket,
    //                 Body: data.body,
    //                 ACL: "public-read",
    //                 ContentType: data.contentType,
    //             })
    //             .promise()
    //     } catch (err) {
    //         Sentry.captureException(err)
    //     } finally {
    //         return true
    //     }
    // }
}
