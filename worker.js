export default {
  async fetch(request, env, ctx) {
    try {
      // Fetch Wikipedia homepage
      const response = await fetch('https://www.wikipedia.org/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();

      // Create a nicely formatted response
      const formattedResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wikipedia HTML Structure - Fetched by Cloudflare Worker</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .header {
            background-color: #0073e6;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #ddd;
            overflow-x: auto;
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 12px;
            line-height: 1.4;
        }
        .stats {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .info {
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌐 Wikipedia HTML Structure</h1>
        <p>Fetched by Cloudflare Worker on ${new Date().toISOString()}</p>
        <p>User: ${request.cf?.country || 'Unknown'} | Worker: abdollahelkadi</p>
    </div>
    
    <div class="stats">
        <h3>📊 Response Stats:</h3>
        <p><strong>Status:</strong> ${response.status} ${response.statusText}</p>
        <p><strong>Content-Type:</strong> ${response.headers.get('content-type')}</p>
        <p><strong>Content-Length:</strong> ${html.length.toLocaleString()} characters</p>
        <p><strong>Server:</strong> ${response.headers.get('server') || 'Not specified'}</p>
        <p><strong>Cache-Control:</strong> ${response.headers.get('cache-control') || 'Not specified'}</p>
    </div>

    <div class="content">
        <h3>📄 HTML Source Code:</h3>
        <div class="info">
            <p>Below is the complete HTML structure of https://www.wikipedia.org/</p>
            <p>Scroll down to see the full source code...</p>
        </div>
        <pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
</body>
</html>
      `;

      return new Response(formattedResponse, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Fetched-By': 'Cloudflare-Worker',
          'X-Fetched-At': new Date().toISOString(),
          'X-Source-URL': 'https://www.wikipedia.org/'
        }
      });

    } catch (error) {
      // Error handling
      const errorResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Cloudflare Worker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #ffe6e6;
        }
        .error {
            background-color: #ffcccc;
            padding: 20px;
            border-radius: 8px;
            border-left: 5px solid #ff0000;
        }
    </style>
</head>
<body>
    <div class="error">
        <h1>❌ Error Fetching Wikipedia</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Worker:</strong> abdollahelkadi</p>
        <p>Please try again later or check the console for more details.</p>
    </div>
</body>
</html>
      `;

      return new Response(errorResponse, {
        status: 500,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8'
        }
      });
    }
  }
};
