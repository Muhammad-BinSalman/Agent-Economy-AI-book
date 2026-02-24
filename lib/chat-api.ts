/**
 * Chat API service for communicating with the backend.
 */

interface ChatRequest {
  query: string;
  selected_text?: string;
  book_id?: string;
  mode?: "full_book" | "selected_text";
  max_chunks?: number;
}

interface Citation {
  chunk_id: string;
  text: string;
  source: string;
  chapter?: string;
  section?: string;
  score: number;
}

interface ChatResponse {
  answer: string;
  citations: Citation[];
  mode: string;
  chunks_retrieved: number;
  latency_ms: number;
  model_used: string;
}

type StreamDeltaEvent = { type: "delta"; delta: string };
type StreamFinalEvent = {
  type: "final";
  citations: Citation[];
  mode: string;
  chunks_retrieved: number;
  latency_ms: number;
  model_used: string;
};
type StreamErrorEvent = { type: "error"; message: string };

export type ChatStreamEvent = StreamDeltaEvent | StreamFinalEvent | StreamErrorEvent;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Use simple chat endpoint (no RAG/Qdrant)
    const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
}

function parseSseLines(buffer: string) {
  const events: string[] = [];
  let rest = buffer;
  while (true) {
    const idx = rest.indexOf("\n\n");
    if (idx === -1) break;
    const raw = rest.slice(0, idx);
    rest = rest.slice(idx + 2);
    events.push(raw);
  }
  return { events, rest };
}

function extractSseData(eventBlock: string) {
  const lines = eventBlock.split("\n");
  const dataLines = lines
    .filter((l) => l.startsWith("data:"))
    .map((l) => l.slice("data:".length).trimStart());
  return dataLines.join("\n");
}

export async function streamChatMessage(
  request: ChatRequest,
  onEvent: (event: ChatStreamEvent) => void
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("Streaming response body is not available");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parsed = parseSseLines(buffer);
    buffer = parsed.rest;

    for (const block of parsed.events) {
      const data = extractSseData(block);
      if (!data) continue;

      try {
        const evt = JSON.parse(data) as ChatStreamEvent;
        onEvent(evt);
      } catch {
        // Ignore malformed events
      }
    }
  }
}

export type { ChatRequest, ChatResponse, Citation };
