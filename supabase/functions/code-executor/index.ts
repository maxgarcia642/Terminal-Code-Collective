import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const JUDGE0_API = 'https://ce.judge0.com';

const languageIds: Record<string, number> = {
  'python': 100,
  'java': 91,
  'javascript': 102,
  'c++': 105,
  'c': 103,
  'csharp': 51,
  'go': 107,
  'rust': 108,
  'ruby': 72,
  'php': 98,
  'typescript': 101,
  'swift': 83,
  'kotlin': 111,
  'scala': 112,
  'r': 80,
  'perl': 85,
  'lua': 64,
  'bash': 46,
  'haskell': 61,
};

function toBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function fromBase64(b64: string): string {
  if (!b64) return '';
  try { return decodeURIComponent(escape(atob(b64))); } catch { return atob(b64); }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { code, language, stdin } = await req.json();

    if (!code || !language) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing code or language' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const langId = languageIds[language.toLowerCase()];
    if (!langId) {
      return new Response(
        JSON.stringify({ success: false, error: `Unsupported language: ${language}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const judge0Response = await fetch(`${JUDGE0_API}/submissions?base64_encoded=true&wait=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: toBase64(code),
        language_id: langId,
        stdin: stdin ? toBase64(stdin) : '',
      })
    });

    if (!judge0Response.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Judge0 API error: ${judge0Response.status}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await judge0Response.json();

    const stdout = fromBase64(result.stdout);
    const stderr = fromBase64(result.stderr);
    const compileOutput = fromBase64(result.compile_output);
    const statusDesc = result.status?.description || '';

    if (result.status?.id === 6) {
      return new Response(
        JSON.stringify({ success: false, error: `Compilation error:\n${compileOutput || stderr || statusDesc}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (result.status?.id >= 7) {
      return new Response(
        JSON.stringify({ success: false, error: `${statusDesc}:\n${stderr || compileOutput || 'No details'}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let output = stdout;
    if (stderr) output += (output ? '\n' : '') + stderr;

    const isSuccess = result.status?.id === 3;
    const responseBody = isSuccess
      ? { success: true, output: output || '(no output)' }
      : { success: false, error: output || 'Execution failed', exitCode: result.status?.id };

    return new Response(
      JSON.stringify(responseBody),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});