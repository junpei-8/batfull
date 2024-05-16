import type { APIContext, APIRoute } from 'astro';
import { db, desc, eq, User, UserBad, UserBeautifully } from 'astro:db';
import { ulid } from 'ulidx';
import { getApiAuth } from '@/api/auth';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

export type GetResponse = Awaited<ReturnType<typeof get>>;
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get({ params }: APIContext) {
  const badId = params.badId!;

  return db
    .select({
      id: UserBeautifully.id,
      thumbnail: UserBeautifully.thumbnail,
      caption: UserBeautifully.caption,
      createdAt: UserBeautifully.createdAt,
      beautifuller: {
        id: User.id,
        name: User.name,
        picture: User.picture,
      },
    })
    .from(UserBeautifully)
    .innerJoin(User, eq(UserBeautifully.beautifullerId, User.id))
    .orderBy(desc(UserBeautifully.createdAt))
    .where(eq(UserBeautifully.badId, badId))
    .limit(8);
}

export type PostRequest = {
  thumbnail?: string;
  caption: string;
};
export type PostResponse = Awaited<ReturnType<typeof post>>;
export const POST: APIRoute = (context) => defineJsonEndpoint(post, context);
async function post({ params, request }: APIContext) {
  const [body, auth] = await Promise.all([request.json(), getApiAuth(request)]);

  const badId = params.badId!;
  const beautifullerId = auth.sub;

  const { thumbnail, caption } = body;

  const [beautifully] = await db
    .insert(UserBeautifully)
    .values({
      id: ulid(),
      badId,
      beautifullerId,
      thumbnail,
      caption,
    })
    .returning({ id: UserBad.id });

  return beautifully;
}
