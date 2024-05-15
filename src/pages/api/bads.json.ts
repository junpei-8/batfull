import type { APIContext, APIRoute } from 'astro';
import { db, UserBad } from 'astro:db';
import { ulid } from 'ulidx';
import { getApiAuth } from '@/api/auth';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get() {
  return db
    .select({
      id: UserBad.id,
      thumbnail: UserBad.thumbnail,
      caption: UserBad.caption,
      spot: UserBad.spot,
      createdAt: UserBad.createdAt,
    })
    .from(UserBad);
}

export type PostRequest = {
  thumbnail?: string;
  caption: string;
  spot: string;
};
export type PostResponse = Awaited<ReturnType<typeof post>>;
export const POST: APIRoute = (context) => defineJsonEndpoint(post, context);
async function post({ request }: APIContext) {
  const [body, auth] = await Promise.all([request.json(), getApiAuth(request)]);

  const { thumbnail, caption, spot } = body;
  const badderId = auth.sub;

  const id = await db
    .insert(UserBad)
    .values({
      id: ulid(),
      badderId,
      thumbnail,
      caption,
      spot,
    })
    .returning({ id: UserBad.id });

  return { id };
}
