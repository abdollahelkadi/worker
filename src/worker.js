// Instead of using """ (which doesn't exist in JavaScript)
// Use one of these approaches:

// Option 1: Single line string with escaped quotes
const htmlContent = "<!DOCTYPE html><html><head><title>My Page</title></head><body><h1>Hello World</h1></body></html>";

// Option 2: Template literals (backticks) for multiline strings
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
`;

// Option 3: Concatenated strings
const htmlContent = 
    "<!DOCTYPE html>" +
    "<html>" +
    "<head><title>My Page</title></head>" +
    "<body><h1>Hello World</h1></body>" +
    "</html>";

// Option 4: Array join method
const htmlContent = [
    "<!DOCTYPE html>",
    "<html>",
    "<head><title>My Page</title></head>",
    "<body><h1>Hello World</h1></body>",
    "</html>"
].join("\n");

// Basic Cloudflare Worker structure
export default {
    async fetch(request, env, ctx) {
        return new Response(htmlContent, {
            headers: {
                "content-type": "text/html;charset=UTF-8",
            },
        });
    },
};
