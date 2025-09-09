import { readFile } from "fs/promises";
import { join } from "path";

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const emailsData = await readFile(
      join(process.cwd(), "src/data/mock-emails.json"),
      "utf8",
    );
    const emails = JSON.parse(emailsData);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
