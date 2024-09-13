import { VITE_CLUSTER_OBSERVER_PORT, VITE_CLUSTER_OBSERVER_URL } from "$env/static/private";
import { getClusterJson } from "$lib/utils";
const getMap = new Map<string, (url: string, msg: string) => Promise<any>>();
getMap.set("clusterState", getClusterState);
getMap.set("desired", getDesiredState);
getMap.set("status", getDiff);


const MODE = import.meta.env.MODE;

export async function GET({ url }) {
  if (MODE === "development") {
    console.log("Development mode");
    return new Response(JSON.stringify(getClusterJson()), { status: 200 });
  }
  let observerUrl = `http://${VITE_CLUSTER_OBSERVER_URL}:${VITE_CLUSTER_OBSERVER_PORT}`;

  // Get the 'url' parameter from the query string
  let path = url.searchParams.get("url");
  let msg = url.searchParams.get("msg");
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
    const result = await pathFunction(observerUrl, msg);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Fetch encountered an error:", error);
    return new Response(
      JSON.stringify({ error: "Server Error", details: error }),
      { status: 500 },
    );
  }
}

async function getClusterState(url: string , msg: string) {
  let response = await fetch(`${url}/clusterState`);
  let json = await response.json();
  return json;
}

async function getDesiredState(url: string, msg: string): Promise<any> {
  let response = await fetch(`${url}/desired`);
  let json = await response.json();
  return json;
}

async function getDiff(url: string, msg: string): Promise<any> {
  let response = await fetch(`${url}/status`);
  let text = await response.text();
  return text;
}

const postMap = new Map<string, (config: string) => Promise<any>>();

export async function POST({ request }: any) {}
