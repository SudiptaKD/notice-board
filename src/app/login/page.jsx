"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()
    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "123456") {
            // Ensure we're in the client-side environment
            if (typeof window !== "undefined") {
              localStorage.setItem("username", username);
              localStorage.setItem("password", password);
            }
            router.push("/upload");
        } else {
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="p-6 max-w-sm w-full bg-stone-100 border border-stone-300 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-stone-700 mb-4">Login</h2>
                {error && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-stone-600 font-medium">Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 text-black border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-stone-600 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 text-black border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
