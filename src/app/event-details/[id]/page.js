import { Calendar, MapPin, Tag, FileText } from "lucide-react";
import Link from "next/link";
import { getData } from "../../apiData/data";



export default async function EventDetailsPage({ params }) {
  const events = await getData();
  const oneevent = events.find((e) => e.id === params.id);

  if (!oneevent) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-2xl">Event Not Found</h2>
        <Link href="/events">
          <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
            Back to Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-neutral-900 rounded-2xl shadow-xl p-8">
  
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
         <span className="text-indigo-400">Event Details:</span> <br/> {oneevent.title}
        </h1>



        <div className="space-y-6 text-neutral-300">
          
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <FileText className="h-5 w-5 mr-2 text-indigo-400" />
              Event ID
            </label>
            <p className="bg-neutral-800 p-4 rounded-lg text-sm leading-relaxed text-neutral-200">
              {oneevent.id}
            </p>
          </div>
          </div>


        
        <div className="space-y-6 text-neutral-300">
          
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <FileText className="h-5 w-5 mr-2 text-indigo-400" />
              Description
            </label>
            <p className="bg-neutral-800 p-4 rounded-lg text-sm leading-relaxed text-neutral-200">
              {oneevent.description}
            </p>
          </div>

      
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <Calendar className="h-5 w-5 mr-2 text-pink-400" />
              Date
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {oneevent.date}
            </p>
          </div>

      
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <MapPin className="h-5 w-5 mr-2 text-green-400" />
              Location
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {oneevent.location}
            </p>
          </div>

          
          <div>
            <label className="flex items-center text-sm font-semibold text-neutral-400 mb-2">
              <Tag className="h-5 w-5 mr-2 text-yellow-400" />
              Category
            </label>
            <p className="bg-neutral-800 p-3 rounded-lg text-sm text-neutral-200">
              {oneevent.category}
            </p>
          </div>
        </div>

      
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition">
              Back to Events
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
