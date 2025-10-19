import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type UtilProps = {
    email: string,
    password: string;
}

type SetterProps = {
    setEmail: (val: string) => void;
    setPassword: (val: string) => void;
    setAuthModalOpen: (val: boolean) => void;
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

export const handleLogin = async ({ email, password, setEmail, setPassword, setAuthModalOpen, setLoading }: UtilProps & SetterProps) => {
    if (!handleChecks({ email, password })) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password, });
    setLoading(false);
    if (error) {
        console.log("error is", error);
        toast.error(error.message);
        return;
    }
    console.log("data is", data);
    toast.success("Logged in successfully!");
    setEmail("");
    setPassword("");
    setAuthModalOpen(false);
};

export const handleSignup = async ({ email, password, setEmail, setPassword, setAuthModalOpen, setLoading }: UtilProps & SetterProps) => {
    if (!handleChecks({ email, password })) return;
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
    setLoading(false);
    if (error) {
        console.log("error is", error);
        toast.error(error.message);
        return;
    }
    console.log("data is", data);
    toast.success("Account created successfully! Please check your email to verify your account.");
    setEmail("");
    setPassword("");
    setAuthModalOpen(false);
};

export const handleForgotPassword = async ({ email, setLoading, setMode }: UtilProps & { setLoading: (val: boolean) => void; setMode: (val: "login" | "signup" | "reset-password") => void }) => {
    if (!email) {
        toast.error("Please enter your email address.");
        return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
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