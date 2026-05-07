import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
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
import Scanner from "@/pages/scanner";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-1 flex flex-col"
      >
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/learn" component={Learn} />
          <Route path="/trainer" component={Trainer} />
          <Route path="/report" component={Report} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/scanner" component={Scanner} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="cyber-safety-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>

          <CyberMatrixHero />
          <AppLayout>
            <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
              <Router />
            </WouterRouter>
          </AppLayout>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
