// netlify/functions/claude-proxy.js
// This serverless function keeps your API key secure on the server side.
// Realtors never see or access the key — they just click buttons.

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // CORS headers so the frontend can call this function
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle preflight CORS
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Get the API key from Netlify environment variables (set in dashboard)
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API key not configured. Contact your CAR administrator." })
    };
  }

  try {
    const requestBody = JSON.parse(event.body);

    // Safety: enforce model and max_tokens limits so no one can abuse the endpoint
    const safeBody = {
      model: "claude-sonnet-4-20250514",
      max_tokens: Math.min(requestBody.max_tokens || 1000, 2000), // Cap at 2000 tokens
      messages: requestBody.messages || []
    };

    // Validate messages exist and aren't too long
    if (!safeBody.messages.length || safeBody.messages.length > 5) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid request" })
      };
    }

    // Call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(safeBody)
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: data.error?.message || "API error" })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Server error. Please try again." })
    };
  }
};
