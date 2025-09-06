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


  

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);

 
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
        router.push("/");
        Swal.fire("Success", data.message || "Registration successful!", "success");
      
      } else {
        Swal.fire("Error", data.error || "Registration failed!", "error");
      }
      setMessage(data.message || data.error);
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
      setMessage("");
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
        router.push("/");
        Swal.fire("Welcome Back", "Login successful!", "success");
     
      } else {
        Swal.fire("Error", data.error || "Login failed!", "error");
      }
      setMessage(data.message || data.error);
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
      setMessage("");
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




  const handleDelete = async (eventId, setEvents) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (!result.isConfirmed) return;
  
      const response = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: eventId }),
      });
  
      if (response.ok) {
        setEvents((prev) => prev.filter((event) => event._id !== eventId));
  
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your event has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while deleting.",
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while deleting the event.",
      });
    }
  };
  


const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    const ms = String(date.getMilliseconds()).padStart(3, "0");
  
    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.${ms}`;
  };
  
const handleEdit = async (event,setEvents) => {
    try {
      const { value: formValues } = await Swal.fire({
        title: "Edit Event",
        html: `
          <input id="swal-title" class="swal2-input custom-input" placeholder="Title" value="${event.title}" />
          <textarea id="swal-description" class="swal2-textarea custom-input" placeholder="Description">${event.description}</textarea>
          <input 
          id="swal-date" 
          type="datetime-local" 
          class="swal2-input custom-input" 
          value="${formatDateTimeLocal(event.date)}" 
        />
        

          <input id="swal-location" class="swal2-input custom-input" placeholder="Location" value="${event.location}" />
          <input id="swal-category" class="swal2-input custom-input" placeholder="Category" value="${event.category}" />
          <style>
            .custom-input {
              width: 100% !important;        /* full width */
              padding: 12px;                 /* bigger padding */
              border: 1px solid #4f46e5;     /* border color */
              border-radius: 8px;            /* rounded corners */
              background-color: #1f2937;     /* dark background */
              color: #f9fafb;                /* text color */
              font-size: 14px;               /* text size */
              margin-left: 0;  
              margin-right: 0;         
            }
            .swal2-popup {
              background-color: black !important; /* dialog background */
              color: #f9fafb !important;           /* dialog text color */
              rounded: 16px !important;
              
            }
            .swal2-confirm {
              background-color: #4f46e5 !important; /* confirm button */
              color: #fff !important;
            }
            .swal2-cancel {
              background-color: #6b7280 !important; /* cancel button */
              color: #fff !important;
            }
          </style>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Save",
        preConfirm: () => {
          return {
            title: document.getElementById("swal-title").value,
            description: document.getElementById("swal-description").value,
            date: document.getElementById("swal-date").value,
            location: document.getElementById("swal-location").value,
            category: document.getElementById("swal-category").value,
          };
        },
      });
  
      if (!formValues) return; // user cancelled
  
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event._id, ...formValues }),
      });
  
      if (response.ok) {
        setEvents((prev) =>
        prev.map((e) => (e._id === event._id ? { ...e, ...formValues } : e))
      );
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your event has been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
       
      } else {
        await Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while updating.",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while updating the event.",
      });
    }
  };
  

  return (
    <AppContext.Provider
      value={{ loading, user, message, registerUser, loginUser, logOut,
        handleEdit,handleDelete }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
