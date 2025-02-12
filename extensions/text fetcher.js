class RawTextExtension {
  getInfo() {
    return {
      id: 'rawTextFetcher',
      name: 'Raw Text Fetcher',
      blocks: [
        {
          opcode: 'fetchRawText',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get raw text from [url]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com'
            }
          }
        }
      ]
    };
  }

  async fetchRawText({ url }) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return `Error: ${response.status}`;
      }
      const text = await response.text();
      return text;
    } catch (error) {
      return `Fetch error: ${error.message}`;
    }
  }
}

Scratch.extensions.register(new RawTextExtension());
