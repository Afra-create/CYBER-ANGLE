import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, AlertCircle, CheckCircle2, Info, RefreshCcw, Send, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Scenario = {
  id: number;
  type: "sms" | "email";
  sender: string;
  subject?: string;
  content: { text: string; isSus: boolean; explanation?: string }[];
  hint: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: "sms",
    sender: "BZ-HDFCBK",
    content: [
      { text: "Dear Customer, ", isSus: false },
      { text: "Your bank account has been blocked due to suspicious activity. ", isSus: true, explanation: "Banks don't usually send urgent blocking messages via SMS without prior notice." },
      { text: "Please verify your KYC immediately by clicking here: ", isSus: false },
      { text: "http://kyc-update-hdfc.info/login ", isSus: true, explanation: "Fake URL. Official bank URLs do not use generic domains like .info or complex hyphenated names." },
      { text: "Regards, HDFC Bank.", isSus: false }
    ],
    hint: "Look for urgency and suspicious links."
  },
  {
    id: 2,
    type: "email",
    sender: "support@amazon-rewards.com",
    subject: "You've won a new iPhone 15 Pro!",
    content: [
      { text: "Congratulations! ", isSus: false },
      { text: "You have been randomly selected to win a free iPhone 15 Pro. ", isSus: true, explanation: "Too good to be true. Random giveaways are almost always scams." },
      { text: "To claim your prize, simply pay the shipping fee of ₹499 via UPI. ", isSus: true, explanation: "Advanced fee fraud. You should never have to pay to receive a prize." },
      { text: "Click here to claim: [LINK]", isSus: false }
    ],
    hint: "If it sounds too good to be true, it probably is."
  }
];

export default function Trainer() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [revealedSus, setRevealedSus] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const scenario = SCENARIOS[currentScenarioIndex];
  const totalSusInScenario = scenario.content.filter(c => c.isSus).length;

  const handleSegmentClick = (index: number, isSus: boolean) => {
    if (revealedSus.includes(index) || showResult) return;

    setRevealedSus([...revealedSus, index]);
    
    if (isSus) {
      setScore(s => s + 10);
    } else {
      setScore(s => Math.max(0, s - 5));
    }
  };

  const handleNext = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(i => i + 1);
      setRevealedSus([]);
      setShowResult(false);
    } else {
      // Reset or show final score
      setCurrentScenarioIndex(0);
      setRevealedSus([]);
      setScore(0);
      setShowResult(false);
    }
  };

  const allFound = scenario.content.map((c, i) => c.isSus ? i : -1).filter(i => i !== -1).every(i => revealedSus.includes(i));

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scam Awareness Trainer</h1>
          <p className="text-muted-foreground">Identify the red flags in the messages below. Click on suspicious parts.</p>
        </div>
        <div className="bg-secondary/80 px-4 py-2 rounded-xl flex items-center gap-4 border border-border">
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">Scenario: </span>
            {currentScenarioIndex + 1}/{SCENARIOS.length}
          </div>
          <div className="h-6 w-px bg-border"></div>
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">Score: </span>
            <span className="text-primary font-bold">{score} XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Device Mockup */}
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-secondary/50 px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">{scenario.sender}</div>
                {scenario.type === 'email' ? (
                  <div className="text-xs text-muted-foreground truncate">{scenario.subject}</div>
                ) : (
                  <div className="text-xs text-muted-foreground">Text Message</div>
                )}
              </div>
            </div>

            {/* Message Body */}
            <div className="p-6 bg-secondary/10 min-h-[300px]">
              <div className="bg-background border border-border p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[90%] text-[15px] leading-relaxed">
                {scenario.content.map((segment, idx) => {
                  const isRevealed = revealedSus.includes(idx);
                  const isMistake = isRevealed && !segment.isSus;
                  const isCorrect = isRevealed && segment.isSus;

                  return (
                    <span 
                      key={idx}
                      onClick={() => handleSegmentClick(idx, segment.isSus)}
                      className={`
                        cursor-pointer transition-all duration-200 py-0.5 rounded
                        ${!isRevealed ? 'hover:bg-primary/20' : ''}
                        ${isCorrect ? 'bg-destructive/20 text-destructive font-semibold border-b-2 border-destructive' : ''}
                        ${isMistake ? 'bg-green-500/20 text-green-500 line-through opacity-70' : ''}
                      `}
                    >
                      {segment.text}
                    </span>
                  );
                })}
              </div>
              <div className="mt-2 text-xs text-muted-foreground ml-1">10:42 AM</div>
            </div>

            {/* Device Footer */}
            <div className="bg-secondary/30 p-3 border-t border-border flex gap-2">
              <div className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-muted-foreground">
                Type a message...
              </div>
              <Button size="icon" className="rounded-full shrink-0" disabled>
                <Send className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Mission</h3>
                  <p className="text-sm text-muted-foreground">Find {totalSusInScenario} suspicious red flags in this message by clicking on them.</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm font-medium mt-6 p-3 bg-secondary/50 rounded-lg">
                <span>Threats Found</span>
                <span className="text-primary">{revealedSus.filter(i => scenario.content[i].isSus).length} / {totalSusInScenario}</span>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {revealedSus.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3"
              >
                {revealedSus.map(idx => {
                  const segment = scenario.content[idx];
                  if (!segment.isSus) return null;
                  
                  return (
                    <Card key={idx} className="border-destructive/30 bg-destructive/5">
                      <CardContent className="p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-destructive mb-1">Red Flag Identified</p>
                          <p className="text-xs text-muted-foreground">{segment.explanation}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {allFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="font-bold text-green-500 mb-2">Great Job!</h3>
                  <p className="text-sm text-muted-foreground mb-4">You successfully identified all threats in this scenario.</p>
                  <Button className="w-full gap-2" onClick={handleNext}>
                    {currentScenarioIndex < SCENARIOS.length - 1 ? "Next Scenario" : "Restart Training"}
                    {currentScenarioIndex < SCENARIOS.length - 1 ? <ChevronRight className="w-4 h-4" /> : <RefreshCcw className="w-4 h-4" />}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
