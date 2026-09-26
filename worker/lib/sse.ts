// Converts the Workers AI SSE stream into the site's own SSE format:
//   data: {"delta":"..."}\n\n   …   data: [DONE]\n\n

/** Incremental parser for "data: ..." SSE lines. Returns complete payload strings. */
export class SseParser {
  private buffer = '';

  push(chunk: string): string[] {
    this.buffer += chunk;
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() ?? '';
    const out: string[] = [];
    for (const raw of lines) {
      const line = raw.trim();
      if (line.startsWith('data:')) out.push(line.slice(5).trim());
    }
    return out;
  }

  flush(): string[] {
    const rest = this.buffer.trim();
    this.buffer = '';
    return rest.startsWith('data:') ? [rest.slice(5).trim()] : [];
  }
}

/** Pull the text delta out of one upstream payload (native or OpenAI-style). */
export function extractDelta(payload: string): string | null {
  if (!payload || payload === '[DONE]') return null;
  try {
    const obj = JSON.parse(payload) as {
      response?: unknown;
      choices?: { delta?: { content?: unknown }; text?: unknown }[];
    };
    if (typeof obj.response === 'string') return obj.response;
    const choice = obj.choices?.[0];
    if (typeof choice?.delta?.content === 'string') return choice.delta.content;
    if (typeof choice?.text === 'string') return choice.text;
    return null;
  } catch {
    return null;
  }
}

export function encodeEvent(data: string | Record<string, unknown>): string {
  return `data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`;
}

/** Wraps an upstream AI stream (bytes) into the site's SSE format. */
export function toSiteStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const parser = new SseParser();
  let finished = false;

  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        for (const payload of parser.push(decoder.decode(chunk, { stream: true }))) {
          if (payload === '[DONE]') {
            if (!finished) controller.enqueue(encoder.encode(encodeEvent('[DONE]')));
            finished = true;
            continue;
          }
          const delta = extractDelta(payload);
          if (delta) controller.enqueue(encoder.encode(encodeEvent({ delta })));
        }
      },
      flush(controller) {
        for (const payload of parser.flush()) {
          const delta = extractDelta(payload);
          if (delta) controller.enqueue(encoder.encode(encodeEvent({ delta })));
        }
        if (!finished) controller.enqueue(encoder.encode(encodeEvent('[DONE]')));
      },
    }),
  );
}
