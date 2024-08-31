import process from "process";

export async function GET({ url }) {
    let curlpod_url = process.env.CURLPOD || 'http://curlpod:8080';
    console.log("Using CURLPOD URL:", curlpod_url);

    // Get the 'url' parameter from the query string
    let request = url.searchParams.get('url');
    if (!request) {
        return new Response(JSON.stringify({ error: 'URL parameter is missing' }), { status: 400 });
    }

    // Parse the command and arguments from the request parameter
    let cmd = request.split(' ')[0];
    let args = request.split(' ').slice(1).join(' ');
    let fetchUrl = `${curlpod_url}/${cmd}?url=${encodeURIComponent(args)}`;

    // Ensure the URL has the correct scheme
    if (!fetchUrl.startsWith('http://') && !fetchUrl.startsWith('https://')) {
        fetchUrl = 'http://' + fetchUrl;
    }

    console.log("Fetching: ", fetchUrl);

    try {
        let response = await fetch(fetchUrl);
        console.log("Fetch completed:", response.status, response.statusText);

        if (!response.ok) {
            return new Response(JSON.stringify({ error: `Failed to fetch data: ${response.statusText}` }), { status: 500 });
        }

        let result = await response.text();
        console.log("Fetch result:", result);

        return new Response(result, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    } catch (error) {
        console.error("Fetch encountered an error:", error);
        return new Response(JSON.stringify({ error: 'Server Error', details: error.message }), { status: 500 });
    }
}