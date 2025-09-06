export async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
        cache: "no-store", 
      });
    return res.json();
}