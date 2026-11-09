import { useQuery } from '@tanstack/react-query';
import { snapshotSchema } from '../../shared/library';
import { assetUrl } from '../lib/site-config';

/** Static-file query: deliberately independent of the API on GitHub Pages. */
export function useLibrary() {
  return useQuery({
    queryKey: ['public-library'],
    queryFn: async () => {
      const response = await fetch(assetUrl('content/library.json'));
      if (!response.ok) throw new Error('The resource library could not be loaded. Please retry.');
      return snapshotSchema.parse(await response.json());
    },
    staleTime: 60_000,
    retry: 1,
  });
}