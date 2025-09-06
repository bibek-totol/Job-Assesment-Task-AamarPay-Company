"use client"

import { useApp } from "../context/AppContext"
import { useState } from "react"



export default function RSVPEvent({eventid}) {

    const {user} = useApp();

    const [status, setStatus] = useState("RSVP Event");

    const rsvpeventfunction = async () => {
        
      try {
        const res = await fetch("/api/rsvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId:user._id, eventId:eventid })
        });
  
        const data = await res.json();
  
        if (data.success) {
          setStatus("Interested in Event ✅");
        }
      } catch (error) {
        console.error(error);
        setStatus("Error Occurred");
      }
    };
        

    
  return (
    <button onClick={rsvpeventfunction} className=" px-6 py-3 bg-black/10 border border-white/80 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
    {status}
  </button>
  )
}
