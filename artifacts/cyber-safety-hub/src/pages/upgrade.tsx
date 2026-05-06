import React, { useState } from "react";
import { Shield, Star, Check, X, ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function Upgrade() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full flex-1 bg-background pb-20">
      {/* Header */}
      <div className="bg-secondary/30 py-16 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Badge className="bg-primary/20 text-primary border-none px-3 py-1 mb-6 text-sm">
            Cyber Shield PRO
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Take Your Family's Digital Security to the Next Level</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get advanced training, real-time threat alerts, and priority support while helping us fund free cyber education for rural India.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Free Tier */}
          <Card className="bg-card border-border shadow-lg relative">
            <CardHeader>
              <CardTitle className="text-2xl">Citizen (Free)</CardTitle>
              <CardDescription>Essential protection for everyone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-6">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground"> / forever</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Basic learning modules</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Standard scam trainer</li>
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Report submission</li>
                <li className="flex items-center gap-3 text-muted-foreground"><X className="w-5 h-5" /> Real-time SMS threat alerts</li>
                <li className="flex items-center gap-3 text-muted-foreground"><X className="w-5 h-5" /> Family account linking (Up to 5)</li>
                <li className="flex items-center gap-3 text-muted-foreground"><X className="w-5 h-5" /> Advanced identity theft simulation</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>Current Plan</Button>
            </CardFooter>
          </Card>

          {/* Pro Tier */}
          <Card className="bg-card border-primary relative overflow-hidden shadow-2xl shadow-primary/10">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl font-medium text-sm">
              Recommended
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <CardTitle className="text-2xl">Defender Pro</CardTitle>
              </div>
              <CardDescription>Comprehensive safety for the whole family</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-6">
                <span className="text-4xl font-bold">₹299</span>
                <span className="text-muted-foreground"> / year</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-primary" /> All Free features</li>
                <li className="flex items-center gap-3 font-medium text-foreground"><Check className="w-5 h-5 text-primary" /> Real-time SMS threat alerts</li>
                <li className="flex items-center gap-3 font-medium text-foreground"><Check className="w-5 h-5 text-primary" /> Family account linking (Up to 5)</li>
                <li className="flex items-center gap-3 font-medium text-foreground"><Check className="w-5 h-5 text-primary" /> Advanced identity theft simulation</li>
                <li className="flex items-center gap-3 font-medium text-foreground"><Check className="w-5 h-5 text-primary" /> Priority scam verification support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full h-12 text-lg gap-2" onClick={() => setShowModal(true)}>
                <Star className="w-5 h-5 fill-current" />
                Upgrade to Pro
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Locked Preview Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8">Sneak Peek: Pro Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-xl mb-2">Family Dashboard</h4>
                <p className="text-muted-foreground mb-4 text-sm">Monitor your parents' and children's scam awareness progress.</p>
                <Button onClick={() => setShowModal(true)}>Unlock Feature</Button>
              </div>
              <CardContent className="p-6 opacity-30 select-none filter blur-[2px]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary"></div>
                      <div>
                        <p className="font-bold">Rahul (Son)</p>
                        <p className="text-xs">Level: Beginner</p>
                      </div>
                    </div>
                    <Progress value={20} className="w-24" />
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary"></div>
                      <div>
                        <p className="font-bold">Mom</p>
                        <p className="text-xs">Level: Defender</p>
                      </div>
                    </div>
                    <Progress value={80} className="w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-bold text-xl mb-2">Real-time SMS Alerts</h4>
                <p className="text-muted-foreground mb-4 text-sm">Get instantly notified when a new scam wave hits your city.</p>
                <Button onClick={() => setShowModal(true)}>Unlock Feature</Button>
              </div>
              <CardContent className="p-6 opacity-30 select-none filter blur-[2px]">
                <div className="space-y-4">
                  <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                    <p className="text-xs font-bold text-destructive mb-1">ALERT: Mumbai Region</p>
                    <p className="text-sm font-medium">New electricity bill disconnection scam active via SMS.</p>
                  </div>
                  <div className="bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                    <p className="text-xs font-bold text-destructive mb-1">ALERT: Pan-India</p>
                    <p className="text-sm font-medium">Fake Flipkart delivery delay links spreading on WhatsApp.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl text-center">Upgrade to Pro</DialogTitle>
            <DialogDescription className="text-center text-base">
              You're about to unlock the full potential of CyberAngel.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-secondary/50 rounded-xl p-6 my-4 border border-border">
            <p className="text-4xl font-bold mb-2">₹299<span className="text-lg text-muted-foreground font-normal">/year</span></p>
            <p className="text-sm text-muted-foreground">Secures up to 5 family members.</p>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button className="w-full h-12 text-lg" onClick={() => {
              setShowModal(false);
              // In a real app, this would redirect to a payment gateway
              alert("Payment gateway simulation: Upgrade successful!");
            }}>
              Proceed to Secure Payment
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Note: This is a static frontend demo. No actual payment will be processed.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
