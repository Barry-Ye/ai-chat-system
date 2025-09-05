import React, { useState } from "react";

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onSignupClick: () => void; // <-- new prop
    error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSignupClick, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Login
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                    type="submit"
                    className="bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
                >
                    Login
                </button>
            </form>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <p className="mt-6 text-center text-gray-700">
                Don't have an account?{" "}
                <button
                    onClick={onSignupClick} // <-- open signup modal
                    className="underline hover:text-gray-900"
                >
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;
