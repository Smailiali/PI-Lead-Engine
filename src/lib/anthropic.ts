import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MODEL = 'claude-sonnet-4-20250514'

function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()
}

async function attemptCall(systemPrompt: string, userMessage: string): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  })

  const block = response.content[0]
  if (block.type !== 'text') {
    throw new Error('Unexpected response type from Claude API')
  }

  return stripMarkdownFences(block.text)
}

export async function callClaude<T>(systemPrompt: string, userMessage: string): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const raw = await attemptCall(systemPrompt, userMessage)
      return JSON.parse(raw) as T
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < 2) {
        // Brief pause before retry
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }
  }

  throw new Error(`Claude API call failed after 2 attempts: ${lastError?.message}`)
}
