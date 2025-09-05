"use client";
import { motion } from "framer-motion";
import { Heart, Star,Calendar, MapPin } from "lucide-react";
export default  function EventBanner({events}) {
  
 
  return (
    <main className="mt-28 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, idx) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.05 }}
          className="group relative rounded-2xl overflow-hidden bg-neutral-900 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition"
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
          </div>
        </motion.div>
      ))}
    </main>
  )
}
