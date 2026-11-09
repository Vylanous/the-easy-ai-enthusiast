import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Bookmark, BookOpen, Bot, Braces, Check, Clock, Copy, ListChecks } from 'lucide-react';
import { sections, type Resource } from '../../shared/library';
import { WorkspaceLink } from './dashboard-shell';

export const typeIcons = { prompt: Braces, guide: BookOpen, agent: Bot, task: ListChecks };
export function CopyButton({ text, label = 'Copy template', className = 'button secondary' }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function copy() {
    try { await navigator.clipboard.writeText(text); setState('copied'); window.setTimeout(() => setState('idle'), 2500); }
    catch { setState('failed'); }
  }
  return <button className={className} onClick={copy} aria-label={state === 'copied' ? 'Copied to clipboard' : label}>{state === 'copied' ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{state === 'copied' ? 'Copied!' : state === 'failed' ? 'Copy blocked — select text below' : label}</span></button>;
}
export function ResourceCard({ resource }: { resource: Resource }) {
  const section = sections[resource.type]; const Icon = typeIcons[resource.type];
  return <article className={`resource-card ${section.color}`}><div className="resource-meta"><span className="resource-type"><Icon size={15} /> {section.singular.toUpperCase()}</span><WorkspaceLink className="icon-button bookmark-button" path={`/workspace?save=${encodeURIComponent(resource.id)}`}><span className="sr-only">Save {resource.title} to workspace</span><Bookmark size={17} /></WorkspaceLink></div><Link href={`/resource/${resource.id}`} className="resource-title"><h3>{resource.title}</h3></Link><p>{resource.description}</p><div className="resource-tags">{resource.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="resource-footer"><span><Clock size={12} /> {resource.minutes} min {resource.type === 'task' ? 'challenge' : 'read'}</span><Link href={`/resource/${resource.id}`} aria-label={`Open ${resource.title}`}><ArrowUpRight size={18} /></Link></div></article>;
}