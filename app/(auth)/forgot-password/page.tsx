"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/queries/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useResetPassword({
    onSuccess(_data, variables) {
      toast.success("Password reset link sent successfully!");
      form.reset();
      router.push("/reset-password/sent");
    },
    onError(err: any) {
      toast.error(err?.response?.data?.message || "Password reset failed!");
    },
  });

  const onSubmit = (values: ResetPasswordSchema) => {
    const payload = {
      email: values.email,
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
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-10 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-foreground">
                  Baytus-Sakeenah
                </span>
              </div>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader>
                <div className="w-12 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl lg:text-2xl">
                  Reset Password
                </CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Enter your email address and we'll send you a link to reset
                  your password
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

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      size="lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                If you don't receive an email within a few minutes, please check
                your spam folder or contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
