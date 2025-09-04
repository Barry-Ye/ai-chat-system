import React, { useState } from "react";

interface SignupFormProps {
    onSignup: (fullName: string, email: string, password: string) => void;
    onLoginClick: () => void; // <-- new prop
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup, onLoginClick }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        onSignup(fullName, email, password);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Sign Up
            </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <input
                    type="email"
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <button
                    type="submit"
                    className="bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition"
                >
                    Sign Up
                </button>
            </form>

            <p className="mt-6 text-center text-gray-700">
                Already have an account?{" "}
                <button
                    onClick={onLoginClick}
                    className="underline hover:text-gray-900"
                >
                    Login
                </button>
            </p>
        </div>
    );
};

export default SignupForm;
