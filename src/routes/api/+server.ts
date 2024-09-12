import fs from "fs";
const getMap = new Map<string, (url: string) => Promise<any>>();
const MODE = import.meta.env.MODE;
export async function GET({ url }) {
  if (MODE === "development") {
    return new Response(JSON.stringify({ error: "Not implemented" }));
  }

  let curlpod_url = "http://curlpod:8080"; // Hardcoded, cause I can't get envs to work with TS but will refactor to config object later'
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
  if (MODE === "development") {
    return new Response(JSON.stringify({ error: "Not implemented" }));
  }
  const config = await request.text();
  console.log("Received kubeconfig:", getNamespaceAndServerFromConfig(config));
  try {
    fetch("http://cluster-observer:8080/upload", {
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