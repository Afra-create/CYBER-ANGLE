import React, { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  KeyRound
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  location: z.string().min(3, "Please enter your location"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<"details" | "otp">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      location: "",
      mobile: "",
    },
  });

  const onDetailsSubmit = (data: SignupFormValues) => {
    setIsSubmitting(true);
    console.log("Details submitted:", data);
    // Simulate OTP sending
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("otp");
      toast({
        title: "OTP Sent",
        description: "A dummy OTP has been sent to your mobile number.",
      });
    }, 1000);
  };

  const onOtpSubmit = () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate verification
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Account Created",
        description: "Welcome to CyberAngel! You have successfully signed up.",
      });
      setLocation("/dashboard");
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Redirecting to Google... (Simulation)",
    });
    setTimeout(() => {
      setLocation("/dashboard");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-lg mb-4">
        <BackButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="border-border/40 shadow-2xl bg-card/50 backdrop-blur-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
          
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              {step === "details" ? "Join CyberAngel" : "Verify Identity"}
            </CardTitle>
            <CardDescription>
              {step === "details" 
                ? "Protect your family's digital world today" 
                : "Enter the 6-digit code sent to your phone"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <AnimatePresence mode="wait">
              {step === "details" ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full mb-6 py-6 border-border/60 hover:bg-secondary/50 transition-all flex items-center justify-center gap-3 font-semibold"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border/60"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or sign up with email</span>
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onDetailsSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="John" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="john@example.com" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-9" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="9876543210" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="Mumbai, India" className="pl-9" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" className="w-full py-6 text-base font-bold" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Continue to Verification"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              ) : (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center py-4"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
                    <KeyRound className="w-8 h-8 text-primary" />
                  </div>
                  
                  <p className="text-center text-muted-foreground mb-8 max-w-sm">
                    We've sent a code to <span className="text-foreground font-semibold">+91 {form.getValues("mobile")}</span>
                  </p>

                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={(value) => setOtpValue(value)}
                    className="gap-2"
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
                    </InputOTPGroup>
                  </InputOTP>

                  <div className="mt-10 w-full space-y-4">
                    <Button 
                      className="w-full py-6 text-base font-bold" 
                      onClick={onOtpSubmit}
                      disabled={isSubmitting || otpValue.length !== 6}
                    >
                      {isSubmitting ? "Verifying..." : "Create My Account"}
                      <CheckCircle2 className="ml-2 w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-muted-foreground hover:text-foreground"
                      onClick={() => setStep("details")}
                      disabled={isSubmitting}
                    >
                      Back to details
                    </Button>
                  </div>

                  <p className="mt-8 text-sm text-muted-foreground">
                    Didn't receive the code? <Button variant="link" className="p-0 h-auto font-bold text-primary">Resend OTP</Button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex flex-col items-center border-t border-border/40 pt-6 bg-secondary/20">
            <p className="text-sm text-muted-foreground">
              By joining, you agree to our{" "}
              <Button variant="link" className="p-0 h-auto text-xs font-semibold">Terms of Service</Button> and{" "}
              <Button variant="link" className="p-0 h-auto text-xs font-semibold">Privacy Policy</Button>.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
