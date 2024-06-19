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

//not yet used in the project, but it is a helper function to fetch the email limit from the server, mainly to test the API
