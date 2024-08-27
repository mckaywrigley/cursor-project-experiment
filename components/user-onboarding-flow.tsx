"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const steps = ["Welcome", "Personal Info", "Preferences", "Completion"];

const ProgressBar = ({ currentStep }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
    ></div>
  </div>
);

const Welcome = () => (
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Welcome to Our Platform!</h2>
    <p className="text-muted-foreground">We're excited to have you on board. Let's get you set up in just a few easy steps.</p>
  </div>
);

const PersonalInfo = () => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        placeholder="John Doe"
      />
    </div>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="john@example.com"
      />
    </div>
  </div>
);

const Preferences = () => (
  <div className="space-y-4">
    <Label>Preferred Theme</Label>
    <RadioGroup defaultValue="light">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="light"
          id="light"
        />
        <Label htmlFor="light">Light</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="dark"
          id="dark"
        />
        <Label htmlFor="dark">Dark</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="system"
          id="system"
        />
        <Label htmlFor="system">System</Label>
      </div>
    </RadioGroup>
  </div>
);

const Completion = () => (
  <div className="text-center">
    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
    <h2 className="text-2xl font-bold mb-4">All Set!</h2>
    <p className="text-muted-foreground">Thank you for completing the onboarding process. You're all set to start using our platform.</p>
  </div>
);

const stepComponents = [Welcome, PersonalInfo, Preferences, Completion];

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const CurrentStepComponent = stepComponents[currentStep];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{steps[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar currentStep={currentStep} />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={prevStep}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 2 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
