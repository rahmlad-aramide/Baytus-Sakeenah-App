"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyReset, useConfirmReset } from "@/queries/auth";

const resetConfirmSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ResetConfirmSchema = z.infer<typeof resetConfirmSchema>;

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<ResetConfirmSchema>({
    resolver: zodResolver(resetConfirmSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const { mutate: verifyToken, isPending: verifying } = useVerifyReset({
    onSuccess() {
      setIsVerified(true);
    },
    onError() {
      toast.error("Invalid or expired link. Please request a new one.");
      router.push("/forgot-password");
    },
  });

  const { mutate: confirmReset, isPending: confirming } = useConfirmReset({
    onSuccess() {
      toast.success("Your password has been reset successfully!");
      router.push("/login");
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || "Failed to reset password.");
    },
  });

  // Verify the token silently on mount
  useEffect(() => {
    if (email && token) {
      verifyToken({ email, token });
    } else {
      router.push("/forgot-password");
    }
  }, [email, token, verifyToken, router]);

  const onSubmit = (values: ResetConfirmSchema) => {
    if (!email || !token) return toast.error("Invalid reset link");
    confirmReset({ email, token, ...values });
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">
            Verifying your reset link, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-12 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center text-xl lg:text-2xl">
            Set New Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter and confirm your new password below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>New Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Confirm Password</Label>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                disabled={confirming}
              >
                {confirming ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
