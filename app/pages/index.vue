<template>
    <div
        class="flex w-full items-center justify-center min-h-screen bg-gray-100 flex-col gap-32"
    >
        <div>
            <p>Some async data:</p>
            <p v-if="isPending">Loading...</p>
            <p v-else-if="isError" class="text-red-800">Error fetching data.</p>
            <p v-else-if="isSuccess" class="text-green-800">
                Data fetched successfully!
            </p>
            <div
                v-if="data"
                class="mt-4 p-4 bg-white rounded shadow w-96 max-h-64 overflow-auto"
            >
                <pre class="text-sm">{{ data }}</pre>
            </div>
        </div>
        <form @submit.prevent="console.log('submitted')">
            <div class="flex flex-col gap-2">
                <label class="block -mb-1 font-semibold">Email*</label>
                <input
                    class="border border-gray-300 rounded px-3 py-2 w-64"
                    type="email"
                    placeholder="email@example.com"
                />
                <p class="text-red-400">Some error...</p>
            </div>
            <button
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                type="submit"
            >
                Submit
            </button>
        </form>
    </div>
</template>

<script lang="ts" setup>
const { isPending, isError, data, isSuccess } = useApi().getUsers()
</script>
