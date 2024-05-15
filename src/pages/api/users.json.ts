import type { APIContext, APIRoute } from 'astro';
import { db, eq, User } from 'astro:db';
import { getApiAuth } from '@/api/auth';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

export type GetResponse = Awaited<ReturnType<typeof get>>;
/** 認証済みの User を取得する API */
export const GET: APIRoute = (context) => defineJsonEndpoint(get, context);
async function get(context: APIContext) {
  const auth = await getApiAuth(context.request);

  console.log(auth);

  return db
    .select({
      id: User.id,
      name: User.name,
      picture: User.picture,
    })
    .from(User)
    .where(eq(User.id, auth.sub));
}

export type PostRequest = {
  id: string;
  name: string;
  picture: string | undefined;
};
export type PostResponse = Awaited<ReturnType<typeof post>>;
/** User を登録する API */
export const POST: APIRoute = (context) => defineJsonEndpoint(post, context);
async function post({ request }: APIContext) {
  const [body] = await Promise.all([request.json(), getApiAuth(request)]);

  const { id, name, picture } = body;

  const [user] = await db
    .insert(User)
    .values({
      id,
      name,
      picture,
    })
    .returning({
      id: User.id,
      name: User.name,
      picture: User.picture,
    });

  return user;
}
