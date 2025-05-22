import { getCurrentUserName, setCurrentUserName, getCookie } from '@lib/auth'

import { addActivity } from '@src/data/pocketbase'

import type { APIRoute } from 'astro'

export const PUT: APIRoute = async ({ request, locals }) => {
  const formData = await request.formData()
  let name = formData.get('name') as string

  await setCurrentUserName(locals.pb, name)

  await addActivity({
    pb: locals.pb,
    team: '',
    project: '',
    text: `Name changed from ${await getCurrentUserName(locals.pb)} to ${name}`,
    type: 'team_delete',
  })

  return new Response(null, {
    status: 204,
    headers: {
      statusText: 'No Content',
      'Set-Cookie': getCookie(locals.pb),
      'HX-Redirect': '/app/settings',
    },
  })
}
