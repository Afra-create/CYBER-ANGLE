import React from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";
import { Shield, TrendingUp, AlertTriangle, BookOpen, Star, Award, Zap, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";

const SCAM_TRENDS_DATA = [
  { name: 'Mon', Phishing: 4000, OTP: 2400, Job: 2400 },
  { name: 'Tue', Phishing: 3000, OTP: 1398, Job: 2210 },
  { name: 'Wed', Phishing: 2000, OTP: 9800, Job: 2290 },
  { name: 'Thu', Phishing: 2780, OTP: 3908, Job: 2000 },
  { name: 'Fri', Phishing: 1890, OTP: 4800, Job: 2181 },
  { name: 'Sat', Phishing: 2390, OTP: 3800, Job: 2500 },
  { name: 'Sun', Phishing: 3490, OTP: 4300, Job: 2100 },
];

const REPORTS_DATA = [
  { month: 'Jan', reports: 120 },
  { month: 'Feb', reports: 150 },
  { month: 'Mar', reports: 220 },
  { month: 'Apr', reports: 180 },
  { month: 'May', reports: 290 },
  { month: 'Jun', reports: 350 },
];

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiClient.getDashboardData(),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center text-destructive">Failed to load dashboard data</div>
      </div>
    );
  }

  const userStats = dashboardData?.userStats;
  const scamTrends = dashboardData?.scamTrends || SCAM_TRENDS_DATA;
  const reportsData = dashboardData?.reportsData || REPORTS_DATA;
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Citizen</h1>
          <p className="text-muted-foreground">Here's your cyber safety overview and community trends.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1.5 text-sm gap-2">
            <Zap className="w-4 h-4" />
            7 Day Streak!
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Your Level</p>
                <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Shield className="w-6 h-6" /> {userStats?.level || 'Citizen'}
                </h3>
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span>{userStats?.xp || 0} XP</span>
                <span className="text-muted-foreground">{userStats?.xpToNext || 500} XP to Expert</span>
              </div>
              <Progress value={userStats ? (userStats.xp / userStats.xpToNext) * 100 : 0} className="h-2 bg-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modules Completed</p>
              <h3 className="text-2xl font-bold">{userStats?.modulesCompleted || 0} / {userStats?.totalModules || 12}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Scams Reported</p>
              <h3 className="text-2xl font-bold">{userStats?.reportsSubmitted || 0}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Community Rank</p>
              <h3 className="text-2xl font-bold pl-1">Top 15%</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Charts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Live Scam Trends in Your Region
              </CardTitle>
              <CardDescription>Daily volume of reported scam categories (Last 7 days)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scamTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="OTP" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Phishing" stackId="a" fill="hsl(var(--primary))" />
                  <Bar dataKey="Job" stackId="a" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Reporting Impact</CardTitle>
              <CardDescription>Monthly reports submitted by you</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Line type="monotone" dataKey="reports" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Tip of the Day */}
          <Card className="bg-card border-l-4 border-l-primary overflow-hidden">
            <CardHeader className="bg-secondary/30 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-primary fill-primary" />
                Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong>Never share your screen during banking.</strong> Scammers often ask you to install apps like AnyDesk or TeamViewer to "help" you, but they actually use it to see your OTPs and steal money.
              </p>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Up Next For You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Resume: OTP Frauds</p>
                    <p className="text-xs text-muted-foreground">Module • 40% Complete</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="w-full">Continue Learning</Button>
              </div>

              <div className="bg-secondary/50 rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">New Trainer Scenario</p>
                    <p className="text-xs text-muted-foreground">Practice • +20 XP</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">Start Practice</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
