"use client";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { handleForgotPassword, handleLogin, handleSignup } from "./utils";
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';

type modeType = "login" | "signup" | "reset-password"

export const AuthPage = () => {

    const loginTitle: any = "Login";
    const signupTitle = "Create an account";
    const forgotPasswordTitle = "Reset password"

    const router = useRouter();
    const [mode, setMode] = useState<modeType>("login")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleToggleAuth = (currentMode: modeType) => {
        setEmail("");
        setPassword("");
        setMode(currentMode);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mode === "login") {
            handleLogin({ router, email, password, setLoading })
        } else if (mode === "signup") {
            handleSignup({ router, email, password, setLoading })
        } else {
            handleForgotPassword({ email, password, setLoading, setMode })
        }
    }

    return (
        <div className="h-screen grid place-items-center">
            <div className="w-3/4 lg:w-2/4 flex flex-col items-center gap-4 justify-center">
                {/* header */}
                <h1 className="text-2xl text-primary">
                    {mode === "login" ? loginTitle : mode === "signup" ? signupTitle : forgotPasswordTitle}
                </h1>
                {/* body */}
                <form onSubmit={handleSubmit} className='w-3/5 flex flex-col gap-4'>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {mode !== "reset-password" &&
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    }
                    <Separator className="my-4" />
                    <Button type='submit' disabled={loading}>
                        {loading ?
                            <Loader />
                            : mode === "login" ? "Login" : mode === "signup" ? "Create Account" : "Send Reset Link"
                        }
                    </Button>
                </form>
                {/* footer */}
                {mode !== "reset-password"
                    ? <div className="flex items-center gap-4">
                        {mode === "signup" &&
                            <button className="text-secondaryText text-sm cursor-pointer" disabled={loading} onClick={() => handleToggleAuth("login")}>
                                Login
                            </button>}
                        {mode === "login" &&
                            <button className="text-secondaryText text-sm cursor-pointer" disabled={loading} onClick={() => handleToggleAuth("signup")}>
                                Signup
                            </button>}
                        <Separator orientation="vertical" />
                        <button className="text-secondaryText text-sm cursor-pointer" disabled={loading} onClick={() => handleToggleAuth("reset-password")}>
                            Forgot password?
                        </button>
                    </div>
                    : <button className="text-secondaryText text-sm cursor-pointer flex items-center" disabled={loading} onClick={() => handleToggleAuth("login")}>
                        Back to login
                    </button>
                }
            </div>
        </div>
    )
}
