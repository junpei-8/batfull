import { atom } from 'nanostores';

export const isOpenResolverDialog = atom(false);
export const resolverTargetBadId = atom<string | null>(null);

export const isOpenBeautifyCreatorDialog = atom(false);
isOpenResolverDialog.subscribe((value) =>
  value === false ? isOpenBeautifyCreatorDialog.set(false) : null,
);

export const resolverReFetcher = {
  value: null as unknown as () => void | null,
};
