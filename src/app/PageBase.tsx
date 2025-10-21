"use client";
import React, { useEffect, useState } from "react";
import Tasks from "./components/Tasks/index";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Loader from "./components/Loader";
import { toast } from "sonner";

const PageBase = () => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (err: any) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
        // Optional: Listen for auth changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/auth");
        }
    }, [loading, user, router]);

    if (loading) return <Loader className="h-screen grid place-items-center" />;
    if (!user) return null; // <-- prevent flicker before redirect

    return (
        <div className="flex p-4 m-10">
            <Tasks />
        </div>
    );
};

export default PageBase;
