import { AlertTriangle, LoaderCircle, RefreshCw } from 'lucide-react';

export function LibraryLoading() {
  return <output className="state-panel"><LoaderCircle className="spin" size={24} /><h2>Loading your launchpad</h2><p>Preparing the resource library…</p></output>;
}
export function LibraryError({ retry }: { retry: () => void }) {
  return <div className="state-panel" role="alert"><AlertTriangle size={24} /><h2>Library connection interrupted</h2><p>The resource snapshot could not be loaded. Your work has not been changed.</p><button className="button primary" onClick={retry}><RefreshCw size={16} /> Try again</button></div>;
}