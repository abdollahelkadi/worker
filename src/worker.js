export default {
  async fetch(request, env, ctx) {
    try {
      // Use the exact cookies and headers from your successful browser request
      const response = await fetch('https://anime3rb.com/episode/one-piece/1135', {
        headers: {
          // Core browser headers
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          
          // Security headers
          'DNT': '1',
          'Upgrade-Insecure-Requests': '1',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          
          // Fetch metadata
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'cross-site',
          'Sec-Fetch-User': '?1',
          
          // Chrome-specific headers
          'Sec-Ch-Ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Priority': 'u=0, i',
          
          // CRITICAL: Include the working cookies from your browser
          'Cookie': '_ga=GA1.1.51104550.1749256621; cf_clearance=sln24nR0Mi__9m0Xp0o_VcTUs_Mc_n49Xd.gMWVx5Hw-1751040350-1.2.1.1-0silUIxn6reJvf3vJn07JshLsq97tjLs2OchCmtPVb5VCL5DlviiXpc.uSIUOqwu3SPg7ZhKI2PUBGd0iQ23bG8QZGfzeI6XfRy6c9rmMYWrCUPrRw26PGCK6ipmdUGPSXRtKKyeJ7HUyAriBGAgd_aEGOY.AQGIq2WPjj_iMtg7lDFN3hf1jT3BdM9NmI_Fjq5BXgsdCCeXT2WJnxy1zQBZSXau7NbfMeGQ9bDSFK0cnaX_NZw3THxtUXzPhQsIFuqpGbVKoNHP0KzN1lrwpl7q1K_7QF3T9remWMjccN_QS0VCTCv7vae5bEeLcJ.grC4UPW7qH7sFYJAlzU8FdoNjRxp1wIlQ1J2Mog4KmLw; darkMode=true; _ga_LWE3WN8EV0=GS2.1.s1751840891$o19$g1$t1751841096$j60$l0$h0; XSRF-TOKEN=eyJpdiI6IkllaG5nRWx2S2tpS2JHK3VKOGE0Q2c9PSIsInZhbHVlIjoiVit1cTRNV1NLZTJudDdLVUx5eGlsaXRxd1ZVRTBFMWp4LzlBMTNSTkd4dGx0RVBuVG9oVURnWEpYV29lSTIxbnJ6NzRBQ29YTk9HRzZZKzMrRzV6MStiZTg1eU82REJzbWFpMVE1Q0RwSHhGL2dmb3UxTXpISEJlUHFwb1FFbkEiLCJtYWMiOiJjMGJmZTkyMWJiYjA3NDI3Mjc5OGQyMjEyNjM5MmI5ZGQzZGEwNzJiNzYxYWM1OTE0NjgxYzY2ZDljYTY0ODIzIiwidGFnIjoiIn0%3D; anmy_aarb_session=eyJpdiI6Ii80cjBvc0hMQVA0VkxhUFFrMnRwV0E9PSIsInZhbHVlIjoiZzdFUko2a0hFNVhwdUo0dWFuUnM3MmNrd2wxQlRCbHp6aFEvSEhFZTg4K0NUdkptMzZ0ZlFhQWZnbVRzWHAzWEQ2R2tsMWtVd2VZdklJcDVwdjJrRE5mYzZBR2huWklya2xCbmpVNHRZTlBJUXdEVklaWGpGVlNpT2FwOEJNeWUiLCJtYWMiOiJlNThlOWQzOTYzZWIyYzcxYTZiZWQ4YzJiZGJiMzBjNDc3NjIwZTI0ZWQ0YTMwMjNjMmRkNTVhYTRiYmY3MWM5IiwidGFnIjoiIn0%3D; prefetchAd_9270587=true; watching-list={%22one-piece%22:{%22video%22:1135%2C%22time%22:7.710337%2C%22progress%22:0.00543022779197291%2C%22updated_at%22:1751841102881}%2C%22updated_at%22:1751841102881}'
        },
        
        // Cloudflare-specific options
        cf: {
          // Disable Cloudflare features that might interfere
          cacheEverything: false,
          scrapeShield: false,
          apps: false,
          mirage: false,
          polish: 'off'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const html = await response.text();

      // Enhanced UI with anime theme
      const formattedResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏴‍☠️ One Piece Episode 1135 - HTML Structure</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
            color: #ffffff;
            min-height: 100vh;
        }
        .header {
            background: linear-gradient(135deg, #ff6b6b, #ffd93d);
            color: #000;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
            text-align: center;
        }
        .success-badge {
            display: inline-block;
            background: linear-gradient(45deg, #00b894, #00cec9);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            margin: 10px;
            box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
        }
        .stats {
            background: linear-gradient(135deg, #6c5ce7, #a29bfe);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
            box-shadow: 0 8px 25px rgba(108, 92, 231, 0.3);
        }
        .stats h3 {
            margin-top: 0;
            color: #fff;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .content {
            background: rgba(45, 45, 45, 0.9);
            padding: 25px;
            border-radius: 15px;
            border: 2px solid #ff6b6b;
            overflow-x: auto;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
        }
        pre {
            white-space: pre-wrap;
            word-wrap: break-word;
            font-size: 11px;
            line-height: 1.5;
            color: #e0e0e0;
            background: linear-gradient(145deg, #1e1e1e, #2d2d2d);
            padding: 20px;
            border-radius: 10px;
            border-left: 5px solid #ffd93d;
            max-height: 70vh;
            overflow-y: auto;
            box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);
        }
        .info {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .highlight {
            color: #ffd93d;
            font-weight: bold;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }
        .pirate-flag {
            font-size: 2em;
            animation: wave 2s ease-in-out infinite;
        }
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            75% { transform: rotate(-5deg); }
        }
        .episode-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .info-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #ff6b6b;
        }
        .cookie-status {
          background: linear-gradient(45deg, #00b894, #55efc4);
          color: #000;
          padding: 8px 15px;
          border-radius: 20px;
          font-weight: bold;
          display: inline-block;
          margin: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="pirate-flag">🏴‍☠️</div>
        <h1>One Piece Episode 1135 - HTML Fetched Successfully!</h1>
        <div class="success-badge">✅ Cloudflare Protection Bypassed</div>
        <div class="cookie-status">🍪 Using Browser Cookies</div>
        <p>Fetched by <span class="highlight">abdollahelkadi</span> on <span class="highlight">2025-07-06 22:32:18 UTC</span></p>
    </div>
    
    <div class="stats">
        <h3>📊 Successful Response Statistics:</h3>
        <div class="episode-info">
            <div class="info-card">
                <strong>Status:</strong> <span class="highlight">${response.status} ${response.statusText}</span>
            </div>
            <div class="info-card">
                <strong>Content-Type:</strong> ${response.headers.get('content-type') || 'Not specified'}
            </div>
            <div class="info-card">
                <strong>Content-Length:</strong> <span class="highlight">${html.length.toLocaleString()}</span> characters
            </div>
            <div class="info-card">
                <strong>Server:</strong> ${response.headers.get('server') || 'Not specified'}
            </div>
            <div class="info-card">
                <strong>CF-Cache-Status:</strong> ${response.headers.get('cf-cache-status') || 'Not specified'}
            </div>
            <div class="info-card">
                <strong>CF-Ray:</strong> ${response.headers.get('cf-ray') || 'Not specified'}
            </div>
        </div>
    </div>

    <div class="content">
        <h3>📄 One Piece Episode 1135 - Complete HTML Source:</h3>
        <div class="info">
            <p><strong>🎌 Episode:</strong> One Piece Episode 1135</p>
            <p><strong>🌐 Source:</strong> https://anime3rb.com/episode/one-piece/1135</p>
            <p><strong>🔧 Method:</strong> Browser Cookie Authentication + CF Protection Bypass</p>
            <p><strong>📊 Size:</strong> ${html.length.toLocaleString()} characters of HTML content</p>
            <p><strong>⚠️ Note:</strong> This worker successfully bypassed Cloudflare protection using browser cookies!</p>
            <p>Scroll below to see the complete episode page HTML structure...</p>
        </div>
        <pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
    </div>
</body>
</html>
      `;

      return new Response(formattedResponse, {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'Cache-Control': 'public, max-age=1800',
          'X-Fetched-By': 'Cloudflare-Worker-abdollahelkadi',
          'X-Fetched-At': '2025-07-06 22:32:18 UTC',
          'X-Source-URL': 'https://anime3rb.com/episode/one-piece/1135',
          'X-Episode': 'One-Piece-1135',
          'X-Method': 'Browser-Cookie-Auth',
          'X-CF-Protection': 'Bypassed',
          'X-User': 'abdollahelkadi'
        }
      });

    } catch (error) {
      // Enhanced error response
      const errorResponse = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>❌ One Piece Episode 1135 - Fetch Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background: linear-gradient(135deg, #2d3436, #636e72);
            color: #ffffff;
        }
        .error {
            background: linear-gradient(135deg, #e17055, #d63031);
            padding: 30px;
            border-radius: 15px;
            border-left: 8px solid #ff3838;
            box-shadow: 0 8px 25px rgba(214, 48, 49, 0.4);
        }
        .error h1 {
            margin-top: 0;
            color: #fff;
        }
        .details {
            background: rgba(255,255,255,0.15);
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            backdrop-filter: blur(5px);
        }
    </style>
</head>
<body>
    <div class="error">
        <h1>❌ Failed to Fetch One Piece Episode 1135</h1>
        <div class="details">
            <p><strong>Error:</strong> ${error.message}</p>
            <p><strong>Target:</strong> https://anime3rb.com/episode/one-piece/1135</p>
            <p><strong>Time:</strong> 2025-07-06 22:32:18 UTC</p>
            <p><strong>User:</strong> abdollahelkadi</p>
            <p><strong>Method:</strong> Browser Cookie Authentication Attempted</p>
            <p><strong>Note:</strong> The cookies from your browser may have expired. Try refreshing them!</p>
        </div>
    </div>
</body>
</html>
      `;

      return new Response(errorResponse, {
        status: 500,
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
          'X-Error-Time': '2025-07-06 22:32:18 UTC',
          'X-Error-User': 'abdollahelkadi'
        }
      });
    }
  }
};
