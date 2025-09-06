"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";  // ✅ Import SweetAlert2

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Check localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Register function with SweetAlert
  const registerUser = async (e, form) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user || null);
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire("Success", data.message || "Registration successful!", "success");
        router.push("/");
      } else {
        Swal.fire("Error", data.error || "Registration failed!", "error");
      }
      setMessage(data.message || data.error);
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function with SweetAlert
  const loginUser = async (e, form) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user || null);
        localStorage.setItem("user", JSON.stringify(data.user));
        Swal.fire("Welcome Back", "Login successful!", "success");
        router.push("/");
      } else {
        Swal.fire("Error", data.error || "Login failed!", "error");
      }
      setMessage(data.message || data.error);
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout with SweetAlert confirmation
  const logOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        localStorage.removeItem("user");
        Swal.fire("Logged Out", "You have been logged out successfully!", "success");
        router.push("/login");
      }
    });
  };

  return (
    <AppContext.Provider
      value={{ loading, user, message, registerUser, loginUser, logOut }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
