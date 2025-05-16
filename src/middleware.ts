import { defineMiddleware } from 'astro/middleware'
import PocketBase from 'pocketbase'

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.pb = new PocketBase(
    import.meta.env.POCKETBASE_URL || process.env.POCKETBASE_URL
  )

  return next()
})
