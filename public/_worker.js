// worker/counter.ts
var CounterTs = class {
  constructor(state, env) {
    this.state = state;
  }
  async fetch(request) {
    let url = new URL(request.url);
    let value = await this.state.storage?.get("value") || 0;
    switch (url.pathname) {
      case "/increment":
        ++value;
        break;
      case "/decrement":
        --value;
        break;
      case "/":
        break;
      default:
        return new Response("Not found", { status: 404 });
    }
    await this.state.storage?.put("value", value);
    return new Response(value.toString());
  }
};

// worker/index.ts
var worker_default = {
  async fetch(request, env) {
    console.log(env.COUNTER);
    console.log("hello world!");
    const url = new URL(request.url);
    console.log(`request url: ${url.pathname}`);
    if (url.pathname.startsWith("/api/")) {
      return new Response("Ok");
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  CounterTs,
  worker_default as default
};
