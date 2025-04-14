import { afterAll, beforeAll, expect, test } from 'vitest'
import { FastifyInstance } from 'fastify'
import { initTestApp } from './utils'

let app: FastifyInstance

beforeAll(async () => {
  app = await initTestApp(30001)
})

afterAll(async () => {
  await app.close()
})

test('list all articles', async () => {
  const res = await app.inject({
    method: 'get',
    url: '/article'
  })

  expect(res.statusCode).toBe(200)

  expect(res.json()).toMatchObject({
    items: [{ author: 1, slug: 'title-13', title: 'title 1/3' },
    { author: 1, slug: 'title-23', title: 'title 2/3' },
    { author: 1, slug: 'title-33', title: 'title 3/3' }],
    total: 3
  })
})