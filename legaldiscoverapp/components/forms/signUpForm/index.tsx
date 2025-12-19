"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { InputField } from "@/components/common/InputField";
import { Mail, Lock, Hash, User, MapPin, Building, Phone } from "lucide-react";
import { signUpSchema, confirmSignUpSchema, SignUpSchema, ConfirmSignUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignUpForm = () => {
  const router = useRouter();

  const step = useAuthStore((state) => state.step);
  const setStep = useAuthStore((state) => state.setStep);

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors, isSubmitting: signupLoading },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register: registerConfirm,
    handleSubmit: handleConfirmSubmit,
    formState: { errors: confirmErrors, isSubmitting: confirmLoading },
    setValue: setConfirmValue,
  } = useForm<ConfirmSignUpSchema>({
    resolver: zodResolver(confirmSignUpSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const onSignupSubmit = async (data: SignUpSchema) => {
    try {
      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            email: data.email,
            name: data.name,
            phone_number: data.phone,
            address: data.address,
            "custom:company": data.company,
          },
        },
      });

      toast.success("Account created! Please confirm the code.");
      setConfirmValue("email", data.email);
      setStep("confirm");
    } catch (err: any) {
      if (err.name === "UsernameExistsException") {
        toast.info("An account with this email already exists. Please sign in.");
        router.push("/auth/signin");
        return;
      }
      toast.error("Sign-up failed", {
        description: err?.message || err?.name,
      });
    }
  };

  const onConfirmSubmit = async (data: ConfirmSignUpSchema) => {
    try {
      await confirmSignUp({
        username: data.email,
        confirmationCode: data.code,
      });

      toast.success("Your account is verified! Please sign in.");
      router.push("/auth/signin");
    } catch (err: any) {
      toast.error("Verification failed", {
        description: err?.message || err?.name,
      });
    }
  };

  if (step === "signup") {
    return (
      <form className="space-y-1" onSubmit={handleSignupSubmit(onSignupSubmit)}>
        <InputField
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          Icon={User}
          error={signupErrors.name?.message}
          {...registerSignup("name")}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          Icon={Mail}
          error={signupErrors.email?.message}
          {...registerSignup("email")}
        />

        <InputField
          id="company"
          label="Company Name"
          type="text"
          placeholder="Enter your company name"
          Icon={Building}
          error={signupErrors.company?.message}
          {...registerSignup("company")}
        />

        <InputField
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+14325551212"
          Icon={Phone}
          error={signupErrors.phone?.message}
          {...registerSignup("phone")}
        />

        <InputField
          id="address"
          label="Address"
          type="text"
          placeholder="Enter your street address"
          Icon={MapPin}
          error={signupErrors.address?.message}
          {...registerSignup("address")}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          Icon={Lock}
          error={signupErrors.password?.message}
          {...registerSignup("password")}
        />

        <InputField
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          Icon={Lock}
          error={signupErrors.confirmPassword?.message}
          {...registerSignup("confirmPassword")}
        />

        <Button
          type="submit"
          className="w-full h-[40px] text-md"
        >
          {signupLoading ? <Spinner /> : "Create Account"}
        </Button>
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link
              href="/auth/signin"
              className="font-bold text-accent dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 ml-1 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    );
  }
  return (
    <form className="space-y-6" onSubmit={handleConfirmSubmit(onConfirmSubmit)}>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        Icon={Mail}
        error={confirmErrors.email?.message}
        disabled
        {...registerConfirm("email")}
      />

      <InputField
        id="code"
        label="Verification Code"
        type="text"
        placeholder="Enter the code sent to your email"
        Icon={Hash}
        error={confirmErrors.code?.message}
        {...registerConfirm("code")}
      />

      <Button
        type="submit"
        className="w-full h-[40px] text-md"
        disabled={confirmLoading}
      >
        {confirmLoading ? <Spinner /> : "Confirm Account"}
      </Button>
    </form>
  );
};
