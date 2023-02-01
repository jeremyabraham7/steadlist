import cron from 'node-cron'
import { request } from 'graphql-request'
import { IS_PRODUCTION, PORT } from "./config"

export const registerCrons = () => {

    // Production-only crons
    if (IS_PRODUCTION) {
    // Generate Ideas
        cron.schedule(`*/60 * * * *`, async () => {
            console.log('[CRON] ', 'Creating random ideas')
            request(`http://localhost:${PORT}/graphql`, `mutation createRandomIdeas { createRandomIdeas }`)
        })

        // Model training
        // cron.schedule(`*/1 * * * *`, async () => {
        //     console.log('[CRON] ', 'Tuning model')
        //     request(`http://localhost:${PORT}/graphql`, `mutation tuneModel { tuneModel }`)
        // })

        // Ping/update model tuning status
        cron.schedule(`*/5 * * * *`, async () => {
            console.log('[CRON] ', 'Check model tuning status')
            request(`http://localhost:${PORT}/graphql`, `mutation checkModelStatus { checkModelStatus }`)
        })

    // cron.schedule(`*/10 * * * *`, async () => {
    //     console.log('[CRON] ', 'Creating random ideas')
    //     request(`http://localhost:${PORT}/graphql`, `mutation createRandomIdeas { createRandomIdeas }`)
    // })
    }

    console.log('[INFO] ', `Cron setup (${cron.getTasks().size})`)
}