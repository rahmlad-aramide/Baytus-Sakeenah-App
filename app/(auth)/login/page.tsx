"use client"; // Added client directive to handle form interactions and prevent suspension errors

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Heart, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/queries/auth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function SignInPage() {
  const [remember, setRemember] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLogin({
    onSuccess(_data, variables) {
      toast.success("Registration successful! Please verify your email.");
      form.reset();
    },
    onError(err: any) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    },
  });

  const onSubmit = (values: LoginSchema) => {
    const payload = {
      username: values.email,
      password: values.password,
    };

    mutate(payload);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="p-5">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-7">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-10 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-foreground">
                  Baytus-Sakeenah
                </span>
              </div>
              <p className="text-muted-foreground text-sm lg:text-base">
                Welcome back to your House of Tranquility
              </p>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">Login</CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email">Email Address</Label>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="password">Password</Label>
                            <FormControl>
                              <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          id="remember"
                          type="checkbox"
                          onClick={() => setRemember(!remember)}
                          className="w-4 h-4 rounded accent-primary"
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm text-muted-foreground"
                        >
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      size="lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </form>
                </Form>
                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-primary hover:underline font-medium"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                By signing in, you agree to our Terms of Service and Privacy
                Policy. We're committed to maintaining a respectful Islamic
                community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
