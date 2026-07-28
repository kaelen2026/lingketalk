/**
 * Facts about the site that more than one file needs to agree on.
 *
 * `metadataBase` in the layout resolves relative metadata URLs, but robots.txt
 * and the sitemap have to emit absolute ones, so the origin cannot live in
 * metadata alone.
 */
export const SITE_ORIGIN = "https://lingketalk.com";

export const SITE_NAME = "Lingke Talk";

export const SITE_TITLE = "Lingke Talk｜在 AI 时代，保持人的判断";

export const SITE_DESCRIPTION =
  "灵客关于科技、AI 与人的独立观察：AI 洞察、工具实践与人物对话。";

/** The shorter line that share cards use, where space is tight. */
export const SITE_SHARE_DESCRIPTION = "AI 洞察、工具实践与人物对话。";
