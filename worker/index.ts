interface Env {
  COUNTER: DurableObjectNamespace;
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export { CounterTs } from "./counter";

export default {
  async fetch(request: Request, env: Env) {
    console.log(env.COUNTER);
    console.log("hello world!");
    const url = new URL(request.url);
    console.log(`request url: ${url.pathname}`);
    if (url.pathname.startsWith("/api/")) {
      // TODO: Add your custom /api/* logic here.
      return new Response("Ok");
    }
    // Otherwise, serve the static assets.
    // Without this, the Worker will error and no assets will be served.
    return env.ASSETS.fetch(request);
  },
};
