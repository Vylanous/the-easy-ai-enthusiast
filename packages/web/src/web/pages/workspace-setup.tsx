import { Link } from 'wouter';
import { ArrowLeft, ArrowUpRight, Github, ShieldCheck } from 'lucide-react';
import { repositoryUrl } from '../lib/site-config';

export default function WorkspaceSetup() {
  return <div className="page setup-page">
    <Link href="/" className="back-link"><ArrowLeft size={14} /> Back to the public hub</Link>
    <div className="setup-title">
      <div className="setup-icon"><Github size={30} /></div>
      <div className="eyebrow">HOSTED ONLY ON GITHUB PAGES</div>
      <h1>A public library. No account required.</h1>
      <p>This entire website is hosted on GitHub Pages. There is no separate workspace server, sign-in service, or private database.</p>
    </div>
    <div className="setup-panel">
      <div className="section-label"><span>GITHUB PAGES ONLY</span><span className="small-tag">STATIC WEBSITE</span></div>
      <div className="setup-row"><Github size={20} /><div><h3>Explore, copy, and download</h3><p>All public prompts, guides, agent specifications, and challenges work directly on this website.</p></div></div>
      <div className="setup-row"><ShieldCheck size={20} /><div><h3>Private workspace features are unavailable</h3><p>Sign-in and save-to-workspace links explain this limitation. No account is created and no private resource or task progress is stored. Download a resource to keep your own copy.</p></div></div>
      <div className="setup-assurance"><ShieldCheck size={16} /> GitHub Pages cannot run a private backend. No credentials or private data are included in this site.</div>
    </div>
    <div className="setup-actions"><Link href="/library" className="button primary">Explore the public library <ArrowUpRight size={16} /></Link><a href={repositoryUrl} target="_blank" rel="noreferrer" className="button secondary">Open the repository <ArrowUpRight size={15} /></a></div>
  </div>;
}
