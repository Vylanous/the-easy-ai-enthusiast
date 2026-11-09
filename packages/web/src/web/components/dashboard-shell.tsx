import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, BookOpen, Bot, Braces, ChevronRight, CircuitBoard, Github, LayoutDashboard, ListChecks, Menu, Search, ShieldCheck, Sparkles, UserRound, X } from 'lucide-react';
import { useLibrary } from '../hooks/use-library';
import { useLibrarySearch } from './search-context';
import { repositoryUrl, isPublicBuild, workspaceOrigin } from '../lib/site-config';

const navigation = [
  { path: '/', label: 'Overview', icon: LayoutDashboard, type: '' },
  { path: '/prompts', label: 'AI Prompts', icon: Braces, type: 'prompt' },
  { path: '/guides', label: 'Guides', icon: BookOpen, type: 'guide' },
  { path: '/agents', label: 'Agents', icon: Bot, type: 'agent' },
  { path: '/tasks', label: 'Tasks', icon: ListChecks, type: 'task' },
];

export function WorkspaceLink({ children, className = '', path = '/workspace' }: { children: ReactNode; className?: string; path?: string }) {
  if (isPublicBuild && workspaceOrigin) return <a className={className} href={`${workspaceOrigin}${path}`}>{children}</a>;
  return <Link className={className} href={isPublicBuild ? '/workspace-unavailable' : path}>{children}</Link>;
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const { search, setSearch } = useLibrarySearch();
  const library = useLibrary();
  const [drawer, setDrawer] = useState(false);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 720px)').matches);
  const input = useRef<HTMLInputElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)');
    const update = () => { setMobile(media.matches); if (!media.matches) setDrawer(false); };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => { setDrawer(false); window.scrollTo({ top: 0 }); }, [location]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) { event.preventDefault(); input.current?.focus(); }
      if (event.key === 'Escape' && drawer) { setDrawer(false); menu.current?.focus(); }
      if (event.key === 'Tab' && drawer) {
        const nodes = sidebar.current?.querySelectorAll<HTMLElement>('a,button');
        if (!nodes?.length) return;
        const first = nodes[0]; const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawer]);
  useEffect(() => { if (drawer) close.current?.focus(); }, [drawer]);
  const count = (type: string) => library.data?.resources.filter(item => item.type === type).length;
  const sectionLabel = navigation.find(item => item.path === location)?.label || (location.startsWith('/resource') ? 'Resource library' : location === '/library' ? 'All resources' : 'My workspace');

  return <div className="dashboard">
    <button className="skip-link" onClick={() => document.getElementById('main-content')?.focus()}>Skip to content</button>
    {drawer && <button className="drawer-backdrop" aria-label="Close navigation" onClick={() => { setDrawer(false); menu.current?.focus(); }} />}
    <aside ref={sidebar} className={`sidebar ${drawer ? 'open' : ''}`} aria-label="Main navigation" inert={mobile && !drawer} aria-hidden={mobile && !drawer ? true : undefined}>
      <div className="sidebar-brand"><Link href="/" className="brand-mark" aria-label="The Easy AI Enthusiast home"><CircuitBoard size={27} /></Link><Link href="/" className="brand-text">THE EASY AI<br /><span>ENTHUSIAST</span></Link><button ref={close} className="icon-button drawer-close" aria-label="Close navigation" onClick={() => { setDrawer(false); menu.current?.focus(); }}><X size={20} /></button></div>
      <div className="nav-label">YOUR AI COMMAND CENTER</div>
      <nav>{navigation.map(({ path, label, icon: Icon, type }) => <Link key={path} href={path} className={`nav-item ${location === path ? 'active' : ''}`} aria-current={location === path ? 'page' : undefined}><Icon size={19} /><span>{label}</span>{type ? <span className="nav-count">{count(type) ?? '—'}</span> : <span className="active-dot" />}</Link>)}</nav>
      <div className="nav-divider" /><div className="nav-label">MAKE IT YOURS</div>
      <WorkspaceLink className={`nav-item ${location === '/workspace' ? 'active' : ''}`}><UserRound size={19} /><span>My workspace</span><ArrowUpRight size={14} /></WorkspaceLink>
      <Link href="/about" className="nav-item"><ShieldCheck size={19} /><span>About the hub</span></Link>
      <div className="sidebar-bottom"><div className="sidebar-note"><Sparkles size={20} /><span className="eyebrow">CURIOUS BY DESIGN</span><h3>Less overwhelm.<br />More possibility.</h3><p>Your next breakthrough<br />starts with a better question.</p><Link href="/guides">Find your next guide <ChevronRight size={14} /></Link></div><a href={repositoryUrl} target="_blank" rel="noreferrer" className="github-link"><Github size={17} /> Built in the open <ArrowUpRight size={14} /></a><div className="sidebar-version"><span className="tiny-dot" /> ENTHUSIAST HUB <span>V.01</span></div></div>
    </aside>
    <div className="dashboard-body">
      <header className="topbar"><div className="breadcrumbs"><button ref={menu} className="icon-button mobile-menu" aria-label="Open navigation" aria-expanded={drawer} onClick={() => setDrawer(true)}><Menu size={20} /></button><span>Command center</span><ChevronRight size={13} /><strong>{sectionLabel}</strong></div><form className="global-search" onSubmit={event => { event.preventDefault(); navigate('/library'); }}><Search size={17} /><input ref={input} aria-label="Search all resources" placeholder="Search your next big idea…" value={search} onChange={event => { setSearch(event.target.value); if (event.target.value) navigate('/library'); }} /><kbd>/</kbd></form><span className="library-status"><span className="tiny-dot" /> PUBLIC LIBRARY</span><WorkspaceLink className="header-profile"><UserRound size={17} /><span>Sign in</span></WorkspaceLink></header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="main-footer"><span>THE EASY AI ENTHUSIAST <span className="footer-separator">/</span> Making artificial intelligence simple & accessible.</span><a href={repositoryUrl} target="_blank" rel="noreferrer">Source on GitHub <ArrowUpRight size={12} /></a></footer>
    </div>
  </div>;
}