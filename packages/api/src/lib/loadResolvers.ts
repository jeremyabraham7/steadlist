import * as glob from "glob"

// RESOLVER PATHS
const RESOLVER_PATHS = "/modules/**/*resolver.{js,ts}"

export type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]]
export type Resolvers = NonEmptyArray<Function> | NonEmptyArray<string>

export function loadResolvers(): Resolvers {
    const filePaths = glob.sync(__dirname + "../../" + RESOLVER_PATHS)
    const modules: { resolvers: Function[]; default: Function }[] = filePaths.map(require)
    return modules
        .flatMap((module) => {
            const resolvers = []
            if (module.default) resolvers.push(module.default)
            return resolvers
        })
        .filter(Boolean) as Resolvers
}
