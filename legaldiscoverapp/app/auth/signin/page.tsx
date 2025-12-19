import { AuthWrapper } from '@/components/auth';
import { SignInForm } from '@/components/forms/signInForm';

export default function SignIn() {
    return (
        <AuthWrapper title="Sign In">
            <SignInForm />
        </AuthWrapper>
    )
}