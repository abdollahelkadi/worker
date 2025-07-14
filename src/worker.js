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
    <title>Wikipedia Fetcher - Cloudflare Worker</title>
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
        <h1>📚 Wikipedia Fetcher Worker</h1>
        <p style="text-align: center; font-size: 1.2em; margin-bottom: 30px;">
            Fetch and display Wikipedia articles through Cloudflare's edge network
        </p>
        
        <form onsubmit="fetchWikipedia(event)">
            <div class="input-group">
                <label for="wikipedia-query">Enter Wikipedia Article or URL:</label>
                <input 
                    type="text" 
                    id="wikipedia-query" 
                    placeholder="e.g., 'Artificial Intelligence' or 'https://en.wikipedia.org/wiki/Machine_Learning'" 
                    required
                >
            </div>
            <button type="submit" class="btn">📖 Fetch Wikipedia Article</button>
        </form>
        
        <div class="feature">
            ✅ <strong>Wikipedia Optimized:</strong> Enhanced formatting for Wikipedia articles
        </div>
        <div class="feature">
            ✅ <strong>Global CDN:</strong> Fetch articles through Cloudflare's edge network
        </div>
        <div class="feature">
            ✅ <strong>CORS Bypass:</strong> Access Wikipedia content without restrictions
        </div>
        <div class="feature">
            ✅ <strong>Fast & Reliable:</strong> Powered by Cloudflare Workers
        </div>
        
        <div class="timestamp">
            Deployed by: abdollahelkadi | ${new Date().toISOString()}
        </div>
    </div>

    <script>
        function fetchWikipedia(event) {
            event.preventDefault();
            const query = document.getElementById('wikipedia-query').value.trim();
            
            if (query) {
                let url;
                
                // Check if it's already a Wikipedia URL
                if (query.includes('wikipedia.org')) {
                    url = query;
                } else {
                    // Convert search term to Wikipedia URL
                    const encodedQuery = encodeURIComponent(query.replace(/\\s+/g, '_'));
                    url = 'https://en.wikipedia.org/wiki/' + encodedQuery;
                }
                
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
        
        // Check if it's a Wikipedia URL for special handling
        const isWikipedia = targetUrl.includes('wikipedia.org');
        
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
        
        // Apply Wikipedia-specific enhancements if it's a Wikipedia page
        if (isWikipedia) {
            html = enhanceWikipediaContent(html, targetUrl);
        }
        
        // Add a header to show it's proxied
        const headerType = isWikipedia ? 'Wikipedia Article' : 'Website';
        const headerIcon = isWikipedia ? '📚' : '🌐';
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
            ${headerIcon} ${headerType} proxied through Cloudflare Worker | Original: <strong>${targetUrl}</strong> | 
            <a href="/" style="color: #FFD700; text-decoration: none;">← Back to Wikipedia Fetcher</a>
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
                'x-original-url': targetUrl,
                'x-content-type': isWikipedia ? 'wikipedia-article' : 'website'
            }
        });
        
    } catch (error) {
        return new Response(getErrorPage(targetUrl, error.message), {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
            status: 500
        });
    }
}

function enhanceWikipediaContent(html, baseUrl) {
    // Add Wikipedia-specific styling improvements
    const wikipediaStyles = `
    <style>
        /* Wikipedia-specific enhancements */
        .mw-body {
            max-width: 900px !important;
            margin: 0 auto !important;
            padding: 20px !important;
        }
        .mw-body-content {
            font-family: Georgia, 'Times New Roman', serif !important;
            line-height: 1.6 !important;
        }
        .mw-parser-output p {
            text-align: justify !important;
            margin-bottom: 1em !important;
        }
        .infobox {
            border: 1px solid #a2a9b1 !important;
            border-spacing: 3px !important;
            background-color: #f8f9fa !important;
            color: black !important;
            margin: 0.5em 0 0.5em 1em !important;
            padding: 0.2em !important;
            float: right !important;
            clear: right !important;
            font-size: 88% !important;
            line-height: 1.5em !important;
        }
        .navbox {
            border: 1px solid #a2a9b1 !important;
            background-color: #f8f9fa !important;
        }
        /* Hide some clutter for better reading experience */
        .mw-editsection { display: none !important; }
        .citation-needed { color: #0645ad !important; }
    </style>
    `;
    
    // Insert styles in the head
    html = html.replace(/<\/head>/i, wikipediaStyles + '</head>');
    
    return html;
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
    const isWikipedia = url.includes('wikipedia.org');
    const title = isWikipedia ? 'Failed to Fetch Wikipedia Article' : 'Failed to Fetch Website';
    const suggestions = isWikipedia ? [
        'Article might not exist',
        'Check spelling of the article name',
        'Try a different language Wikipedia (e.g., es.wikipedia.org)',
        'Wikipedia server might be temporarily unavailable'
    ] : [
        'Website blocking requests',
        'CORS restrictions',
        'Server is down',
        'Invalid URL'
    ];
    
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
        <h1>❌ ${title}</h1>
        <p><strong>URL:</strong> ${url}</p>
        <p><strong>Error:</strong> ${error}</p>
        <p>This could be due to:</p>
        <ul style="text-align: left;">
            ${suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <a href="/" style="color: #FFD700; text-decoration: none; font-weight: bold;">
            ← Try Another ${isWikipedia ? 'Article' : 'Website'}
        </a>
    </div>
</body>
</html>
    `;
}
