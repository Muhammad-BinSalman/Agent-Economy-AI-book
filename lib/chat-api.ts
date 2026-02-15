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

export type { ChatRequest, ChatResponse, Citation };
