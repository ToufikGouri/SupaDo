import { supabase } from "@/lib/supabase";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

type UtilProps = {
    email: string,
    password: string;
}

type SetterProps = {
    router: AppRouterInstance;
    setLoading: (val: boolean) => void;
}

export const handleChecks = ({ email, password }: UtilProps) => {
    const currentEmail = email.trim();
    const currentPassword = password.trim();

    if (!currentEmail || !currentPassword) {
        toast.error("Please enter email and password.");
        return;
    };

    return true;
}

export const handleLogin = async ({ router, email, password, setLoading }: UtilProps & SetterProps) => {
    if (!handleChecks({ email, password })) return;
    try {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Logged in successfully!");
        router.replace("/");
    } catch (err: any) {
        toast.error(err.message || "Something went wrong during login.");
    } finally {
        setLoading(false);
    }
};

export const handleSignup = async ({ router, email, password, setLoading }: UtilProps & SetterProps) => {
    if (!handleChecks({ email, password })) return;
    try {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        toast.success("Account created successfully! Please check your email to verify your account.");
        router.replace("/auth");
    } catch (err: any) {
        toast.error(err.message || "Something went wrong during login.");
    } finally {
        setLoading(false);
    }
};

export const handleForgotPassword = async ({ email, setLoading, setMode }: UtilProps & { setLoading: (val: boolean) => void; setMode: (val: "login" | "signup" | "reset-password") => void }) => {
    if (!email) {
        toast.error("Please enter your email address.");
        return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
        toast.error(error.message);
        return;
    }

    toast.success("Password reset email sent! Check your inbox.");
    setMode("login");
};