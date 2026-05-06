import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Shield, 
  BookOpen, 
  Gamepad2, 
  AlertTriangle, 
  LayoutDashboard, 
  Star, 
  Sun, 
  Moon, 
  Globe,
  Menu,
  X
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLang = () => {
    setLang(lang === "EN" ? "HI" : "EN");
  };

  const navLinks = [
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/trainer", label: "Trainer", icon: Gamepad2 },
    { href: "/report", label: "Report", icon: AlertTriangle },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">
              CyberAngel
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <Button 
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 ${isActive ? 'bg-secondary font-semibold' : 'text-muted-foreground'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* User Progress - Hidden on small screens */}
          <div className="hidden lg:flex items-center gap-3 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className="text-muted-foreground">XP</span>
                <span className="text-primary">240/500</span>
              </div>
              <Progress value={48} className="w-24 h-1.5" />
            </div>
            <div className="h-6 w-px bg-border mx-1"></div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Defender
            </Badge>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Link href="/upgrade">
              <Button size="sm" variant="default" className="gap-1.5 shadow-primary/20 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                Upgrade
              </Button>
            </Link>
            
            <Button variant="ghost" size="icon" onClick={toggleLang} title="Toggle Language">
              <Globe className="w-4 h-4" />
              <span className="sr-only">Toggle Language</span>
              <span className="absolute text-[10px] font-bold bottom-1 right-1">{lang}</span>
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] flex flex-col">
              <div className="flex items-center gap-2 mb-6 mt-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="font-bold text-lg">Cyber Surakshit</span>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Defender Level
                  </Badge>
                  <span className="text-sm font-bold text-primary">240 XP</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location === link.href;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <Link href="/upgrade" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Upgrade to Pro
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={toggleLang}>
                    <Globe className="w-4 h-4 mr-2" />
                    {lang === "EN" ? "Hindi" : "English"}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {theme === "dark" ? "Light" : "Dark"}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
