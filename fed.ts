import { Hono } from "https://deno.land/x/hono@v3.11.8/mod.ts";

interface federation {
  stellar_address: string;
  account_id: string;
}

const fedNames = new Map<string, federation>([
  ["me*xdefrag.dev", {
    stellar_address: "me*xdefrag.dev",
    account_id: "GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A",
  }],
]);

const fedIds = new Map<string, federation>([
  ["GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A", {
    stellar_address: "me*xdefrag.dev",
    account_id: "GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A",
  }],
]);

export const newApp = (): Hono => {
  const app = new Hono();
  app.get("/federation", (c) => {
    c.header("Access-Control-Allow-Origin", "*");

    const q = c.req.query("q") ?? "";
    const type = c.req.query("type");

    switch (type) {
      case "name":
        return c.json(fedNames.get(q));
      case "id":
        return c.json(fedIds.get(q));
      default:
        c.status(400);
        return c.json({ "error": "invalid type" });
    }
  });

  return app;
};

Deno.serve(newApp().fetch);
