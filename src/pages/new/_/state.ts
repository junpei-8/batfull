import { map } from 'nanostores';

export const newBat = map<{
  caption?: string;
  thumbnail?: string;
  spot?: string;
}>({});
