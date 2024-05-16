import type { APIContext, APIRoute } from 'astro';
import { db, desc, eq, User, UserBad } from 'astro:db';
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
      badder: {
        id: User.id,
        name: User.name,
        picture: User.picture,
      },
    })
    .from(UserBad)
    .innerJoin(User, eq(UserBad.badderId, User.id))
    .orderBy(desc(UserBad.createdAt))
    .limit(8);
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

  const [bad] = await db
    .insert(UserBad)
    .values({
      id: ulid(),
      badderId,
      thumbnail,
      caption,
      spot,
    })
    .returning({ id: UserBad.id });

  return bad;
}
