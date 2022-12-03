import test from "ava";

import run from "../index.js";

test("smoke test", (t) => {
  t.true(run instanceof Function);
});
