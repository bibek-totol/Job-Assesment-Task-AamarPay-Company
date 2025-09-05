import { getData } from "./apiData/data";
import EventBanner from "./component/EventBanner";

export default async function Home() {
  const events = await getData();
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="mx-auto max-w-[1280px]  grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Events Grid */}

        <EventBanner events={events.events} />
      </div>
    </div>
  );
}
