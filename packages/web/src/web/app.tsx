import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Overview from "./pages/overview";
import Library from "./pages/library";
import ResourceDetail from "./pages/resource-detail";
import WorkspaceSetup from "./pages/workspace-setup";
import About from "./pages/about";
import { DashboardShell } from "./components/dashboard-shell";
import { SearchProvider } from "./components/search-context";
import { isPublicBuild } from "./lib/site-config";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Router hook={isPublicBuild ? useHashLocation : undefined}>
        <SearchProvider><DashboardShell><Switch>
          <Route path="/" component={Overview} />
          <Route path="/library" component={Library} />
          <Route path="/prompts"><Library key="prompts" type="prompt" /></Route>
          <Route path="/guides"><Library key="guides" type="guide" /></Route>
          <Route path="/agents"><Library key="agents" type="agent" /></Route>
          <Route path="/tasks"><Library key="tasks" type="task" /></Route>
          <Route path="/resource/:id" component={ResourceDetail} />
          <Route path="/about" component={About} />
          <Route path="/workspace" component={WorkspaceSetup} />
          <Route path="/workspace-unavailable" component={WorkspaceSetup} />
          <Route><div className="state-panel"><h1>Page not found</h1><p>Choose a section from the command center navigation.</p></div></Route>
        </Switch></DashboardShell></SearchProvider>
      </Router>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
