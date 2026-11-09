import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react';
import { useLibrary } from '../hooks/use-library';
import { useLibrarySearch } from '../components/search-context';
import { LibraryError, LibraryLoading } from '../components/library-state';
import { ResourceCard } from '../components/resource-card';
import { sections, type ResourceType } from '../../shared/library';

export default function Library({ type }: { type?: ResourceType }) {
  const library = useLibrary();
  const { search, setSearch } = useLibrarySearch();
  const [topic, setTopic] = useState('All topics');
  const [selectedType, setSelectedType] = useState('all');
  if (library.isLoading) return <LibraryLoading />;
  if (library.isError || !library.data) return <LibraryError retry={() => void library.refetch()} />;
  const items = library.data.resources.filter(item => !type || item.type === type);
  const topics = [...new Set(items.map(item => item.topic))].sort();
  const filtered = items.filter(item => {
    const text = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.topic} ${item.body}`.toLowerCase();
    return text.includes(search.toLowerCase().trim()) && (topic === 'All topics' || item.topic === topic) && (type || selectedType === 'all' || item.type === selectedType);
  });
  function reset() { setSearch(''); setTopic('All topics'); setSelectedType('all'); }
  return <div className="page library-page"><Link href="/" className="back-link"><ArrowLeft size={14} /> Back to command center</Link><div className="page-intro"><div><div className="eyebrow">{type ? 'EXPAND YOUR TOOLKIT' : 'THE FULL EXPLORATION KIT'}</div><h1>{type ? sections[type].label : 'The resource library'}<span className="lime-text">.</span></h1><p>{type ? sections[type].description : 'Advanced ideas, practical frameworks, and blueprints worth building.'}</p></div><span className="intro-chip">{items.length} ORIGINAL RESOURCES</span></div><div className="library-toolbar"><div className="library-search"><Search size={17} /><input aria-label="Search this library" placeholder="Search titles, topics, or content…" value={search} onChange={event => setSearch(event.target.value)} />{search && <button className="icon-button" aria-label="Clear search" onClick={() => setSearch('')}><X size={16} /></button>}</div><label className="filter-select"><SlidersHorizontal size={15} /><span className="sr-only">Filter by topic</span><select value={topic} onChange={event => setTopic(event.target.value)}><option>All topics</option>{topics.map(value => <option key={value}>{value}</option>)}</select></label>{!type && <label className="filter-select"><span className="sr-only">Filter by resource type</span><select value={selectedType} onChange={event => setSelectedType(event.target.value)}><option value="all">All types</option>{Object.entries(sections).map(([value, section]) => <option key={value} value={value}>{section.label}</option>)}</select></label>}</div><div className="result-line" aria-live="polite"><span>{filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}{search ? ` matching “${search}”` : ' ready to explore'}</span><span>CURATED FOR ADVANCED LEARNERS</span></div>{filtered.length ? <div className="resource-grid library-grid">{filtered.map(resource => <ResourceCard key={resource.id} resource={resource} />)}</div> : <div className="state-panel"><Search size={25} /><h2>No ideas found here—yet.</h2><p>Try a broader search or a different topic.</p><button className="button secondary" onClick={reset}>Reset filters</button></div>}{type === 'agent' && <div className="info-note">These are agent specifications to copy into your own tooling. They do not execute AI, call tools, or run automations on this site.</div>}{type === 'task' && <div className="info-note">Public tasks are challenge templates. Persistent checklists belong to your secure workspace, not this public library.</div>}</div>;
}