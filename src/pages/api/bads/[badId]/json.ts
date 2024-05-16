import type { APIContext, APIRoute } from 'astro';
import { db, eq, UserBad } from 'astro:db';
import { getApiAuth } from '@/api/auth';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

// export type GetResponse = Awaited<ReturnType<typeof get>>;
// export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
// async function get() {
//   return db
//     .select({
//       id: UserBad.id,
//       thumbnail: UserBad.thumbnail,
//       caption: UserBad.caption,
//       spot: UserBad.spot,
//       createdAt: UserBad.createdAt,
//       badder: {
//         id: User.id,
//         name: User.name,
//         picture: User.picture,
//       },
//     })
//     .from(UserBad)
//     .innerJoin(User, eq(UserBad.badderId, User.id))
//     .orderBy(desc(UserBad.createdAt));
// }

// export type PostRequest = {
//   thumbnail?: string;
//   caption: string;
//   spot: string;
// };
// export type PostResponse = Awaited<ReturnType<typeof post>>;
// export const POST: APIRoute = (context) => defineJsonEndpoint(post, context);
// async function post({ request }: APIContext) {
//   const [body, auth] = await Promise.all([request.json(), getApiAuth(request)]);

//   const { thumbnail, caption, spot } = body;
//   const badderId = auth.sub;

//   const id = await db
//     .insert(UserBad)
//     .values({
//       id: ulid(),
//       badderId,
//       thumbnail,
//       caption,
//       spot,
//     })
//     .returning({ id: UserBad.id });

//   return { id };
// }

export type DeleteResponse = Awaited<ReturnType<typeof del>>;
export const DELETE: APIRoute = (context) => defineJsonEndpoint(del, context);
async function del({ params, request }: APIContext) {
  const [auth] = await Promise.all([getApiAuth(request)]);

  const badId = params.badId!;

  const [bad] = await db
    .select({
      id: UserBad.id,
      badderId: UserBad.badderId,
    })
    .from(UserBad)
    .where(eq(UserBad.id, badId))
    .limit(1);

  if (!bad) {
    throw new Error('Bad not found');
  }

  if (bad.badderId !== auth.sub) {
    throw new Error('Bad not owned by the user');
  }

  await db.delete(UserBad).where(eq(UserBad.id, badId));

  return { id: badId };
}
