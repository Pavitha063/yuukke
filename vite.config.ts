import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, Plugin} from 'vite';

function elevenLabsProxy(apiKey: string, voiceId: string): Plugin {
  return {
    name: 'elevenlabs-speech-proxy',
    configureServer(server) {
      server.middlewares.use('/api/speech', async (request, response) => {
        if (request.method !== 'POST') { response.statusCode = 405; response.end(); return; }
        let raw = '';
        request.on('data', chunk => { raw += chunk; });
        request.on('end', async () => {
          try {
            const { text } = JSON.parse(raw) as { text?: string };
            if (!text?.trim()) { response.statusCode = 400; response.end('Text is required'); return; }
            if (!apiKey) { response.statusCode = 503; response.end('ElevenLabs is not configured'); return; }
            const elevenResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
              method: 'POST',
              headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
              body: JSON.stringify({ text, model_id: 'eleven_multilingual_v2' }),
            });
            if (!elevenResponse.ok) { response.statusCode = elevenResponse.status; response.end(await elevenResponse.text()); return; }
            response.setHeader('Content-Type', 'audio/mpeg');
            response.end(Buffer.from(await elevenResponse.arrayBuffer()));
          } catch { response.statusCode = 500; response.end('Unable to create speech'); }
        });
      });
    },
  };
}

function geminiProxy(apiKey: string, model: string): Plugin {
  return {
    name: 'gemini-agent-proxy',
    configureServer(server) {
      server.middlewares.use('/api/assistant', async (request, response) => {
        if (request.method !== 'POST') { response.statusCode = 405; response.end(); return; }
        let raw = '';
        request.on('data', chunk => { raw += chunk; });
        request.on('end', async () => {
          try {
            const { message, context, language } = JSON.parse(raw) as { message?: string; context?: string; language?: string };
            if (!message?.trim()) { response.statusCode = 400; response.end('Message is required'); return; }
            if (!apiKey) { response.statusCode = 503; response.end('Gemini is not configured'); return; }
            const systemInstruction = `You are Yuukke AI, a warm, practical business assistant for women entrepreneurs. Reply in ${language === 'Tamil' ? 'Tamil' : 'English'}. Answer the user's exact message directly in plain, natural language. For example, if the user says hello, greet them and offer help. Do not output plans, task labels, internal reasoning, instruction summaries, headings such as "Greeting", JSON, or incomplete fragments. Keep answers under 110 words and use simple, encouraging language. You may help with business records, inventory, marketplace visibility, mentors, and finance. Never invent government schemes, eligibility, approvals, revenue, stock, or actions. Use only the supplied business context; if information is missing, say so. For finance, state that a mentor should verify eligibility before an application. Business context:\n${context ?? 'No data available.'}`;
            const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
              method: 'POST',
              headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
              body: JSON.stringify({ system_instruction: { parts: [{ text: systemInstruction }] }, contents: [{ role: 'user', parts: [{ text: message }] }], generationConfig: { temperature: 0.35, maxOutputTokens: 1024 } }),
            });
            if (!geminiResponse.ok) { response.statusCode = geminiResponse.status; response.end(await geminiResponse.text()); return; }
            const result = await geminiResponse.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
            const text = result.candidates?.[0]?.content?.parts?.map(part => part.text ?? '').join('').trim();
            if (!text || /^(greeting|offer help|using context|plan:|task:|internal)/i.test(text)) { response.statusCode = 502; response.end('Gemini returned an invalid assistant reply'); return; }
            response.setHeader('Content-Type', 'application/json'); response.end(JSON.stringify({ text }));
          } catch { response.statusCode = 500; response.end('Unable to generate an assistant response'); }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), elevenLabsProxy(env.ELEVENLABS_API_KEY, env.ELEVENLABS_VOICE_ID), geminiProxy(env.GEMINI_API_KEY, env.GEMINI_MODEL || 'gemini-3.6-flash')],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
