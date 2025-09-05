
import {  Star} from "lucide-react";
import FilterSection from "./hook/FilterSection";
import { getData } from "./apiData/data";
import EventBanner from "./component/EventBanner";

export default async function Home() {
 
  const events = await getData();
  console.log(events);
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <aside className="md:col-span-1 space-y-6 mt-10">
          <FilterSection title="Review Score">
            {[5,4,3,2,1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < stars ? "text-yellow-400" : "text-neutral-600"}`} />
                ))}
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Categories">
            {['Golden Triangle Tours','Rajasthan Tour','Same Day Tour','Weekend Tour'].map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-indigo-500" /> {cat}
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Languages">
            {['English','Espanol','Francais','Hindi','Japanese','Vietnamese'].map(lang => (
              <label key={lang} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" className="accent-indigo-500" /> {lang}
              </label>
            ))}
          </FilterSection>
        </aside>

        {/* Events Grid */}

        <EventBanner events= {events.events}/>

        

        

      </div>
    </div>
  );
}


