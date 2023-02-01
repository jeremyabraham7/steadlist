// TODO: FIX TYPESCRIPT
// eslint-disable-next-line
// @ts-nocheck

import { Resolver, Mutation } from "type-graphql"
import { Inject, Service } from "typedi"
import { GPT3Service } from '../gpt3/gpt3.service'
import path from 'path'
import { prisma } from "../../lib/prisma"

@Service()
@Resolver(() => Idea)
export default class GPT3Resolver {
    @Inject(() => GPT3Service)
        gpt3: GPT3Service

    // TODO: Dont allow public access
    @Mutation(() => Boolean)
    async tuneModel (): Promise<Boolean> {
        // Generate new training JSONL
        /*const trainingData =*/ await this.gpt3.trainingData()
        // console.log(trainingData)

        // DEBUGGING -- Log models from OpenAI
        // const modelList = await this.gpt3.listModels()
        // console.log(modelList.data)
        return true

        // Run Fine Tuning
        const /*{ id: tuneId, status } =*/ res = await this.gpt3.tuneModel(
            path.resolve(__dirname, '../../lib/data/gpt3-model-training.jsonl'), 
            
            // davinci for fresh train, blank for iterative train
            'davinci'
        )
        console.log(res)

        // Save queued/pending fine tune process
        await prisma.gPT3Model.create({
            data: { tuneId: res.id }
        })

        return true
    }

    // TODO: Dont allow public access
    @Mutation(() => Boolean)
    async checkModelStatus (): Promise<Boolean> {
        try {
            const { fineTune, model } = await this.gpt3.getLatestFineTune()
            const { fine_tuned_model, status, id: tuneId } = fineTune.data

            // Save updated model if the status has changed
            if (model.status !== status) {
                await prisma.gPT3Model.update({
                    where: { tuneId },
                    data: {
                        model: fine_tuned_model,
                        status: status?.toUpperCase(),
                    }
                })
            }
        
        // Basic error handling
        } catch (e) {
            // Expected errors
            if (e == 'NO_PENDING_MODEL_FOUND') console.log('[INFO] ', 'No pending model to update')
            // Throw unexpected errors
            else return e
        }

        return true
    }
}