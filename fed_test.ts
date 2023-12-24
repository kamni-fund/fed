import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { newApp } from "./fed.ts";

Deno.test("Name", async () => {
  const res = await newApp().request(
    "http://localhost/federation?q=me*xdefrag.dev&type=name",
  );
  assertEquals(res.status, 200);
  assertEquals(await res.json(), {
    "stellar_address": "me*xdefrag.dev",
    "account_id": "GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A",
  });
});

Deno.test("Id", async () => {
  const res = await newApp().request(
    "http://localhost/federation?q=GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A&type=id",
  );
  assertEquals(res.status, 200);
  assertEquals(await res.json(), {
    "stellar_address": "me*xdefrag.dev",
    "account_id": "GD5GTXUSBYEKLN242J2QWPTPGRXXV7KKW4FP4YQPP5ZZQ3AA25HNHN3A",
  });
});
