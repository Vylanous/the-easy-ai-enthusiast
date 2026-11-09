import { snapshotSchema } from '../packages/web/src/shared/library';

const library = snapshotSchema.parse(await Bun.file(new URL('../packages/web/public/content/library.json', import.meta.url)).json());
const ids = library.resources.map(item => item.id);
if (new Set(ids).size !== ids.length) throw new Error('Duplicate resource IDs in the public library');
console.log(`Validated revision ${library.revision}: ${library.resources.length} public resources.`);
for (const type of ['prompt', 'guide', 'agent', 'task']) {
  console.log(`${type}: ${library.resources.filter(item => item.type === type).length}`);
}