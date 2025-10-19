"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Supabase sets the user session automatically when redirected here
        const { data: listener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === "PASSWORD_RECOVERY") {
                    toast.info("Please enter your new password below.");
                }
            }
        );
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleResetPassword = async () => {
        if (!newPassword) {
            toast.error("Please enter a new password.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        setLoading(false);

        if (error) {
            toast.error(error.message);
            return;
        }

        toast.success("Password updated successfully! Please login again.");
        router.push("/"); // or wherever your login modal opens
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-semibold">Reset your password</h1>
            <div className="flex flex-col gap-4">
                <Input
                    autoFocus
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-64"
                />
                <Button onClick={handleResetPassword} disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </div>
        </div>
    );
}

export default ResetPasswordPage