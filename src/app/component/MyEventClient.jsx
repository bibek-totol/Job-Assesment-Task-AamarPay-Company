"use client";
import React from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useEffect, useState } from "react";

export default function MyEventClient() {

  const {user,handleDelete,handleEdit} = useApp();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        cache: "no-store",
      });
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  


const myfilteredevents = events.filter(
  (event) => user && user._id === event.createdBy.userId
);


if (!myfilteredevents) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-2xl">Event Not Found</h2>
        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 ">
      <div className="mx-auto max-w-6xl ">
        <h1 className="text-2xl font-bold mb-6 text-white">My Events</h1>
        <div className="overflow-x-auto overflow-y-hidden rounded-2xl border border-neutral-800 shadow-lg bg-neutral-900">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-neutral-900/80 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-neutral-300">Event</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-300">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-300">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-300">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-neutral-300">Event Creator</th>
                <th className="px-6 py-4 text-center font-semibold text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myfilteredevents.map((event, idx) => (
                <motion.tr
                  key={event.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 1.5 }}
                  className="border-t border-neutral-800 hover:bg-neutral-800/60 transition"
                >
                  <td className="px-6 py-4 font-medium text-white">{event.title}</td>
                  <td className="px-6 py-4 text-neutral-400">{event.date}</td>
                  <td className="px-6 py-4 text-neutral-400">{event.location}</td>
                  <td className="px-6 py-4 text-neutral-400">{event.category}</td>
                  <td className="px-6 py-4 text-neutral-400">{event.createdBy.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => handleEdit(event,setEvents)} className="group relative flex items-center gap-1 rounded-lg bg-indigo-600/20 px-3 py-2 text-indigo-400 hover:text-white hover:bg-indigo-600 transition shadow-md">
                        <Pencil className="h-4 w-4" />
                        <span className="text-xs font-medium">Edit</span>
                        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_2px_rgba(99,102,241,0.7)] transition"></span>
                      </button>
                      <button onClick={() => handleDelete(event._id,setEvents)} className="group relative flex items-center gap-1 rounded-lg bg-red-600/20 px-3 py-2 text-red-400 hover:text-white hover:bg-red-600 transition shadow-md">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs font-medium">Delete</span>
                        <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_10px_2px_rgba(239,68,68,0.7)] transition"></span>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
