"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import FilterSection from "../hook/FilterSection";
import { useState } from "react";
import Link from "next/link";

export default function EventBanner({ events }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [...new Set(events.map((e) => e.category))];

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredEvents = events.filter((e) => {
    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.includes(e.category)
        : true;

    const matchesSearch = e.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <aside className="md:col-span-1 space-y-6 mt-10">
        {/* 🔎 Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category Filters */}
        <FilterSection title="Categories">
          {categories.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-indigo-500"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </FilterSection>
      </aside>

      {/* Event Cards */}
      <main className="mt-28 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              rotateY: -5,
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
            className="group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-lg transition-transform"
          >
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-white line-clamp-2">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <Calendar className="h-4 w-4 text-emerald-400" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="h-4 w-4 text-sky-400" />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              <p className="text-xs text-emerald-300 font-medium uppercase tracking-wide">
                {event.category}
              </p>

              <p className="text-sm text-neutral-400 line-clamp-3">
                {event.description}
              </p>

              <Link href={`/event-details/${event.id}`}>
                <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}

        {filteredEvents.length === 0 && (
          <p className="col-span-full text-center text-neutral-400">
            No events found.
          </p>
        )}
      </main>
    </>
  );
}
