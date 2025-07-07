export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        
        // If it's the main page, show the interface
        if (url.pathname === '/') {
            return new Response(getRendererInterface(), {
                headers: { "content-type": "text/html;charset=UTF-8" }
            });
        }
        
        // If it's a fetch request, proxy the website
        if (url.pathname.startsWith('/fetch/')) {
            const targetUrl = decodeURIComponent(url.pathname.replace('/fetch/', ''));
            return await fetchAndRenderWebsite(targetUrl);
        }
        
        return new Response('Not found', { status: 404 });
    },
};

function getRendererInterface() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Renderer - Cloudflare Worker</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .input-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }
        input[type="url"] {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            background: rgba(255,255,255,0.9);
            color: #333;
        }
        .btn {
            background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: bold;
            transition: transform 0.2s;
            width: 100%;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #f5576c;
        }
        .timestamp {
            text-align: center;
            margin-top: 20px;
            opacity: 0.8;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 HTML Renderer Worker</h1>
        <p style="text-align: center; font-size: 1.2em; margin-bottom: 30px;">
            Fetch and proxy any website through Cloudflare's edge network
        </p>
        
        <form onsubmit="fetchWebsite(event)">
            <div class="input-group">
                <label for="website-url">Enter Website URL:</label>
                <input 
                    type="url" 
                    id="website-url" 
                    placeholder="https://example.com" 
                    required
                >
            </div>
            <button type="submit" class="btn">🚀 Fetch & Render Website</button>
        </form>
        
        <div class="feature">
            ✅ <strong>Global CDN:</strong> Fetch websites through Cloudflare's edge network
        </div>
        <div class="feature">
            ✅ <strong>CORS Bypass:</strong> Access websites that block cross-origin requests
        </div>
        <div class="feature">
            ✅ <strong>Fast & Reliable:</strong> Powered by Cloudflare Workers
        </div>
        <div class="feature">
            ✅ <strong>No Installation:</strong> Works directly in your browser
        </div>
        
        <div class="timestamp">
            Deployed by: abdollahelkadi | ${new Date().toISOString()}
        </div>
    </div>

    <script>
        function fetchWebsite(event) {
            event.preventDefault();
            const url = document.getElementById('website-url').value;
            
            if (url) {
                // Redirect to the fetch endpoint
                window.location.href = '/fetch/' + encodeURIComponent(url);
            }
        }
    </script>
</body>
</html>
    `;
}

async function fetchAndRenderWebsite(targetUrl) {
    try {
        // Add protocol if missing
        if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
            targetUrl = 'https://' + targetUrl;
        }
        
        // Fetch the website
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        let html = await response.text();
        
        // Fix relative URLs to absolute URLs
        html = fixRelativeUrls(html, targetUrl);
        
        // Add a header to show it's proxied
        const proxyHeader = `
        <div style="
            position: fixed; 
            top: 0; 
            left: 0; 
            right: 0; 
            background: linear-gradient(90deg, #667eea, #764ba2); 
            color: white; 
            padding: 10px; 
            text-align: center; 
            font-family: Arial, sans-serif; 
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        ">
            🌐 Proxied through Cloudflare Worker | Original: <strong>${targetUrl}</strong> | 
            <a href="/" style="color: #FFD700; text-decoration: none;">← Back to Renderer</a>
        </div>
        <div style="height: 50px;"></div>
        `;
        
        // Insert the header after <body> tag
        html = html.replace(/<body[^>]*>/i, match => match + proxyHeader);
        
        return new Response(html, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
                'cache-control': 'no-cache',
                'x-proxied-by': 'cloudflare-worker',
                'x-original-url': targetUrl
            }
        });
        
    } catch (error) {
        return new Response(getErrorPage(targetUrl, error.message), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
            status: 500
        });
    }
}

function fixRelativeUrls(html, baseUrl) {
    const base = new URL(baseUrl);
    const baseHref = `${base.protocol}//${base.host}`;
    
    // Fix relative URLs in various attributes
    html = html.replace(/src=['"]((?!https?:\/\/|\/\/|data:)[^'"]+)['"]/gi, 
        (match, url) => `src="${new URL(url, baseUrl).toString()}"`);
    
    html = html.replace(/href=['"]((?!https?:\/\/|\/\/|mailto:|tel:|#)[^'"]+)['"]/gi, 
        (match, url) => `href="${new URL(url, baseUrl).toString()}"`);
    
    html = html.replace(/action=['"]((?!https?:\/\/|\/\/)[^'"]+)['"]/gi, 
        (match, url) => `action="${new URL(url, baseUrl).toString()}"`);
    
    return html;
}

function getErrorPage(url, error) {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Fetch Error</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ff6b6b, #ffa500);
            color: white;
            padding: 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .error-container {
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            max-width: 600px;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>❌ Failed to Fetch Website</h1>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Error:</strong> ${error}</p>
        <p>This could be due to:</p>
        <ul style="text-align: left;">
            <li>Website blocking requests</li>
            <li>CORS restrictions</li>
            <li>Server is down</li>
            <li>Invalid URL</li>
        </ul>
        <a href="/" style="color: #FFD700; text-decoration: none; font-weight: bold;">
            ← Try Another Website
        </a>
    </div>
</body>
</html>
    `;
}
