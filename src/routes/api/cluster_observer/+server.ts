const getMap = new Map<string, (url: string) => Promise<any>>();
getMap.set("/clusterState", getClusterState);
getMap.set("/desiredState", getDesiredState);
getMap.set("/diff", getDiff);

export default async function GET({ url }) {
  let observerUrl = "http://cluster-observer:8080";

  // Get the 'url' parameter from the query string
  let path = url.searchParams.get("url");
  if (!path) {
    return new Response(JSON.stringify({ error: "URL parameter is missing" }), {
      status: 400,
    });
  }

  try {
    let pathFunction = getMap.get(path);
    if (!pathFunction) {
      return new Response(JSON.stringify({ error: "Unknown path" }), {
        status: 400,
      });
    }
    return await pathFunction(observerUrl);
  } catch (error) {
    console.error("Fetch encountered an error:", error);
    return new Response(
      JSON.stringify({ error: "Server Error", details: error }),
      { status: 500 },
    );
  }
}

async function getClusterState(url: string) {
  let response = await fetch(`${url}/clusterState`);
  let json = await response.json();
  return json;
}

async function getDesiredState(url: string): Promise<any> {
  let response = await fetch(`${url}/desiredState`);
  let json = await response.json();
  return json;
}

async function getDiff(url: string): Promise<any> {
  let response = await fetch(`${url}/diff`);
  let json = await response.json();
  return json;
}

const postMap = new Map<string, (config: string) => Promise<any>>();

export async function POST({ request }: any) {}
