import { ApolloClient, InMemoryCache } from "@apollo/client/core"
import { DefaultApolloClient } from '@vue/apollo-composable'
// import { onError } from "@apollo/client/link/error"
// import { useErrorsStore } from "store/useErrors"
// import { setContext } from "@apollo/client/link/context"
  
// HTTP connection to the API
// const httpLink = createHttpLink({
//     uri: import.meta.env.VITE_GRAPHQL_API_URL,
//     credentials: "include",
// })
  
// const errorHandler = onError(({ graphQLErrors }) => {
//     if (graphQLErrors)
//         useErrorsStore().$state = {
//             message: graphQLErrors[0].message,
//             category: graphQLErrors[0].extensions.category,
//             fields: graphQLErrors[0].extensions.validation ?? { input: {} },
//         }
// })
  
// const authLink = setContext((_, { headers }) => {
//     return {
//         headers: {
//             ...headers,
//             authorization: localStorage.getItem("token"),
//         },
//     }
// })
  
// Cache implementation
const cache = new InMemoryCache({
    typePolicies: {
        IdeaWithVoteCountsResponse: {
            // Cache-splitting if these values dont match
            // keyFields: ["id", "net_votes", "total_votes"],
        }
    }
})
  
// Create the apollo client
export const apolloClient = new ApolloClient({
    // link: authLink.concat(errorHandler.concat(httpLink)),
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    connectToDevTools: import.meta.env.DEV,
    cache,
})
  
export const DefaultClient = DefaultApolloClient