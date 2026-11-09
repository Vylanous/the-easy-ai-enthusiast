import { Link } from 'wouter';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { assetUrl } from '../lib/site-config';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title" style={{ backgroundImage: `url("${assetUrl('images/control-room-clean.webp')}")` }}>
    <div className="hero-top"><span><span className="tiny-dot" /> YOUR AI EXPLORATION STARTS HERE</span><Terminal size={14} /></div>
    <div className="hero-copy"><div className="hero-kicker"><Sparkles size={13} /> STAY CURIOUS. BUILD SOMETHING.</div><h1 id="hero-title">THE EASY AI<br /><span>ENTHUSIAST</span></h1><div className="hero-tagline">MAKING ARTIFICIAL INTELLIGENCE<br /><span>SIMPLE & ACCESSIBLE</span></div><p>Powerful prompts. Practical guides.<br />Your next idea, unlocked.</p><Link className="button primary hero-button" href="/prompts">Explore the hub <ArrowRight size={17} /></Link></div>
    <div className="hero-bottom"><span>LEARN. EXPERIMENT. CREATE.</span><span>HUMAN CURIOSITY × AI POSSIBILITY</span></div>
  </section>;
}