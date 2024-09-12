import fs from "fs";
const getMap = new Map<string, (url: string) => Promise<any>>();
const USE_CLUSTER = import.meta.env.VITE_USE_CLUSTER;
const CURLPOD_URL = import.meta.env.VITE_CURLPOD_URL;
const CURLPOD_PORT = import.meta.env.VITE_CURLPOD_PORT;
const CLUSTER_OBSERVER_URL = import.meta.env.VITE_CLUSTER_OBSERVER_URL;
const CLUSTER_OBSERVER_PORT = import.meta.env.VITE_CLUSTER_OBSERVER_PORT;
export async function GET({ url }) {
  if (USE_CLUSTER === "false") {
    return new Response(JSON.stringify({ error: "Not implemented" }));
  }

  let curlpod_url = `http://${CURLPOD_URL}:${CURLPOD_PORT}`; // Hardcoded, cause I can't get envs to work with TS but will refactor to config object later'
  console.log("Curlpod URL: ", curlpod_url);
  let request = url.searchParams.get("url");
  if (!request) {
    return new Response(JSON.stringify({ error: "URL parameter is missing" }), {
      status: 400,
    });
  }

  let cmd = request.split(" ")[0];
  let args = request.split(" ").slice(1).join(" ");
  let fetchUrl = `${curlpod_url}/${cmd}?url=${encodeURIComponent(args)}`;

  if (!fetchUrl.startsWith("http://") && !fetchUrl.startsWith("https://")) {
    fetchUrl = "http://" + fetchUrl;
  }

  console.log("Fetching: ", fetchUrl);

  try {
    let response = await fetch(fetchUrl);
    console.log("Fetch completed:", response.status, response.statusText);

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch data: ${response.statusText}`,
        }),
        { status: 500 },
      );
    }

    let result = await response.text();
    console.log("Fetch result:", result);

    return new Response(result, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Fetch encountered an error:", error);
    return new Response(
      JSON.stringify({ error: "Server Error", details: error.message }),
      { status: 500 },
    );
  }
}

export async function POST({ request }: any) {
  if (USE_CLUSTER === "false") {
    return new Response(JSON.stringify({ error: "Not implemented" }));
  }
  const config = await request.text();
  console.log("Received kubeconfig:", getNamespaceAndServerFromConfig(config));
  try {
    fetch(`http://${CLUSTER_OBSERVER_URL}:${CLUSTER_OBSERVER_PORT}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: config,
    });
    return new Response(JSON.stringify({ status: "OK" }), { status: 200 });
  } catch (error) {
    console.error("Fetch encountered an error:", error);
    return new Response(
      JSON.stringify({ error: "Server Error", details: error.message }),
      { status: 500 },
    );
  }
}

function getNamespaceAndServerFromConfig(config: String) {
  let lines = config.split("\n");
  let server = "";
  let namespace = "";
  for (let line of lines) {
    if (line.trim().startsWith("server:")) {
      server = line;
    }
    if (line.trim().startsWith("namespace:")) {
      namespace = line;
    }
  }

  return { server, namespace };
}