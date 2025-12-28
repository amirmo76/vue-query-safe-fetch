# vue-query-safe-fetch

A production-ready pattern for Vue/Nuxt that groups type-safe endpoints into a single, cohesive composable. It leverages **TanStack Query**, **Zod**, and **TypeScript** to provide strict runtime validation and autocompletion.

## 🚀 Features

* **Grouped API Composable**: Access all your endpoints via a clean `useApi().getUsers()` syntax.
* **Runtime Validation**: Zod ensures API responses match your TypeScript interfaces perfectly.
* **TanStack Query Powered**: Automatic caching, deduping, and loading states (`isPending`, `isError`).
* **Centralized Error Handling**: Custom `ApiError` class for consistent logic across your app.
