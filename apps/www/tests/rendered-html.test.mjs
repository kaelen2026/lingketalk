import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const appRoot = fileURLToPath(new URL("../", import.meta.url));
const START_TIMEOUT_MS = 60_000;

let server;
let html;
// Module-scoped so tests that need a second route can fetch it themselves.
let origin;

/** Ask the OS for a free port so parallel runs don't collide. */
function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

/** Poll until `next start` answers, so the test doesn't race the boot. */
async function waitForServer(origin, child) {
  const deadline = Date.now() + START_TIMEOUT_MS;
  let lastError;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited early with code ${child.exitCode}`);
    }
    try {
      const response = await fetch(origin, {
        headers: { accept: "text/html" },
      });
      if (response.ok) return response;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`next start did not become ready: ${lastError}`);
}

before(async () => {
  const port = await freePort();
  origin = `http://127.0.0.1:${port}`;

  server = spawn("next", ["start", "--port", String(port)], {
    cwd: appRoot,
    stdio: ["ignore", "ignore", "inherit"],
    env: process.env,
  });

  const response = await waitForServer(origin, server);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  html = await response.text();
});

after(() => {
  server?.kill("SIGTERM");
});

test("renders the Lingke Talk landing page shell", () => {
  assert.match(html, /<html[^>]*lang="zh-CN"/);
  assert.match(html, /<title>Lingke Talk｜在 AI 时代，保持人的判断<\/title>/);
  assert.match(html, /LINGKE TALK/);
  assert.match(html, /在 AI 时代，/);
  assert.match(html, /保持人的判断。/);
});

test("renders the three editorial pillars", () => {
  for (const pillar of ["AI 洞察", "工具实践", "人物对话"]) {
    assert.match(html, new RegExp(pillar));
  }
});

test("renders the about and subscribe sections", () => {
  assert.match(html, /关于灵客/);
  assert.match(html, /id="subscribe"/);
  assert.match(html, /和我一起，看懂正在发生的未来。/);
  // The form is a client component; its shell must be in the server HTML.
  assert.match(html, /placeholder="你的邮箱"/);
  assert.match(html, /加入订阅/);
});

test("keeps banner and contentinfo outside the main landmark", () => {
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/);
  assert.ok(main, "the page must render a <main> landmark");

  // Nesting <header>/<footer> inside <main> strips their banner and
  // contentinfo roles, so screen-reader landmark navigation loses them.
  assert.doesNotMatch(main[1], /<header\b/);
  assert.doesNotMatch(main[1], /<footer\b/);

  // They still have to be on the page — as siblings of <main>, from the layout.
  assert.match(html, /<header\b/);
  assert.match(html, /<footer\b/);
});

test("anchors the wordmark to the top of the page", () => {
  // Both wordmarks point at #top; the target must be the header itself, not
  // the hero below it, or "back to top" scrolls the header out of view.
  assert.match(html, /<header\b[^>]*id="top"/);
});

test("emits share metadata for the production origin", () => {
  // Exact values, not just presence: the layout's title template appends the
  // site name, and an unset og:title would inherit it and read
  // "…保持人的判断｜Lingke Talk".
  assert.match(
    html,
    /property="og:title" content="Lingke Talk｜在 AI 时代，保持人的判断"/,
  );
  assert.match(html, /property="og:url" content="https:\/\/lingketalk\.com"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
});

test("titles the 404 through the layout's title template", async () => {
  const response = await fetch(`${origin}/no-such-page`, {
    headers: { accept: "text/html" },
  });
  const body = await response.text();

  assert.match(body, /<title>页面不存在｜Lingke Talk<\/title>/);
  // The landing page keeps the untemplated default.
  assert.match(html, /<title>Lingke Talk｜在 AI 时代，保持人的判断<\/title>/);
});

test("serves robots.txt pointing at the sitemap", async () => {
  const response = await fetch(`${origin}/robots.txt`);
  assert.equal(response.status, 200);

  const body = await response.text();
  assert.match(body, /User-Agent: \*/i);
  assert.match(body, /Allow: \//i);
  assert.match(body, /Sitemap: https:\/\/lingketalk\.com\/sitemap\.xml/i);
});

test("serves a sitemap listing the landing page", async () => {
  const response = await fetch(`${origin}/sitemap.xml`);
  assert.equal(response.status, 200);

  const body = await response.text();
  assert.match(body, /<loc>https:\/\/lingketalk\.com<\/loc>/);
});

test("serves a branded 404 that keeps the site chrome", async () => {
  const response = await fetch(`${origin}/no-such-page`, {
    headers: { accept: "text/html" },
  });
  assert.equal(response.status, 404);

  const body = await response.text();
  assert.match(body, /这一页还没有写/);
  // not-found.tsx renders inside the root layout, so the chrome comes for free.
  assert.match(body, /<header\b[^>]*id="top"/);
  assert.match(body, /<footer\b/);
});

test("serves the icon through the app icon convention", () => {
  // `app/icon.svg` is emitted as /icon.svg with a content hash in the query,
  // so the icon busts its own cache. Nothing should still reach for the old
  // public/favicon.svg path.
  assert.match(
    html,
    /<link rel="icon" href="\/icon\.svg\?[^"]+" sizes="any" type="image\/svg\+xml"\/>/,
  );
  assert.doesNotMatch(html, /favicon\.svg/);
});

test("declares the paper theme colour and the default viewport", () => {
  assert.match(html, /name="theme-color"/);
  assert.match(html, /content="#f7f5f0"/);
  assert.match(html, /name="viewport"/);
});

test("drops every trace of the Cloudflare starter template", () => {
  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /Starter Project/i);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});
