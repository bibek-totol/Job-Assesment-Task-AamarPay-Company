
import { getData } from "../apiData/data";
import MyEventClient from "../component/MyEventClient";

export default async function MyEvents() {
  const events = await getData();

  return (
    <MyEventClient events={events}/>
  );
}
