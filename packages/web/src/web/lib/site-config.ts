export const isPublicBuild = import.meta.env.MODE === 'public';
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
export const repositoryUrl = 'https://github.com/Vylanous/the-easy-ai-enthusiast';
export const workspaceOrigin = import.meta.env.VITE_WORKSPACE_URL?.replace(/\/$/, '') || '';
export function workspaceLink(path = '/workspace') {
  return isPublicBuild ? (workspaceOrigin ? `${workspaceOrigin}${path}` : '/workspace-unavailable') : path;
}