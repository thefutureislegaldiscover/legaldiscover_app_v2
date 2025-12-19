import { create } from "zustand";
import { getUserInfo } from "@/services/apis";
import { fetchAuthSession, getCurrentUser, signOut, AuthUser } from "aws-amplify/auth";

export interface User {
    id: string;
    email: string;
    name?: string;
}
export interface UserInfo {
    role?: string;
    profile?: any;
    createdAt?: string;
}

export interface AuthStore {
    user: User | null;
    token: string | null;
    step: string;
    isLoader: boolean;
    userInfo: UserInfo | null;
    setUser: (userData: User | null) => void;
    setToken: (token: string | null) => void;
    setUserInfo: (info: UserInfo | null) => void;
    setLoader: (loading: boolean) => void;
    setStep: (step: string) => void;
    checkSession: () => Promise<boolean>;
    logout: () => Promise<boolean>;
}

const mapAmplifyUser = (authUser: AuthUser, idTokenPayload: any): User => ({
    id: authUser.userId,
    email: idTokenPayload.email || authUser.username || "",
    name: idTokenPayload.name || undefined,
});

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    isLoader: false,
    step: "signup",
    userInfo: null,

    setUser: (userData) => set({ user: userData }),
    setToken: (token) => set({ token }),
    setUserInfo: (info) => set({ userInfo: info }),
    setStep: (step) => set({ step }),

    setLoader: (loading) => set({ isLoader: loading }),

    checkSession: async () => {
        const { setLoader, setUser, setToken, setUserInfo } = get();

        try {
            setLoader(true);
            const currentUser = await getCurrentUser();
            const session = await fetchAuthSession({ forceRefresh: true });

            const idTokenObj = session.tokens?.idToken
            if (!idTokenObj) return false;

            const idToken = idTokenObj.toString();
            const idTokenPayload = idTokenObj.payload;
            // document.cookie = `idToken=${idToken}; Path=/; Secure; SameSite=Strict;`;
            document.cookie = `idToken=${idToken}; Path=/; Secure; SameSite=Strict; Max-Age=${60 * 60}`;
            const userData = mapAmplifyUser(currentUser, idTokenPayload);
            setUser(userData);
            setToken(idToken);

            const userInfo = await getUserInfo(idToken, userData.id);
            setUserInfo(userInfo);
            return true;
        } catch (error) {
            return false;
        } finally {
            setLoader(false);
        }
    },

    logout: async () => {
        const { setUser, setToken, setUserInfo } = get();
        try {
            await signOut();
            document.cookie = "idToken=; Path=/; Max-Age=0; SameSite=Lax; Secure";

            setUser(null);
            setToken(null);
            setUserInfo(null);

            return true;
        } catch (err) {
            return false;
        }
    }
}));
