import { readFile } from "fs/promises";
import { join } from "path";

export const handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Handle preflight OPTIONS requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Read emails data from the JSON file
    const emailsData = await readFile(
      join(process.cwd(), "src/data/mock-emails.json"),
      "utf8"
    );
    const emails = JSON.parse(emailsData);

    // Simulate delay like the original server
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emails),
    };
  } catch (error) {
    console.error("Error loading emails:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
