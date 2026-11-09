import { z } from 'zod';

export const resourceType = z.enum(['prompt', 'guide', 'agent', 'task']);
export const resourceSchema = z.object({
  id: z.string().min(1).max(100),
  type: resourceType,
  title: z.string().min(1).max(160),
  description: z.string().min(1).max(600),
  topic: z.string().max(60),
  tags: z.array(z.string().max(40)).max(12),
  minutes: z.number().int().min(1).max(240),
  body: z.string().min(1).max(40000),
  steps: z.array(z.string().max(500)).max(30),
});
export const snapshotSchema = z.object({
  revision: z.string().max(100),
  resources: z.array(resourceSchema).max(1000),
});
export type Resource = z.infer<typeof resourceSchema>;
export type ResourceType = Resource['type'];
export const sections = {
  prompt: { label: 'AI Prompts', singular: 'Prompt', path: '/prompts', color: 'lime', description: 'Better inputs. Extraordinary outputs.' },
  guide: { label: 'Guides', singular: 'Guide', path: '/guides', color: 'cyan', description: 'Go beyond the basics. Build your edge.' },
  agent: { label: 'Agents', singular: 'Agent template', path: '/agents', color: 'mint', description: 'Purpose-built blueprints for your next idea.' },
  task: { label: 'Tasks', singular: 'Task template', path: '/tasks', color: 'gold', description: 'Turn what you learn into what you do.' },
} as const;