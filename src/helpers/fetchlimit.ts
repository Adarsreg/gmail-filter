export default async function fetchEmailLimit() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/limit`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch the email limit");
  }
  const data = await response.json();
  return data.limit;
}
