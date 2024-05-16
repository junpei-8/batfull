import type { APIContext, APIRoute } from 'astro';
import { db, eq, UserBad } from 'astro:db';
import { getApiAuth } from '@/api/auth';
import { defineJsonEndpoint } from '@/api/response';

export const prerender = false;

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
