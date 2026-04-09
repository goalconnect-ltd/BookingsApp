"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    //Handles login form when button is clicked
    const handleLogin = async () => {
        const result = await signIn("credentials", {
            email,
            password: password,
            redirect: false,
        });

        //If login is successful, redirect to dashboard
        if (result.ok) {
            router.push("/dashboard");
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
            <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
                <div className="rounded-4xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
                    <div className="mb-8 space-y-3 text-center">
                        <span className="inline-flex rounded-full bg-sky-500/10 px-4 py-1 text-xs uppercase tracking-[0.24em] text-sky-300">
                            Secure access
                        </span>
                        <h1 className="text-4xl font-semibold text-white">Business Login</h1>
                        <p className="mx-auto max-w-md text-sm leading-6 text-slate-400">
                            Sign in to manage bookings, view appointments, and keep your business operations running smoothly.
                        </p>
                    </div>

                    <div className="space-y-5">
                        <label className="block">
                            <span className="text-sm font-medium text-slate-300">Email address</span>
                            <div className="mt-2 rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 transition-colors focus-within:border-sky-500">
                                <input
                                    type="email"
                                    placeholder="you@business.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
                                />
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-slate-300">Password</span>
                            <div className="mt-2 rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-2 transition-colors focus-within:border-sky-500">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-transparent text-white placeholder:text-slate-500 outline-none"
                                />
                            </div>
                        </label>

                        <button
                            onClick={handleLogin}
                            className="inline-flex w-full items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                        >
                            Sign in
                        </button>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 text-slate-400 shadow-lg">
                    <p className="text-sm leading-6">
                        New to the portal? Reach out to your account manager for secure access and setup support.
                    </p>
                </div>
            </div>
        </div>
    );

}
