import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        setSuccess("Registration successful! Please check your email for the confirmation link.");
        setEmail("");
        setPassword("");
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        window.showToast?.("Welcome back to Paradise Optics!", "success");
        navigate("/admin");
      }
    } catch (err) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-955 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-3xl p-8 shadow-premium relative overflow-hidden">
        {/* Decorative Brand Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-gold to-primary" />
        
        <div className="text-center mb-8 space-y-2">
          {/* Logo Frame */}
          <div className="flex justify-center mb-3">
            <img src="/logo.png" alt="Paradise Optics Logo" className="h-10 w-auto object-contain dark:brightness-110" />
          </div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] block">
            Exclusive Portal
          </span>
          <h2 className="font-serif text-2xl font-black text-gray-900 dark:text-white leading-tight">
            {isSignUp ? "Create Showroom Account" : "Partner Portal Sign In"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-light">
            {isSignUp ? "Register to access custom eyewear curation suites." : "Enter credentials to access private admin dashboard."}
          </p>
        </div>

        {/* Error notification banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-xs text-red-600 dark:text-red-400 font-medium">
            {error}
          </div>
        )}

        {/* Success notification banner */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
              placeholder="name@example.com"
            />
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-gold transition-colors duration-300"
              placeholder="••••••••"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-gold dark:bg-gold dark:text-gray-955 text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white dark:border-gray-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>{isSignUp ? "Register" : "Sign In"}</span>
            )}
          </button>
        </form>

        {/* Toggle sign-in and sign-up states */}
        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-850 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
              setSuccess("");
            }}
            className="text-xs font-semibold text-primary dark:text-gold hover:underline uppercase tracking-wider"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
