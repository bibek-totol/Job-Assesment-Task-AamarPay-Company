"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Tag, FileText, Type } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useApp } from "../context/AppContext";
import Swal from "sweetalert2";

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useApp();

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (!form.id) newErrors.id = "ID is required";
    if (!form.title) newErrors.title = "Title is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in to create an event.",
      });
      return;
    }

  
    const eventWithUser = {
      ...form,
      createdBy: {
        userId: user._id || null,
        name: user.name,
        email: user.email,
      },
    };

    // Save event to localStorage (optional)
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]");
    localStorage.setItem("events", JSON.stringify([...existingEvents, eventWithUser]));

    // Save event to MongoDB
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventWithUser),
    });

    if (response.ok) {
      setForm({
        id: "",
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
      });
      setErrors({});
      setOpenDialog(true);
    }
  };

  const handleContinue = () => {
    setOpenDialog(false);
    router.push("/my-events"); // redirect to My Events page
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-neutral-900 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <Type className="h-4 w-4 mr-2" /> ID
            </label>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter event ID"
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <Type className="h-4 w-4 mr-2" /> Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <FileText className="h-4 w-4 mr-2" /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="Enter event description"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <Calendar className="h-4 w-4 mr-2 " /> Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <MapPin className="h-4 w-4 mr-2" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter event location"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-sm font-medium text-neutral-300 mb-2">
              <Tag className="h-4 w-4 mr-2" /> Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg bg-neutral-800 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Webinar">Webinar</option>
              <option value="Hackathon">Hackathon</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
          >
            Create Event
          </button>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className={"bg-neutral-800 text-white"}>
          <AlertDialogHeader>
            <AlertDialogTitle>Event Created Successfully 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Your event has been saved. You can now view it in your events list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDialog(false)}>
              <span className="text-black">Stay Here</span>
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>
              Go to My Events
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
