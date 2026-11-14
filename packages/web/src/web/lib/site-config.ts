// Compatibility flags for existing navigation; no external workspace is allowed.
export const isPublicBuild = true;
export const workspaceOrigin = '';
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
export const repositoryUrl = 'https://github.com/Vylanous/the-easy-ai-enthusiast';
export const workspaceLink = (_path = '/workspace') => '/workspace-unavailable';
