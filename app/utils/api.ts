import { z } from "zod"
import { ApiError } from "~~/shared/types/api/error"

export const apiRequest = async <T, F = unknown>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    responseSchema: z.ZodType<T>,
    options?: {
        body?: F
        bodySchema?: z.ZodType<F>
        authToken?: string
        headers?: HeadersInit
    },
): Promise<T> => {
    // parsing and validating the request body
    if (options && options.body && options.bodySchema) {
        const parsed = options.bodySchema.safeParse(options.body)
        if (!parsed.success)
            throw new ApiError("REQUEST_VALIDATION", parsed.error)
    }
    // setting up headers
    const headers = new Headers(options?.headers)
    if (!headers.has("Accept")) headers.set("Accept", "application/json")
    if (!headers.has("Content-Type") && (method === "POST" || method === "PUT"))
        headers.set("Content-Type", "application/json")
    if (options && options.authToken)
        headers.set("Authorization", `Bearer ${options.authToken}`)

    try {
        // sending the request
        const res = await fetch(url, {
            method,
            headers,
            body:
                options && options.body
                    ? JSON.stringify(options.body)
                    : undefined,
        })

        if (!res.ok) throw new ApiError("HTTP", null, res.status)

        // parse json
        const data = await res.json().catch((err) => {
            throw new ApiError("JSON", err)
        })

        // validating the response
        const result = responseSchema.safeParse(data)
        if (!result.success)
            throw new ApiError("SERVER_VALIDATION", result.error)
        return result.data
    } catch (err) {
        if (err instanceof ApiError) throw err
        throw new ApiError("NETWORK", err)
    }
}
