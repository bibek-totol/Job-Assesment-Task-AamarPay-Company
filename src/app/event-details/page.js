

import { Calendar, MapPin, Tag, FileText, Type } from "lucide-react";

export default function EventDetailsPage() {
  // Example event (replace with fetched/dynamic data)
  const event = {
    title: "Tech Innovation Summit 2025",
    description:
      "An inspiring summit bringing together innovators, entrepreneurs, and leaders to discuss the future of technology, AI, and digital transformation.",
    date: "2025-09-20",
    location: "Dhaka Convention Center, Dhaka, Bangladesh",
    category: "Technology & Innovation",
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-neutral-900 rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          {event.title}
        </h1>

        {/* Event Details */}
        <div className="space-y-6 text-neutral-300">
          {/* Description */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <FileText className="h-5 w-5 mr-2 text-indigo-400" />
              Description
            </label>
            <p className="bg-neutral-800 p-4 rounded-lg text-sm leading-relaxed text-neutral-200">
              {event.description}
            </p>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <Calendar className="h-5 w-5 mr-2 text-pink-400" />
              Date
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {event.date}
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              Location
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {event.location}
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <Tag className="h-5 w-5 mr-2 text-yellow-400" />
              Category
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {event.category}
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
}
