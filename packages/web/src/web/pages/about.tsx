import { Link } from 'wouter';
import { ArrowRight, Github, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import { repositoryUrl } from '../lib/site-config';

export default function About() {
  return <div className="page about-page">
    <div className="page-intro"><div><div className="eyebrow">CURIOUS BY DESIGN</div><h1>AI for people who build<span className="lime-text">.</span></h1><p>The Easy AI Enthusiast makes powerful ideas practical—without pretending the human no longer matters.</p></div></div>
    <div className="about-grid">
      <article className="about-panel"><Sparkles size={24} /><h2>Less hype. More possibility.</h2><p>Explore original advanced prompts, evidence-aware guides, reusable agent blueprints, and hands-on challenges. Every resource has an explicit purpose, practical steps, and limits you can understand.</p><Link href="/library">Explore all resources <ArrowRight size={15} /></Link></article>
      <article className="about-panel"><ShieldCheck size={24} /><h2>Hosted only on GitHub Pages.</h2><p>The complete website is a public static library on GitHub Pages. There is no separate workspace host, private database, or sign-in service. Explore without an account and use copy/download to keep resources yourself.</p><Link href="/workspace">Static-site capabilities <ArrowRight size={15} /></Link></article>
      <article className="about-panel"><HeartHandshake size={24} /><h2>The human stays in the loop.</h2><p>Agent resources are templates, not live autonomous systems. No bundled agent executes tools, sends messages, spends money, or schedules work. Verify consequential claims and approve high-impact actions in your own implementation.</p><Link href="/resource/human-approval-boundaries">Read the approval guide <ArrowRight size={15} /></Link></article>
      <article className="about-panel"><Github size={24} /><h2>Built in the open.</h2><p>The GitHub repository is the source home for website code, deployment configuration, and documentation. Changes to main are published through GitHub Actions to GitHub Pages. All website text is live markup; background artwork is recreated without lettering.</p><a href={repositoryUrl} target="_blank" rel="noreferrer">Open the source repository <ArrowRight size={15} /></a></article>
    </div>
  </div>;
}
