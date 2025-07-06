export default {
  async fetch(request, env, ctx) {
    try {
      // Fetch anime3rb.com episode page
      const response = await fetch('https://anime3rb.com/episode/one-piece/1135', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'DNT': '1',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'none',
          'Sec-Fetch-User': '?1',
          'Cache-Control': 'max-age=0',
          'Referer': 'https://anime3rb.com/'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const html = await response.text();

      // Create a nicely formatted response
      const formattedResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anime3rb Episode HTML Structure - Fetched by Cloudflare Worker</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 20px;
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .content {
            background-color: #2d2d2d;
            padding: 20px;
            border-radius: 12px;
            border: 1px solid #444;
            overflow-x: auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 11px;
            line-height: 1.4;
            color: #e0e0e0;
            background-color: #1e1e1e;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #ff6b6b;
            max-height: 70vh;
            overflow-y: auto;
        }
        .stats {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .stats h3 {
            margin-top: 0;
            color: #fff;
        }
        .info {
            color: #cccccc;
            font-size: 14px;
            background-color: #333;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        .anime-badge {
            display: inline-block;
            background: linear-gradient(45deg, #ff6b6b, #ffd93d);
            color: #000;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            margin-right: 10px;
        }
        .episode-info {
            background-color: #444;
            padding: 10px;
            border-radius: 8px;
            margin: 10px 0;
        }
        .highlight {
            color: #4ecdc4;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎌 Anime3rb Episode HTML Structure</h1>
        <div class="anime-badge">One Piece Episode 1135</div>
        <p>Fetched by Cloudflare Worker on <span class="highlight">2025-07-06 22:28:35 UTC</span></p>
        <p>User: <span class="highlight">abdollahelkadi</span> | Location: ${request.cf?.country || 'Unknown'}</p>
        <div class="episode-info">
            <strong>🎯 Target:</strong> https://anime3rb.com/episode/one-piece/1135<br>
            <strong>⚡ Worker:</strong> Running on Cloudflare Edge Network
        </div>
    </div>
    
    <div class="stats">
        <h3>📊 Response Statistics:</h3>
        <p><strong>Status:</strong> <span class="highlight">${response.status} ${response.statusText}</span></p>
        <p><strong>Content-Type:</strong> ${response.headers.get('content-type') || 'Not specified'}</p>
        <p><strong>Content-Length:</strong> <span class="highlight">${html.length.toLocaleString()}</span> characters</p>
        <p><strong>Server:</strong> ${response.headers.get('server') || 'Not specified'}</p>
        <p><strong>Cache-Control:</strong> ${response.headers.get('cache-control') || 'Not specified'}</p>
        <p><strong>Last-Modified:</strong> ${response.headers.get('last-modified') || 'Not specified'}</p>
        <p><strong>Content-Encoding:</strong> ${response.headers.get('content-encoding') || 'None'}</p>
        <p><strong>X-Powered-By:</strong> ${response.headers.get('x-powered-by') || 'Not specified'}</p>
    </div>

    <div class="content">
        <h3>📄 HTML Source Code:</h3>
        <div class="info">
            <p><strong>🎌 One Piece Episode 1135</strong> - Complete HTML structure from anime3rb.com</p>
            <p>This page contains the episode player, metadata, and all associated content.</p>
            <p>⚠️ <strong>Note:</strong> This is for educational/testing purposes only. Respect the website's terms of service.</p>
            <p>Scroll down to see the full source code (${html.length.toLocaleString()} characters)...</p>
        </div>
        <pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
</body>
</html>
      `;

      return new Response(formattedResponse, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=1800', // 30 minutes cache
          'X-Fetched-By': 'Cloudflare-Worker-abdollahelkadi',
          'X-Fetched-At': '2025-07-06 22:28:35 UTC',
          'X-Source-URL': 'https://anime3rb.com/episode/one-piece/1135',
          'X-Episode': 'One-Piece-1135',
          'X-User': 'abdollahelkadi'
        }
      });

    } catch (error) {
      // Enhanced error handling for anime site
      const errorResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Anime3rb Fetcher</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .error {
            background: linear-gradient(135deg, #ff4757, #c44569);
            padding: 25px;
            border-radius: 12px;
            border-left: 5px solid #ff3838;
            box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
        }
        .error h1 {
            margin-top: 0;
            color: #fff;
        }
        .details {
            background-color: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
        }
        .anime-badge {
            display: inline-block;
            background: #ffd93d;
            color: #000;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="error">
        <h1>❌ Error Fetching Anime3rb Episode</h1>
        <div class="anime-badge">One Piece Episode 1135</div>
        <div class="details">
            <p><strong>Error:</strong> ${error.message}</p>
            <p><strong>Target URL:</strong> https://anime3rb.com/episode/one-piece/1135</p>
            <p><strong>Time:</strong> 2025-07-06 22:28:35 UTC</p>
            <p><strong>User:</strong> abdollahelkadi</p>
            <p><strong>Possible Causes:</strong></p>
            <ul>
                <li>🚫 Site may have anti-bot protection</li>
                <li>🌐 Cloudflare IP might be blocked</li>
                <li>⏰ Temporary server downtime</li>
                <li>🔒 Geo-blocking restrictions</li>
                <li>🛡️ CAPTCHA or security challenge required</li>
            </ul>
            <p><strong>💡 Suggestion:</strong> Try accessing the site directly first to check if it's working.</p>
        </div>
    </div>
</body>
</html>
      `;

      return new Response(errorResponse, {
        status: 500,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'X-Error-Time': '2025-07-06 22:28:35 UTC',
          'X-Error-User': 'abdollahelkadi'
        }
      });
    }
  }
};
