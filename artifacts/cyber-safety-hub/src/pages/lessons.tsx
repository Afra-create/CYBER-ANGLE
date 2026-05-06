import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Search, 
  Filter, 
  Clock, 
  BookOpen, 
  ShieldAlert, 
  CreditCard, 
  Briefcase, 
  ArrowRight,
  ChevronLeft,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const LESSONS = [
  {
    id: "phishing",
    title: "Understanding Phishing Attacks",
    description: "Learn how hackers use deceptive emails and websites to steal your credentials.",
    videoUrl: "https://www.youtube.com/embed/Y7zNlEMDmI8",
    duration: "4:15",
    category: "Phishing",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    id: "otp",
    title: "OTP & Bank Fraud Awareness",
    description: "Deep dive into why you should never share your One-Time Password with anyone.",
    videoUrl: "https://www.youtube.com/embed/6iW7S8YI9I0",
    duration: "5:30",
    category: "Bank Fraud",
    icon: ShieldAlert,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    id: "job",
    title: "Spotting Fake Job Offers",
    description: "Protect yourself from scammers offering high-paying jobs in exchange for registration fees.",
    videoUrl: "https://www.youtube.com/embed/jZ_y9-pL_yM",
    duration: "3:45",
    category: "Job Scams",
    icon: Briefcase,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    id: "social",
    title: "Social Media Identity Theft",
    description: "Best practices for securing your accounts and preventing impersonation scams.",
    videoUrl: "https://www.youtube.com/embed/5-9C80_IAnI",
    duration: "6:20",
    category: "Social Media",
    icon: CreditCard,
    color: "text-pink-500",
    bg: "bg-pink-500/10"
  }
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Lessons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLesson, setSelectedLesson] = useState<typeof LESSONS[0] | null>(null);

  const categories = ["All", ...Array.from(new Set(LESSONS.map(l => l.category)))];

  const filteredLessons = LESSONS.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || lesson.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {selectedLesson ? (
          <motion.div
            key="video-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="space-y-6"
          >
            <Button 
              variant="ghost" 
              onClick={() => setSelectedLesson(null)}
              className="group text-muted-foreground hover:text-foreground -ml-2"
            >
              <ChevronLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Lessons
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="bg-card/40 backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden rounded-[2rem]">
                  <CardContent className="p-0 aspect-video bg-black relative">
                    <iframe
                      src={selectedLesson.videoUrl}
                      title={selectedLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </CardContent>
                  <CardHeader className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className={`${selectedLesson.bg} ${selectedLesson.color} border-none`}>
                        {selectedLesson.category}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedLesson.duration}
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-black tracking-tight mb-4">
                      {selectedLesson.title}
                    </CardTitle>
                    <CardDescription className="text-lg leading-relaxed">
                      {selectedLesson.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-8 border-t border-border/50 bg-white/5">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-sm text-muted-foreground">
                        Finished watching? Take the module quiz to test your knowledge.
                      </p>
                      <Button 
                        onClick={() => window.location.href = `/learn`}
                        className="rounded-xl font-bold px-6"
                      >
                        Go to Quiz
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold px-2">Up Next</h3>
                <div className="space-y-4">
                  {LESSONS.filter(l => l.id !== selectedLesson.id).map(lesson => (
                    <Card 
                      key={lesson.id} 
                      className="glass border-primary/5 hover:border-primary/20 cursor-pointer transition-all duration-300 group"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <CardContent className="p-4 flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg bg-black/40 overflow-hidden shrink-0 flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary/60 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                            <span className={`${lesson.color}`}>{lesson.category}</span>
                            <span>•</span>
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="text-center space-y-4">
              <Badge variant="outline" className="py-1 px-4 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider font-bold text-[10px]">
                Video Library
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                Interactive <span className="text-primary">Lessons</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Watch bite-sized video lessons to master digital safety and stay protected online.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full px-6 h-10 font-bold transition-all ${
                      activeCategory === cat ? 'shadow-lg shadow-primary/20' : 'border-primary/10 hover:bg-primary/5'
                    }`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search lessons..." 
                  className="pl-11 h-11 rounded-full bg-card/50 border-primary/10 focus:border-primary/30 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLessons.map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                >
                  <Card 
                    className="group glass border-primary/10 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col"
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    <div className="relative aspect-video bg-black/40 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                          <Play className="w-6 h-6 text-primary group-hover:text-primary-foreground fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-bold text-white">
                        {lesson.duration}
                      </div>
                    </div>
                    <CardHeader className="flex-1">
                      <Badge variant="secondary" className={`w-fit mb-3 ${lesson.bg} ${lesson.color} border-none`}>
                        {lesson.category}
                      </Badge>
                      <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {lesson.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0 pb-6 px-6">
                      <Button variant="ghost" className="w-full justify-between group/btn rounded-xl hover:bg-primary/10 hover:text-primary transition-all">
                        Watch Lesson
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredLessons.length === 0 && (
              <div className="text-center py-20 bg-primary/5 rounded-[32px] border-2 border-dashed border-primary/10">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary/40" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No lessons found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
                <Button 
                  variant="link" 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="mt-4 text-primary font-bold"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
