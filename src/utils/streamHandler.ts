export class StreamHandler {
  private decoder: TextDecoder;

  constructor() {
    this.decoder = new TextDecoder();
  }

  async* processStream(reader: ReadableStreamDefaultReader<Uint8Array>) {
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      buffer += this.decoder.decode(value, { stream: true });
      yield buffer;
    }

    const remaining = this.decoder.decode();
    if (remaining) {
      buffer += remaining;
      yield buffer;
    }
  }
}

export const streamHandler = new StreamHandler(); 