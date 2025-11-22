"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6a11cb] to-[#2575fc] p-4">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl w-full max-w-xl p-8 border border-white/30">
        
        {/* Logo + Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center text-white text-4xl shadow-lg">
            ✔
          </div>
          <h1 className="text-4xl font-bold text-white mt-4">NeuroSync</h1>
          <p className="text-white/80 text-lg">Your daily wellness companion</p>
        </div>

        {/* --- FIXED WRAPPER --- */}
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-md w-full max-w-md">
            
            <h2 className="text-center text-2xl font-semibold mb-6">
              Welcome Back
            </h2>

            <form className="space-y-4">

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium">Email Address</label>
                <div className="flex items-center border rounded-xl px-4 mt-1 bg-gray-50">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full p-3 bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-700 font-medium">Password</label>
                <div className="flex items-center border rounded-xl px-4 mt-1 bg-gray-50">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full p-3 bg-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-md hover:opacity-90 transition">
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t"></div>
                <span className="mx-3 text-gray-500">or continue with</span>
                <div className="flex-grow border-t"></div>
              </div>

              {/* Social Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 border rounded-xl bg-white shadow-sm hover:bg-gray-50 transition">
                  Google
                </button>

                <button className="flex-1 py-3 border rounded-xl bg-white shadow-sm hover:bg-gray-50 transition">
                  GitHub
                </button>
              </div>
            </form>

            <p className="text-center mt-4 text-gray-700">
              Don't have an account?{" "}
              <a href="/auth/register" className="text-blue-600 font-medium">
                Create one now
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}





