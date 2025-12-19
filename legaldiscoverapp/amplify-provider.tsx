"use client";

import { Amplify } from "aws-amplify";
import { useAuthStore } from "./store/Auth";
import { cognitoConfig } from "@/config/cognito";
import { useEffect, useMemo, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    const { checkSession } = useAuthStore();

    useEffect(() => {
        Amplify.configure(cognitoConfig, { ssr: true });
        checkSession()
    }, [checkSession]);

    const queryClient = useMemo(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
