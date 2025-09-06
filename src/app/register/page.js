"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const {registerUser,message,loading} = useApp();


  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-purple-400">Create Account</h2>
        <form onSubmit={(e) => registerUser(e, form)} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form?.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 text-white p-3 focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form?.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 text-white p-3 focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form?.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 text-white p-3 focus:ring-2 focus:ring-purple-500"
            required
          />
          {
            loading ? <p className="mt-4 text-center text-cyan-400">Loading...</p> : (
                <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white shadow-md hover:bg-purple-700 transition"
          >
            Register
          </motion.button>
            )
          }
          
        </form>
        {message && <p className="mt-4 text-center text-cyan-400">{message}</p>}
      </motion.div>
    </div>
  );
}
