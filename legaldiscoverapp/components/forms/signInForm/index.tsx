"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { InputField } from "@/components/common/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/schemas/auth";

export const SignInForm = () => {
  const route = useRouter();
  const { checkSession } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function createAuthCookie() {
    const session = await fetchAuthSession();
    const idToken = session?.tokens?.idToken?.toString();

    if (idToken) {
      document.cookie = `idToken=${idToken}; Path=/; SameSite=Lax; Secure; Expires=${new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString()}`;
      // document.cookie = `idToken=${idToken}; Path=/; SameSite=Lax; Secure`;
    }
  }
  const onSubmit = async (data: SignInSchema) => {
    setIsSubmitting(true);

    try {
      await signIn({ username: data.email, password: data.password });
      await createAuthCookie();

      toast.success("Signed in successfully!");

      checkSession();
      route.push("/");
    } catch (err: any) {
      toast.error("Sign-in failed", {
        description: err?.message || "Unexpected error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        Icon={Mail}
        error={errors.email?.message}
        {...register("email")}
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        Icon={Lock}
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        className="w-full h-[40px] text-md"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : "Sign In"}
      </Button>

      <div className="text-center pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?
          <Link
            href="/auth/signup"
            className="font-bold text-accent dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-1 transition-colors duration-200"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
};
