import { useQuery } from "@tanstack/vue-query"
import { z } from "zod"

const usersResponseSchema = z.object({
    users: z.array(
        z.object({
            id: z.number(),
            firstName: z.string(),
            lastName: z.string(),
            maidenName: z.string(),
            age: z.number(),
            gender: z.string(),
            email: z.email(),
            height: z.number(),
            weight: z.number(),
        }),
    ),
})

export const useApi = () => {
    return {
        getUsers: () =>
            useQuery({ queryKey: ["users"], queryFn: () => fetchUsers() }),
    }
}
const fetchUsers = () =>
    apiRequest("https://dummyjson.com/users", "GET", usersResponseSchema)
