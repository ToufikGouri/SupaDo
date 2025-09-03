"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log("error is", error); 
      toast.error(error.message);
      return;
    }
    console.log("data is", data);
    toast.success(
      "Logged in successfully!"
    );
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 justify-center h-screen">
      <h1 className="text-2xl text-primary">Log into your account</h1>
      <div className="w-2/4 md:w-1/4 flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Separator className="my-4" />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default page;
