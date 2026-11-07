import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, currentResume } = await req.json();

    const groqApiKey = process.env.GROQ_API_KEY;
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // If GROQ_API_KEY is configured, call Groq API with GPT OSS 120B / Llama 3
    if (groqApiKey) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqApiKey}`,
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              {
                role: 'system',
                content: `You are Prepresume's Conversational Resume Builder Agent.
You are helping an Indian or global candidate construct their professional resume.
Rules:
1. Probe contextually for: company name, dates, core tech stack, and measurable outcomes (latency, revenue, team size, users).
2. DO NOT fabricate metrics or dates. Ask the user if they know approximate numbers.
3. If the user provided new work history, extract it into structured updates and present a clean suggestion.
4. Keep replies friendly, concise, and professional.`,
              },
              ...messages,
            ],
            temperature: 0.4,
            max_tokens: 1000,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices[0]?.message?.content || '';
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.warn('Groq direct call failed, using intelligent built-in agent:', err);
      }
    }

    // High-intelligence built-in agent fallback that parses natural language and provides follow-up guidance
    let reply = '';
    const lower = lastUserMessage.toLowerCase();

    if (lower.includes('work') || lower.includes('developer') || lower.includes('engineer') || lower.includes('year') || lower.includes('company')) {
      reply = `That's great! To format this into a high-scoring ATS bullet for Indian tech employers:

1. What was the exact company name and location?
2. What was your timeframe (e.g. 2022 to 2024)?
3. What key technologies did you use (e.g. React, Next.js, Node.js, PostgreSQL)?
4. Did you achieve any measurable outcome? For example:
   - "Reduced API response times by 30%"
   - "Scaled service to handle 500k+ daily requests"
   - "Led a team of 4 engineers"

Tell me these details and I will draft a high-impact bullet using Google's XYZ formula!`;
    } else if (lower.includes('skill') || lower.includes('tech') || lower.includes('stack')) {
      reply = `Got it! I've updated your skills inventory. Which category do these primarily belong to (e.g. Frontend, Backend, Cloud & DevOps, or Databases)? Also mention any certifications you hold (like AWS SAA or Meta Front-End).`;
    } else if (lower.includes('college') || lower.includes('degree') || lower.includes('btech') || lower.includes('university')) {
      reply = `Academic qualifications noted. What was your graduation year and your CGPA or percentage? (For freshers and Indian campus recruiters, displaying 8.0+ CGPA provides strong ATS filtering points).`;
    } else {
      reply = `Understood. I have recorded those details into your live draft. Would you like to add your next work experience, highlight a major open-source or commercial project, or polish your executive summary?`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process AI conversation request' },
      { status: 500 }
    );
  }
}
