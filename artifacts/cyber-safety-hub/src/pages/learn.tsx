import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldAlert, CreditCard, Briefcase, ChevronRight, Play, CheckCircle2, AlertTriangle, ArrowLeft, Trophy, RefreshCcw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const QUIZ_DATA: Record<string, {
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}> = {
  phishing: {
    questions: [
      {
        id: 1,
        question: "You receive an email from 'BankSupport' saying your account is locked. The link points to 'www.bank-verify.info'. What should you do?",
        options: [
          "Click the link and log in immediately.",
          "Ignore the email and check your official bank app or website.",
          "Reply to the email with your details.",
          "Call the number provided in the email."
        ],
        correctAnswer: 1,
        explanation: "Always use official channels. Scammers use lookalike URLs like '.info' or '-verify' to steal credentials."
      },
      {
        id: 2,
        question: "Which of these is a common red flag in a phishing message?",
        options: [
          "Professional greeting and no urgency.",
          "A link to the official company website.",
          "Spelling mistakes and urgent threats of account closure.",
          "A clear explanation of why they are contacting you."
        ],
        correctAnswer: 2,
        explanation: "Scammers often use urgency and fear to make you act quickly without noticing mistakes."
      },
      {
        id: 3,
        question: "What is 'Spear Phishing'?",
        options: [
          "A general phishing attack sent to thousands of people.",
          "A targeted phishing attack aimed at a specific individual or organization.",
          "A method of fishing in the ocean using technology.",
          "A type of antivirus software."
        ],
        correctAnswer: 1,
        explanation: "Spear phishing is highly personalized and much more dangerous as it uses specific details about the target."
      },
      {
        id: 4,
        question: "You see a shortened URL (e.g., bit.ly/3xYz) in a suspicious text message. What's the safest way to check where it leads?",
        options: [
          "Click it to see what happens.",
          "Forward it to a friend to check.",
          "Use a URL expander service or hover over the link (if on desktop) to see the destination.",
          "Assume it's safe because it's a short link."
        ],
        correctAnswer: 2,
        explanation: "Shortened URLs hide the true destination. Use tools to expand them safely without clicking."
      },
      {
        id: 5,
        question: "Does an 'HTTPS' lock icon always mean a website is legitimate?",
        options: [
          "Yes, it means the site is verified and safe.",
          "No, it only means the connection is encrypted; scammers can also use HTTPS.",
          "Yes, only banks and big companies can get HTTPS.",
          "No, it means the site is currently being hacked."
        ],
        correctAnswer: 1,
        explanation: "Scammers often use HTTPS to create a false sense of security. It encrypts data but doesn't prove who owns the site."
      }
    ]
  },
  otp: {
    questions: [
      {
        id: 1,
        question: "A 'bank executive' calls and asks for an OTP sent to your phone to 'verify' a transaction. Should you share it?",
        options: [
          "Yes, if they sound professional.",
          "Yes, but only the last 3 digits.",
          "No, banks never ask for OTP over the phone.",
          "Yes, to stop a fraudulent transaction."
        ],
        correctAnswer: 2,
        explanation: "Banks, government agencies, and reputable companies will NEVER ask for your OTP. Shared OTP = Shared Wallet."
      },
      {
        id: 2,
        question: "What does OTP stand for?",
        options: [
          "Open Transfer Protocol",
          "Official Transaction Password",
          "One-Time Password",
          "Online Telephony Process"
        ],
        correctAnswer: 2,
        explanation: "OTP is a One-Time Password used as a second layer of security."
      },
      {
        id: 3,
        question: "You receive an OTP for a transaction you didn't initiate. What should you do?",
        options: [
          "Delete the message and ignore it.",
          "Call your bank immediately to report a potential compromise.",
          "Share the OTP on social media to ask for help.",
          "Wait for the next OTP to arrive."
        ],
        correctAnswer: 1,
        explanation: "Receiving an unexpected OTP means someone already has your password or card details. Alert your bank immediately."
      },
      {
        id: 4,
        question: "Is it safe to store your ATM PIN or NetBanking password in your phone's contacts or notes?",
        options: [
          "Yes, as long as the phone has a screen lock.",
          "No, if your phone is stolen or hacked, these details are easily found.",
          "Yes, if you save it under a fake name.",
          "Yes, phones are 100% secure."
        ],
        correctAnswer: 1,
        explanation: "Hackers and malware often target notes and contacts. Use a dedicated, encrypted password manager instead."
      },
      {
        id: 5,
        question: "Which of the following is the most secure way to handle a suspicious call asking for bank details?",
        options: [
          "Argue with the caller.",
          "Hang up and call your bank's official customer care number yourself.",
          "Give fake details to confuse them.",
          "Listen to them to find out more about the scam."
        ],
        correctAnswer: 1,
        explanation: "Hanging up and initiating the call yourself to a verified number is the only way to ensure you're talking to the real bank."
      }
    ]
  },
  job: {
    questions: [
      {
        id: 1,
        question: "A company offers you a job that pays ₹50,000/week for just 2 hours of work, but asks for a 'security deposit' first. Is this legitimate?",
        options: [
          "Yes, many companies require security deposits.",
          "No, legitimate employers never ask for money to hire you.",
          "Yes, if they provide a formal-looking appointment letter.",
          "Maybe, if the HR manager has a verified LinkedIn profile."
        ],
        correctAnswer: 1,
        explanation: "Legitimate jobs pay you; they don't ask you to pay them. Any request for money upfront is a scam."
      },
      {
        id: 2,
        question: "A recruiter contacts you on WhatsApp from an international number for a job you never applied for. They ask for your Aadhaar/PAN card immediately. Should you send it?",
        options: [
          "Yes, it's part of the standard KYC process.",
          "No, never share identity documents with unverified strangers on messaging apps.",
          "Yes, if they have a company logo as their profile picture.",
          "Yes, to speed up the interview process."
        ],
        correctAnswer: 1,
        explanation: "Identity theft starts with sharing sensitive documents. Only provide these through official, verified portals."
      },
      {
        id: 3,
        question: "What is a 'Work from Home' scam red flag?",
        options: [
          "A clear job description and interview process.",
          "The job involves 'processing payments' through your personal bank account.",
          "The company has a physical office address you can verify.",
          "The pay is commensurate with the market rate for the role."
        ],
        correctAnswer: 1,
        explanation: "Using your personal account to move company money is a classic sign of money laundering or a scam."
      },
      {
        id: 4,
        question: "You receive a job offer letter via email that has multiple grammatical errors and uses a public domain (like @gmail.com or @outlook.com). What should you think?",
        options: [
          "The company is small and doesn't have a professional email yet.",
          "It is likely a scam; professional companies use their own domain names.",
          "The recruiter is just having a bad day.",
          "It doesn't matter as long as the salary is good."
        ],
        correctAnswer: 1,
        explanation: "Professional organizations always use official corporate email domains (e.g., @google.com, @tcs.com)."
      },
      {
        id: 5,
        question: "If a job offer sounds 'too good to be true,' it usually is. What's the best way to verify a company's legitimacy?",
        options: [
          "Check their website and look for reviews on Glassdoor/LinkedIn.",
          "Trust the recruiter's words.",
          "Look at how many followers they have on Instagram.",
          "Ask them to send you a picture of their office."
        ],
        correctAnswer: 0,
        explanation: "Thorough research on independent platforms is the best way to verify if a company actually exists and treats employees well."
      }
    ]
  },
  social: {
    questions: [
      {
        id: 1,
        question: "Your friend's account sends you a message saying they are in an emergency and need money via UPI immediately. What is your first step?",
        options: [
          "Send the money quickly to help your friend.",
          "Ask for their bank details to send a larger amount.",
          "Call your friend on their known phone number to verify.",
          "Report the account to the police immediately without checking."
        ],
        correctAnswer: 2,
        explanation: "Always verify through a separate channel (like a phone call). Social media accounts are frequently hacked or cloned."
      },
      {
        id: 2,
        question: "What is a 'Cloned Account' on social media?",
        options: [
          "An account that has been hacked by a professional.",
          "A new account created using someone else's photos and name to trick their friends.",
          "An account that has two-factor authentication enabled.",
          "A backup account created by the original owner."
        ],
        correctAnswer: 1,
        explanation: "Cloning doesn't require hacking; scammers just copy your public info to create a lookalike profile."
      },
      {
        id: 3,
        question: "Why is 'Two-Factor Authentication' (2FA) important for social media?",
        options: [
          "It makes your profile look more professional.",
          "It adds an extra layer of security, requiring a code from your phone even if your password is stolen.",
          "It allows you to log in faster.",
          "It hides your posts from strangers."
        ],
        correctAnswer: 1,
        explanation: "2FA is the single most effective way to prevent account takeovers."
      },
      {
        id: 4,
        question: "You get a friend request from someone you are already friends with. What should you do?",
        options: [
          "Accept it immediately; maybe they lost their old account.",
          "Ignore it and move on.",
          "Check if their old account is still active and message them there to verify.",
          "Accept it and send them a 'Hello' message."
        ],
        correctAnswer: 2,
        explanation: "Duplicate requests are a major sign of account cloning. Verify before you accept."
      },
      {
        id: 5,
        question: "What should you do if you realize your account has been hacked?",
        options: [
          "Create a new account and forget the old one.",
          "Change your password immediately (if possible), use 'Forgot Password', and alert your contacts.",
          "Wait for the hacker to finish and then try to log in.",
          "Delete the app from your phone."
        ],
        correctAnswer: 1,
        explanation: "Speed is critical. Change passwords and warn friends so they don't fall for scams sent from your account."
      }
    ]
  }
};

const MODULES = [
  {
    id: "phishing",
    title: "Phishing & Fake Links",
    description: "Learn how scammers trick you into revealing sensitive information through deceptive messages.",
    icon: ShieldAlert,
    difficulty: "Beginner",
    progress: 100,
    color: "bg-blue-500",
    completed: true,
  },
  {
    id: "otp",
    title: "OTP & Bank Frauds",
    description: "Understand how bank impersonators steal your money using One Time Passwords.",
    icon: CreditCard,
    difficulty: "Intermediate",
    progress: 40,
    color: "bg-orange-500",
    completed: false,
  },
  {
    id: "job",
    title: "Fake Job Scams",
    description: "Identify fraudulent work-from-home offers and foreign job placements.",
    icon: Briefcase,
    difficulty: "Intermediate",
    progress: 0,
    color: "bg-purple-500",
    completed: false,
  },
  {
    id: "social",
    title: "Social Media Impersonation",
    description: "Protect yourself from cloned accounts asking for money in emergencies.",
    icon: BookOpen,
    difficulty: "Advanced",
    progress: 0,
    color: "bg-rose-500",
    completed: false,
  }
];

export default function Learn() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const activeModule = MODULES.find(m => m.id === selectedModule);
  const quiz = selectedModule ? QUIZ_DATA[selectedModule] : null;

  const handleNextQuestion = () => {
    if (!quiz) return;
    
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !quiz) return;
    
    if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setShowExplanation(false);
  };

  const startQuiz = () => {
    resetQuiz();
    setShowQuiz(true);
  };

  const closeModule = () => {
    setSelectedModule(null);
    setShowQuiz(false);
    resetQuiz();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none blur-3xl" />
      
      <div className="relative z-10">
        <BackButton />
        <AnimatePresence mode="wait">
          {!selectedModule ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">Learning Modules</h1>
                <p className="text-muted-foreground">Master cyber defense strategies through interactive lessons.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MODULES.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <Card 
                      key={mod.id} 
                      className="group cursor-pointer bg-card/40 backdrop-blur-md border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden relative rounded-3xl"
                      onClick={() => setSelectedModule(mod.id)}
                    >
                      <div className={`absolute top-0 left-0 w-1.5 h-full ${mod.color}`} />
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-2xl bg-secondary border border-border/50 ${mod.completed ? 'bg-primary/10 text-primary border-primary/20' : ''}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant={mod.difficulty === "Beginner" ? "default" : "secondary"} className="rounded-full px-3">
                            {mod.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors tracking-tight">{mod.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{mod.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm font-medium mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary">{mod.progress}%</span>
                        </div>
                        <Progress value={mod.progress} className="h-2 bg-primary/10" />
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="ghost" className="w-full justify-between rounded-xl hover:bg-primary/10 hover:text-primary group/btn">
                          {mod.completed ? "Review Module" : (mod.progress > 0 ? "Continue Learning" : "Start Module")}
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="ghost" 
                onClick={closeModule}
                className="mb-6 gap-2 text-muted-foreground hover:text-foreground rounded-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Modules
              </Button>

              <AnimatePresence mode="wait">
                {showQuiz ? (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-3xl mx-auto"
                  >
                    <Card className="bg-card/40 backdrop-blur-xl border-primary/30 shadow-2xl overflow-hidden rounded-[2rem]">
                      <div className="bg-primary/10 px-8 py-5 border-b border-primary/20 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                            <HelpCircle className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-bold text-xl tracking-tight">{activeModule?.title} Quiz</span>
                        </div>
                        {!quizFinished && (
                          <Badge variant="outline" className="font-mono text-primary border-primary/30 px-3 py-1">
                            {currentQuestionIndex + 1} / {quiz?.questions.length}
                          </Badge>
                        )}
                      </div>
                      
                      <CardContent className="p-8 md:p-12">
                        {!quizFinished ? (
                          <div className="space-y-8">
                            <h2 className="text-2xl font-bold leading-tight tracking-tight">
                              {quiz?.questions[currentQuestionIndex].question}
                            </h2>
                            
                            <RadioGroup 
                              value={selectedAnswer?.toString()} 
                              onValueChange={(v) => setSelectedAnswer(parseInt(v))}
                              disabled={showExplanation}
                              className="space-y-4"
                            >
                              {quiz?.questions[currentQuestionIndex].options.map((option, idx) => (
                                <div 
                                  key={idx} 
                                  className={`flex items-center space-x-3 p-5 rounded-2xl border transition-all duration-300 ${
                                    selectedAnswer === idx 
                                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5' 
                                      : 'border-border/50 hover:border-primary/30 hover:bg-white/5'
                                  } ${
                                    showExplanation && idx === quiz.questions[currentQuestionIndex].correctAnswer
                                      ? 'border-green-500 bg-green-500/10'
                                      : showExplanation && selectedAnswer === idx && idx !== quiz.questions[currentQuestionIndex].correctAnswer
                                        ? 'border-destructive bg-destructive/10'
                                        : ''
                                  }`}
                                >
                                  <RadioGroupItem value={idx.toString()} id={`option-${idx}`} className="sr-only" />
                                  <Label 
                                    htmlFor={`option-${idx}`} 
                                    className="flex-1 cursor-pointer font-semibold text-lg"
                                  >
                                    {option}
                                  </Label>
                                  {showExplanation && idx === quiz.questions[currentQuestionIndex].correctAnswer && (
                                    <div className="bg-green-500 rounded-full p-1">
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                  {showExplanation && selectedAnswer === idx && idx !== quiz.questions[currentQuestionIndex].correctAnswer && (
                                    <div className="bg-destructive rounded-full p-1">
                                      <AlertTriangle className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </RadioGroup>

                            {showExplanation && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-2xl border backdrop-blur-md shadow-lg ${
                                  selectedAnswer === quiz?.questions[currentQuestionIndex].correctAnswer
                                    ? 'bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400 shadow-green-500/5'
                                    : 'bg-destructive/10 border-destructive/30 text-destructive shadow-destructive/5'
                                }`}
                              >
                                <div className="font-bold text-lg mb-2 flex items-center gap-2">
                                  {selectedAnswer === quiz?.questions[currentQuestionIndex].correctAnswer ? (
                                    <Trophy className="w-5 h-5" />
                                  ) : (
                                    <AlertTriangle className="w-5 h-5" />
                                  )}
                                  {selectedAnswer === quiz?.questions[currentQuestionIndex].correctAnswer ? 'Brilliant! (+1 point)' : 'Not quite right'}
                                </div>
                                
                                {selectedAnswer !== quiz?.questions[currentQuestionIndex].correctAnswer && (
                                  <div className="mb-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                    <span className="text-xs uppercase tracking-wider font-black opacity-60 block mb-1">Correct Answer</span>
                                    <p className="text-base font-bold text-foreground">
                                      {quiz?.questions[currentQuestionIndex].options[quiz.questions[currentQuestionIndex].correctAnswer]}
                                    </p>
                                  </div>
                                )}
                                
                                <p className="text-base leading-relaxed opacity-90 italic">
                                  "{quiz?.questions[currentQuestionIndex].explanation}"
                                </p>
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div className="text-center py-12 space-y-8">
                            <div className="relative mx-auto w-32 h-32">
                              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                              <div className="relative w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary/30 shadow-2xl">
                                <Trophy className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                              </div>
                            </div>
                            
                            <div>
                              <h2 className="text-4xl font-black mb-3 tracking-tighter">Quiz Mastered!</h2>
                              <p className="text-muted-foreground text-lg max-w-sm mx-auto">
                                You've successfully navigated the threats of <span className="text-foreground font-bold">{activeModule?.title}</span>.
                              </p>
                            </div>
                            
                            <div className="bg-white/5 rounded-[2.5rem] p-8 max-w-xs mx-auto border border-white/10 shadow-inner">
                              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-[0.2em] font-black">Final Score</div>
                              <div className="text-7xl font-black text-primary drop-shadow-lg">
                                {score}<span className="text-3xl text-muted-foreground/50 font-normal">/{quiz?.questions.length}</span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                              <Button className="gap-2 h-14 px-10 text-lg rounded-2xl shadow-xl shadow-primary/20" onClick={resetQuiz}>
                                <RefreshCcw className="w-5 h-5" />
                                Try Again
                              </Button>
                              <Button variant="outline" className="h-14 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/5" onClick={() => setShowQuiz(false)}>
                                Review Lessons
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      
                      {!quizFinished && (
                        <CardFooter className="bg-white/5 p-8 border-t border-white/5 flex justify-between items-center">
                          <Button variant="ghost" className="rounded-xl px-6 hover:bg-white/5" onClick={() => setShowQuiz(false)}>
                            Exit Quiz
                          </Button>
                          {!showExplanation ? (
                            <Button 
                              disabled={selectedAnswer === null} 
                              onClick={handleAnswerSubmit}
                              className="px-10 h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20"
                            >
                              Verify Answer
                            </Button>
                          ) : (
                            <Button onClick={handleNextQuestion} className="gap-2 px-10 h-12 text-base font-bold rounded-xl bg-primary hover:bg-primary/90">
                              {currentQuestionIndex < (quiz?.questions.length || 0) - 1 ? 'Next Challenge' : 'See Results'}
                              <ArrowRight className="w-5 h-5" />
                            </Button>
                          )}
                        </CardFooter>
                      )}
                    </Card>
                  </motion.div>
                ) : (
                  <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="bg-primary/5 p-10 md:p-14 border-b border-border/50 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32" />
                      <Badge className="mb-6 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest">{activeModule?.difficulty}</Badge>
                      <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">{activeModule?.title}</h1>
                      <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">{activeModule?.description}</p>
                    </div>

                    <div className="p-10 md:p-14">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                          <section>
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 tracking-tight">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              The Anatomy of the Scam
                            </h3>
                            <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
                              <p className="mb-4">Scammers create a sense of <span className="text-foreground font-bold">urgency or fear</span> to make you act quickly without thinking. They might pretend to be from your bank, the police, or a trusted company.</p>
                              <p>In a typical scenario, you receive an SMS or email stating your account is blocked, or a package is delayed, and you need to click a link to resolve it immediately.</p>
                            </div>
                          </section>

                          <section className="bg-destructive/5 border border-destructive/20 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 blur-3xl -mr-16 -mt-16 group-hover:bg-destructive/10 transition-colors" />
                            <h3 className="text-xl font-black mb-6 text-destructive flex items-center gap-3 uppercase tracking-wider">
                              <AlertTriangle className="w-6 h-6" />
                              Critical Red Flags
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="mt-1 bg-destructive/20 p-1.5 rounded-lg text-destructive shrink-0">
                                  <AlertTriangle className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium leading-relaxed">
                                  <strong className="block text-destructive text-xs mb-1 uppercase tracking-tighter">Urgency</strong> 
                                  "Your account will be suspended in 24 hours"
                                </span>
                              </li>
                              <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="mt-1 bg-destructive/20 p-1.5 rounded-lg text-destructive shrink-0">
                                  <AlertTriangle className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium leading-relaxed">
                                  <strong className="block text-destructive text-xs mb-1 uppercase tracking-tighter">Suspicious URLs</strong> 
                                  e.g., <i>hdfc-bank-verify.info</i> instead of <i>hdfcbank.com</i>
                                </span>
                              </li>
                              <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="mt-1 bg-destructive/20 p-1.5 rounded-lg text-destructive shrink-0">
                                  <AlertTriangle className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium leading-relaxed">
                                  <strong className="block text-destructive text-xs mb-1 uppercase tracking-tighter">Data Requests</strong> 
                                  PINs, OTPs, or passwords requested via link
                                </span>
                              </li>
                            </ul>
                          </section>
                        </div>

                        <div className="space-y-6">
                          <Card className="bg-card/40 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden">
                            <CardHeader className="bg-white/5 border-b border-white/5">
                              <CardTitle className="text-lg font-black tracking-tight uppercase">Module Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                              <Button className="w-full gap-3 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20">
                                <Play className="w-6 h-6 fill-current" />
                                Interactive Lesson
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full gap-3 h-14 text-lg font-bold rounded-2xl border-primary/30 hover:bg-primary/10 transition-all duration-300"
                                onClick={startQuiz}
                              >
                                <CheckCircle2 className="w-6 h-6" />
                                Start Domain Quiz
                              </Button>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-3 bg-primary/5 p-6 mt-2 border-t border-white/5">
                              <div className="flex justify-between w-full text-xs font-black uppercase tracking-widest text-muted-foreground">
                                <span>Module Progress</span>
                                <span className="text-primary">{activeModule?.progress}%</span>
                              </div>
                              <Progress value={activeModule?.progress} className="h-2 bg-primary/10" />
                              <div className="flex items-center gap-2 mt-2 text-sm font-bold">
                                <Trophy className="w-4 h-4 text-primary" />
                                +50 XP Reward
                              </div>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
