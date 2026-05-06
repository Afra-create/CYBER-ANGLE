import React from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  className?: string;
  fallbackHref?: string;
}

export function BackButton({ className, fallbackHref }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else if (fallbackHref) {
      setLocation(fallbackHref);
    } else {
      setLocation("/");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`gap-2 text-muted-foreground hover:text-foreground mb-4 ${className}`}
      onClick={handleBack}
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
