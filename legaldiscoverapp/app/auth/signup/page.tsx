"use client"

import { useAuthStore } from "@/store/Auth";
import { AuthWrapper } from "@/components/auth";
import { SignUpForm } from "@/components/forms/signUpForm";

export default function SignUp() {
    const { step } = useAuthStore()
    return (
        <AuthWrapper title={step === "confirm" ? "Verify Email" : "Create Your Account"}>
            <SignUpForm />
        </AuthWrapper>
    )
}