"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Heart, ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRegister } from "@/queries/auth";
import { useRouter } from "next/navigation";

const signupSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is too short" }),
    lastName: z.string().min(2, { message: "Last name is too short" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    maritalStatus: z
      .string()
      .min(1, { message: "Please select your marital status" }),
    interests: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupSchema = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      maritalStatus: "",
      interests: "",
      terms: false,
    },
  });

  const { mutate, isPending } = useRegister({
    onSuccess(_data) {
      form.reset();
      router.push('/login')
    },
  });

  const onSubmit = (values: SignupSchema) => {
    const payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      confirm_password: values.confirmPassword,
      marital_status: values.maritalStatus,
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
                <div className="w-10 h-8 bg-linear-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-foreground">
                  Baytus-Sakeenah
                </span>
              </div>
              <p className="text-muted-foreground text-sm lg:text-base">
                Join our supportive Islamic community
              </p>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl lg:text-2xl">
                  Create Account
                </CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Join thousands of couples building stronger marriages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="firstName">First Name</Label>
                              <FormControl>
                                <Input
                                  placeholder="Ahmed"
                                  {...field}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="lastName">Last Name</Label>
                              <FormControl>
                                <Input
                                  placeholder="Ali"
                                  {...field}
                                  className="w-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="password">Password</Label>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  className="w-full"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a strong password"
                                  {...field}
                                />
                                <div
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                  {showPassword ? (
                                    <EyeOff size={20} />
                                  ) : (
                                    <Eye size={20} />
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="confirmPassword">
                              Confirm Password
                            </Label>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  className="w-full"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Confirm password"
                                  {...field}
                                />
                                <div
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                                >
                                  {showPassword ? (
                                    <EyeOff size={20} />
                                  ) : (
                                    <Eye size={20} />
                                  )}
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Marital Status */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="maritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="maritalStatus">
                              Marital Status
                            </Label>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select your status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Single">
                                  Single
                                </SelectItem>
                                <SelectItem value="Married">
                                  Married
                                </SelectItem>
                                <SelectItem value="Divorced">
                                  Divorced
                                </SelectItem>
                                <SelectItem value="Widowed">
                                  Widowed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Interests */}
                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="interests">
                              What brings you here? (Optional)
                            </Label>
                            <FormControl>
                              <Textarea
                                placeholder="e.g., Looking for marriage advice, want to share experiences, seeking Islamic guidance..."
                                rows={3}
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-start space-x-2">
                            <FormControl>
                              <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 accent-primary rounded mt-1"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <Label
                              htmlFor="terms"
                              className="flex-1 text-sm text-justify text-muted-foreground leading-relaxed"
                            >
                              I agree to the Terms of Service and Privacy
                              Policy, and I commit to maintaining respectful
                              Islamic values in this community.
                            </Label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                      size="lg"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="animate-spin" />{" "}
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>
                </Form>

                <Separator />

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
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
                Your privacy is important to us. We'll never share your personal
                information and maintain strict Islamic guidelines for community
                interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
