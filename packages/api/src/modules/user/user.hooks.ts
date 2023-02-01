import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"

prisma.$use(async (params, next) => {
    if (params.model !== "User") return next(params)

    // util functions
    const handleEmail = (email: string) => email.trim().toLowerCase()
    const handlePassword = async (pass: string) => await bcrypt.hash(pass, 10)

    // Do the stuff!
    if (params.action === "create" || params.action === "update" || params.action === "upsert") {

        // Hash password
        const pass = params.args?.data?.password || params.args?.update?.password || params.args?.create?.password
        let hashed // we only hash once... idk fucks something up with bcrypt.compare if we dont do this
        if (params.args?.data?.password) hashed = params.args.data.password = hashed || await handlePassword(params.args.data.password)
        if (params.args?.update?.password) hashed = params.args.update.password = hashed || await handlePassword(params.args.update.password)
        if (params.args?.create?.password) params.args.create.password = hashed || await handlePassword(params.args.create.password)

        // Lower email
        if (params.args?.data?.email) params.args.data.email = handleEmail(params.args.data.email)
        if (params.args?.update?.email) params.args.update.email = handleEmail(params.args.update.email)
        if (params.args?.create?.email) params.args.create.email = handleEmail(params.args.create.email)

    }

    return next(params)
})
