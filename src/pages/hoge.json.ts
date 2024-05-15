import type { APIContext, APIRoute } from 'astro';
import { defineJsonEndpoint } from '@/api/response';

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get(_: APIContext) {
  return {
    hoge: 'fuga',
  };
}
