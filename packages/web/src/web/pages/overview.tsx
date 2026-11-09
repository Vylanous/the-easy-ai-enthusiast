import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ChevronRight, Clock, FlaskConical, Layers, Sparkles, Target } from 'lucide-react';
import { Hero } from '../components/hero';
import { ResourceCard, typeIcons } from '../components/resource-card';
import { useLibrary } from '../hooks/use-library';
import { LibraryError, LibraryLoading } from '../components/library-state';
import { sections, type ResourceType } from '../../shared/library';

export default function Overview() {
  const library = useLibrary();
  if (library.isLoading) return <LibraryLoading />;
  if (library.isError || !library.data) return <LibraryError retry={() => void library.refetch()} />;
  const resources = library.data.resources;
  const featured = resources.find(item => item.id === 'evaluating-prompt-changes');
  const latest = ['adversarial-strategy-lab', 'creative-director', 'benchmark-a-prompt'].map(id => resources.find(item => item.id === id)).filter(item => !!item);
  const path = [
    { id: 'evaluating-prompt-changes', title: 'Learn the framework', subtitle: 'Start with a guide', icon: BookOpen },
    { id: 'prompt-ablation-designer', title: 'Try a better prompt', subtitle: 'Put the ideas to work', icon: FlaskConical },
    { id: 'benchmark-a-prompt', title: 'Build something real', subtitle: 'Take on a practical challenge', icon: Target },
  ];
  return <div className="page overview-page">
    <div className="page-intro"><div><div className="eyebrow">THE ENTHUSIAST DASHBOARD</div><h2>Welcome to your AI launchpad<span className="lime-text">.</span></h2><p>A little curiosity. A lot of possibility. Let’s see what you can create.</p></div><div className="intro-chip"><Sparkles size={14} /> BUILT FOR THE CURIOUS</div></div>
    <Hero />
    <div className="section-tiles">{(Object.entries(sections) as [ResourceType, typeof sections[ResourceType]][]).map(([type, section], index) => { const Icon = typeIcons[type]; return <Link key={type} href={section.path} className={`section-tile ${section.color}`}><div className="tile-top"><div className="tile-icon"><Icon size={23} /></div><span className="tile-index">0{index + 1} <ArrowUpRight size={15} /></span></div><div className="tile-title"><h3>{section.label}</h3><span>{resources.filter(item => item.type === type).length.toString().padStart(2, '0')}</span></div><p>{section.description}</p><div className="tile-bottom">{type === 'agent' ? 'EXPLORE TEMPLATES' : type === 'task' ? 'PICK A CHALLENGE' : type === 'guide' ? 'START LEARNING' : 'FIND YOUR PROMPT'} <ArrowRight size={15} /></div></Link>; })}</div>
    <div className="feature-grid"><section className="featured-panel"><div className="section-label"><span><Sparkles size={14} /> IN THE SPOTLIGHT</span><span className="small-tag">EDITOR’S PICK</span></div><div className="featured-content"><div className="featured-copy"><span className="resource-type cyan-text"><BookOpen size={14} /> EVALUATION GUIDE</span><h2>{featured?.title || 'Explore the evaluation framework'}</h2><p>{featured?.description || 'Make your next experiment count.'}</p><div className="featured-meta"><span><Clock size={13} /> {featured?.minutes || 14} min read</span><span><Layers size={13} /> Advanced learner</span></div><Link className="button secondary" href={`/resource/${featured?.id || 'evaluating-prompt-changes'}`}>Read the guide <ArrowRight size={16} /></Link></div><div className="experiment-art" aria-hidden="true"><div className="experiment-orbit orbit-one" /><div className="experiment-orbit orbit-two" /><div className="experiment-orbit orbit-three" /><div className="experiment-icon"><FlaskConical size={42} strokeWidth={1.2} /></div><div className="art-node n1" /><div className="art-node n2" /><div className="art-node n3" /><div className="art-bars"><i /><i /><i /><i /><i /></div><span className="experiment-caption">HYPOTHESIS → EVIDENCE</span></div></div></section>
    <section className="learning-panel"><div className="section-label"><span><Target size={14} /> YOUR NEXT MOVE</span><span className="small-tag">3 STEPS</span></div><h3>From curious to capable.</h3><p className="panel-description">One learning path. A tangible result.</p><div className="learning-steps">{path.map(({ id, title, subtitle, icon: Icon }, index) => <Link href={`/resource/${id}`} key={id} className="learning-step"><span className="step-number">{index + 1}</span><div><strong>{title}</strong><span>{subtitle}</span></div><Icon size={16} /><ChevronRight size={14} /></Link>)}</div><div className="learning-foot"><Check size={13} /> Self-paced. No prior automation setup needed.</div></section></div>
    <section className="latest-section"><div className="section-heading"><div><div className="eyebrow">FRESH PERSPECTIVES</div><h2>Your next rabbit hole</h2></div><Link href="/library">View all {resources.length} resources <ArrowRight size={15} /></Link></div><div className="resource-grid">{latest.map(resource => <ResourceCard resource={resource} key={resource.id} />)}</div></section>
    <div className="bottom-banner"><div><span className="banner-icon"><Sparkles size={20} /></span><div><strong>AI isn’t the destination. What you create with it is.</strong><p>Explore freely. Experiment thoughtfully. Keep the human in the loop.</p></div></div><Link href="/agents">Meet your next blueprint <ArrowUpRight size={15} /></Link></div>
  </div>;
}