import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PISTON_API = 'https://emkc.org/api/v2/piston';

const languageVersions: Record<string, string> = {
  'python': '3.10.0',
  'java': '15.0.2',
  'javascript': '18.15.0',
  'c++': '10.2.0',
  'c': '10.2.0',
  'csharp': '6.12.0',
  'go': '1.16.2',
  'rust': '1.68.2',
  'ruby': '3.0.1',
  'php': '8.2.3',
  'typescript': '5.0.3',
  'swift': '5.3.3',
  'kotlin': '1.8.20',
  'scala': '3.2.2',
  'r': '4.1.1',
  'perl': '5.36.0',
  'lua': '5.4.4',
  'bash': '5.2.0',
  'haskell': '9.0.1',
};

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

    const version = languageVersions[language] || '3.10.0';

    const pistonResponse = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: language,
        version: version,
        files: [{ content: code }],
        stdin: stdin || '',
        run_timeout: 30000,
      })
    });

    if (!pistonResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: `Piston API error: ${pistonResponse.status}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await pistonResponse.json();

    if (result.compile && result.compile.code !== 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Compilation error:\n${result.compile.stderr || result.compile.output || 'Unknown compilation error'}` 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (result.run) {
      let output = '';
      if (result.run.stdout) output += result.run.stdout;
      if (result.run.stderr) output += (output ? '\n' : '') + result.run.stderr;

      const isSuccess = result.run.code === 0;

      if (!isSuccess && !output) {
        output = `Execution failed with exit code ${result.run.code}. No output produced.`;
      }

      const responseBody = isSuccess
        ? { success: true, output: output || '(no output)' }
        : { success: false, error: output || 'Execution failed with unknown error', exitCode: result.run.code };

      return new Response(
        JSON.stringify(responseBody),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Unexpected response from execution service' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});