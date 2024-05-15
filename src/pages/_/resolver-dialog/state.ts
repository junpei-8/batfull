import { atom } from 'nanostores';

export const isOpenResolverDialog = atom(false);
export const resolverTarget = atom<string | null>(null);
