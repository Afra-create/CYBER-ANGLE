import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "@/components/layout/AppLayout";
import CyberMatrixHero from "@/components/ui/cyber-matrix-hero";

// Pages
import Home from "@/pages/home";
import Learn from "@/pages/learn";
import Trainer from "@/pages/trainer";
import Report from "@/pages/report";
import Dashboard from "@/pages/dashboard";
import Signup from "@/pages/signup";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <CyberMatrixHero />
      <AppLayout>
        <Switch>
        <Route path="/" component={Home} />
        <Route path="/learn" component={Learn} />
        <Route path="/trainer" component={Trainer} />
        <Route path="/report" component={Report} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cyber-safety-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
