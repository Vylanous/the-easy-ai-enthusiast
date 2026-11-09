import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, Bookmark, Check, Clock, Download, Layers } from 'lucide-react';
import { sections } from '../../shared/library';
import { useLibrary } from '../hooks/use-library';
import { LibraryError, LibraryLoading } from '../components/library-state';
import { CopyButton, ResourceCard, typeIcons } from '../components/resource-card';
import { WorkspaceLink } from '../components/dashboard-shell';

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const library = useLibrary();
  if (library.isLoading) return <LibraryLoading />;
  if (library.isError || !library.data) return <LibraryError retry={() => void library.refetch()} />;
  const resource = library.data.resources.find(item => item.id === id);
  if (!resource) return <div className="state-panel"><h1>Resource not found</h1><p>The link may be outdated or the resource may have been unpublished.</p><Link href="/library" className="button secondary">Browse the library <ArrowRight size={16} /></Link></div>;
  const section = sections[resource.type]; const Icon = typeIcons[resource.type];
  function download() {
    if (!resource) return;
    const file = new Blob([`${resource.title}\n\n${resource.description}\n\n${resource.body}\n\nCHECKLIST\n${resource.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nThe Easy AI Enthusiast`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${resource.id}.txt`; anchor.click(); URL.revokeObjectURL(url);
  }
  return <div className={`page detail-page ${section.color}`}><Link href={section.path} className="back-link"><ArrowLeft size={14} /> Back to {section.label.toLowerCase()}</Link><div className="detail-heading"><span className="resource-type"><Icon size={17} /> {section.singular.toUpperCase()} <span className="label-divider">/</span> {resource.topic.toUpperCase()}</span><h1>{resource.title}</h1><p>{resource.description}</p><div className="detail-meta"><span><Clock size={14} /> {resource.minutes} min {resource.type === 'task' ? 'challenge' : 'read'}</span><span><Layers size={14} /> Advanced learner</span>{resource.tags.map(tag => <span className="small-tag" key={tag}>{tag}</span>)}</div></div><div className="detail-grid"><article className="detail-body"><div className="detail-actions"><CopyButton text={resource.body} label={resource.type === 'guide' ? 'Copy guide' : resource.type === 'prompt' ? 'Copy prompt' : 'Copy template'} className="button primary" /><button className="button secondary" onClick={download}><Download size={15} /> Download .txt</button></div><div className="resource-prose">{resource.body.split('\n\n').map((block, index) => <p key={index}>{block}</p>)}</div></article><aside className="detail-sidebar"><div className="checklist-panel"><div className="eyebrow">PUT IT INTO PRACTICE</div><h3>{resource.type === 'task' ? 'Your challenge checklist' : 'The quick-start checklist'}</h3><ol>{resource.steps.map(step => <li key={step}><Check size={14} /><span>{step}</span></li>)}</ol><WorkspaceLink path={`/workspace?save=${encodeURIComponent(resource.id)}`} className="button secondary full-width"><Bookmark size={15} /> Save to workspace</WorkspaceLink><p className="checklist-note">Sign in on the secure workspace to save resources and persistent task progress.</p></div><div className="info-note"><strong>Keep the human in the loop.</strong><p>{resource.type === 'agent' ? 'This is an editable specification, not a live agent. Tool permissions and execution belong to your own implementation.' : 'Verify important claims, protect private information, and review consequential actions before executing them.'}</p></div></aside></div><section className="related-section"><div className="section-heading"><h2>Keep the curiosity going</h2><Link href={section.path}>Explore {section.label.toLowerCase()} <ArrowRight size={14} /></Link></div><div className="resource-grid">{library.data.resources.filter(item => item.type === resource.type && item.id !== resource.id).slice(0, 3).map(item => <ResourceCard key={item.id} resource={item} />)}</div></section></div>;
}