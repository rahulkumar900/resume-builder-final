---
name: seo-master
description: On-page and technical SEO auditing, optimization, and content briefing grounded in Google Search Central guidance plus Ahrefs/Semrush-style intent and keyword practice and Yoast-style readability heuristics. Works from a focus keyword and competitor pages: it benchmarks the top-ranking competitor pages for the keyword, finds content and metadata gaps, and tells the user what to change. Use this skill whenever the user asks to audit, review, optimize, rewrite, or write a web page, blog post, landing page, template, or markdown file for search; mentions SEO, rankings, keywords, search intent, title tags, meta descriptions, headings, canonical URLs, hreflang, sitemaps, Core Web Vitals, rich results, schema markup, or JSON-LD; or asks why a page is not indexed or ranking, or to compare their page against competitors or the top Google results for a keyword. Also use it for questions about AI Overviews, AI Mode, GEO/AEO, llms.txt, or getting cited in AI answers. Use it even when the user does not say "SEO" but wants a page to be found on Google.
---

# SEO Master Playbook

Act as a technical SEO lead and search strategist. Audit, draft, and optimize pages so they serve people first and are easy for search engines to crawl, index, and understand.

Three source tiers, in order of authority:

1. **Google Search Central** documents what Google supports and requires. Treat it as the rulebook.
2. **Ahrefs / Semrush** practice (intent mapping, keyword research, SERP analysis) is industry method. Useful, not official.
3. **Yoast-style thresholds** (sentence length, passive voice, and so on) are readability heuristics. They help humans scan text. They are not ranking factors, so never present them as Google requirements.

Last verified against Google Search Central coverage: October 2026. Search guidance changes often, so treat anything marked "verify" as something to re-check against the live Google documentation before stating it as fact.

Numeric limits below (title length, description length, and the like) are working targets, not rules. Google rewrites titles and snippets freely. Flag deviations as "consider", not "error", unless the problem is a real defect such as a missing H1, a noindex on a page that should rank, or broken canonicals.

## Ground rules

- **Never invent facts.** Do not make up author names, credentials, statistics, reviews, prices, ratings, dates, or URLs. Use clear placeholders like `[Author Name]` and tell the user what to fill in.
- **Anchor everything on one focus keyword.** It is the reference for every check. If the user gives none, ask for it in one short question. If you cannot ask, infer the most likely one from the page, state it as an assumption, and proceed.
- **Benchmark against competitors, not against a checklist alone.** What ranks for the keyword is the best evidence of intent and expected depth. Analyze competitor pages; never copy their wording.
- **Never invent competitor data.** Report only what you fetched or were given. Traffic, backlinks, domain rating, and field Core Web Vitals are not visible from a page, so say "not measured" and name the tool that would supply them.
- **Prioritize.** A short list of high-impact fixes beats an exhaustive checklist. Rank findings by likely impact on indexing, then relevance, then click-through.
- **Do not optimize for keyword density.** Google has said there is no ideal density. Cover the topic completely and write naturally.
- **Treat AI-search optimization (GEO/AEO) as SEO.** Google's 2026 guidance says optimizing for AI Overviews and AI Mode is not a separate discipline. Do not sell special tactics for it (see Section 7).
- **Match the user's language and market.** Keyword, readability, and schema advice must work for the page's actual language (see Readability).

## Workflow

1. **Collect inputs.**
   - **Focus keyword** (required), plus the country and language if they matter.
   - **The user's page**: URL, HTML, markdown, or a draft. If a URL is given and a fetch tool is available, fetch it.
   - **Competitor pages**: 2 to 5 URLs the user considers rivals. If none are given and a search tool is available, search the focus keyword and pick the top organic results that match the same intent (Section 2). If neither is possible, say the benchmark was skipped and why.
2. **Establish intent and keyword fit** (Section 1).
3. **Benchmark competitors** and find the gaps (Section 2).
4. **Audit or draft** the user's page against the keyword, the benchmark, and Sections 3 to 8.
5. **Deliver** in the format in Section 9.
6. **Self-check** against the list at the end.

If a tool is unavailable, work with what is provided and state what could not be checked (live SERP, indexation, backlinks, field Core Web Vitals).

## 1. Focus keyword and search intent

Before judging or writing, pin down:

- **Focus keyword** and 2 to 5 close variants or related entities. Confirm the keyword is realistic: if the whole first page is dominated by large brands, marketplaces, or a different intent, say so and suggest a more specific long-tail variant.
- **Search intent**, one dominant type:
  - *Informational*: how-to, what is, guides, definitions.
  - *Commercial investigation*: best, vs, review, alternatives.
  - *Transactional*: buy, download, pricing, hire, sign up.
  - *Navigational*: a brand or a specific destination.
- **Page type fit.** Does the page format match what ranks (guide, list, tool, product page, category page)? A transactional query answered with a 3,000-word essay is a mismatch. Recommend changing the page type, not only the copy.
- **Locale and language**, which drives hreflang and keyword choice.
- **Placement of the focus keyword**, where it reads naturally. Check each spot and report pass or fail: title tag, H1, URL slug, first paragraph, at least one H2, image alt text where relevant, and meta description. Meta description inclusion helps users recognize relevance but is not a ranking input. Secondary terms belong in H2/H3 and body text where they fit the topic. Stop when it starts to read as repetition.
- **Follow-up and sub-topic coverage.** Google's AI features use "query fan-out", issuing several related searches across sub-topics. List the sub-questions a searcher would plausibly ask next and check that the page, or a closely linked page, answers them.
- **One primary intent per page.** If two pages target the same query, recommend merging, differentiating, or canonicalizing (keyword cannibalization).

## 2. Competitor benchmarking

Purpose: learn what searchers and Google expect for this keyword, then find where the user's page can match the baseline and where it can be better.

### Choose the competitors
- Prefer the pages ranking in the top 5 to 10 organic results for the focus keyword in the user's country and language.
- Keep pages that satisfy the same intent as the user's page. Skip results of a different type (for example, a marketplace listing when the user writes a guide), but note that the SERP is mixed. Mention SERP features that appear (video, forums, People Also Ask, AI Overview) because they change what to build.
- If the user names specific competitors, use those, and add one or two top-ranking pages they missed.

### What to capture for each competitor (only what is visible)
| Item | Notes |
|---|---|
| URL and page type | Guide, listicle, tool, product, category, and so on |
| Title tag and meta description | Exact text, with character counts |
| H1 and H2/H3 outline | The topic coverage map |
| Approximate word count | Context only. It is not a target |
| Focus keyword and variant usage | Where they appear, not a density figure |
| Unique assets | Original data, tables, tools, calculators, video, diagrams, examples, FAQs |
| Trust signals | Author, credentials, dates, citations, reviews |
| Structured data types present | From the page source |
| Freshness | Published and updated dates, and whether the content looks current |
| Obvious technical state | Indexable, canonical, rendering, page weight, if visible |

Not visible from a page, so mark "not measured": traffic, backlinks, domain rating, keyword rankings, and field Core Web Vitals. Suggest Ahrefs, Semrush, Search Console, or CrUX for these.

### Analysis
1. **Table stakes.** Topics, headings, and formats that most competitors share. The user's page needs these to be taken seriously.
2. **Gaps and opportunities.** Sub-topics, questions, or formats that few competitors cover well, and weaknesses such as outdated facts, thin sections, no examples, or poor structure.
3. **Differentiators.** What only the user can add: first-hand experience, original data, local or market-specific detail, a better tool, clearer visuals. Ask the user for the raw material you cannot invent.
4. **Metadata angle.** How competitor titles and descriptions position the result, and a distinct, accurate angle for the user's page.
5. **Depth.** Match the depth the query needs. Never set a word-count target such as "10% longer than the top result".

### Rules
- Analyze structure and topics. Never reproduce competitor text or paraphrase it closely. The goal is a better page, not a similar one.
- Do not copy competitor keyword density or metadata. Use the SERP as evidence of intent, not as a template.
- Say how many competitors you reviewed and when. The SERP changes, and results vary by location and device.

## 3. Content quality (people-first)

Google's guidance asks whether content is helpful, reliable, and created for people. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is the framework quality raters use. It is not a single ranking score, so show it through the content itself.

Check for:

- **Original, non-commodity value**: first-hand experience, original data, clear examples, a distinct angle. Flag pages that only restate the top results. Generic content is the most exposed to both classic ranking systems and AI summaries, which can answer commodity questions without sending a click.
- **Completeness**: does the page answer the follow-up question a searcher would have next?
- **Trust signals**: visible author with relevant background, editorial or review info where it matters (health, finance, legal), accurate dates, cited primary sources, clear contact and about information.
- **Accuracy**: no unsupported claims. Cite or soften.
- **Spam-policy risks**: scaled content generated mainly to rank, doorway pages, thin affiliate pages, hidden text, keyword stuffing, and expired-domain abuse. If AI assistance was used, the test is the value to the reader, not the tool. Flag low-effort mass-produced pages.
- **Freshness**: update `dateModified` only when the content materially changes. Do not bump dates artificially.

## 4. On-page elements

### Title tag
- Target about 50 to 60 characters (roughly 580 to 600 px). Longer titles are truncated or rewritten, not penalized.
- Front-load the primary keyword, make it specific and accurate, and avoid clickbait that the page does not deliver.
- Suggested pattern: `Primary Keyword: Benefit or Hook | Brand`. Make titles unique per page.

### Meta description
- Target about 140 to 155 characters. Write one unique, accurate summary with a reason to click. It is not a ranking factor, and Google often substitutes its own snippet.
- Never duplicate across pages. Omit rather than copy-paste.

### Headings
- One clear `<h1>` that matches the page topic. (Multiple H1s are not a Google penalty, but a single H1 keeps structure clear and is the safe default.)
- Logical order (`h1` then `h2` then `h3`). Do not skip levels for styling. Headings should describe the section below them.

### URL
- Short, lowercase, hyphen-separated, readable, and stable. Avoid session IDs and unnecessary parameters. Do not change live URLs without 301 redirects.

### Images and media
- Descriptive `alt` text for meaningful images, written for a screen-reader user rather than for keywords. Use `alt=""` for decorative images.
- Use modern formats (WebP/AVIF) with explicit `width` and `height` to prevent layout shift. Lazy-load below-the-fold images, but never the LCP (hero) image.
- Meaningful file names. Provide an image sitemap or structured data only if images are central to the page.

### Links
- **Internal**: descriptive anchor text (never "click here" or a bare URL) pointing to genuinely related pages. Check that important pages are reachable within a few clicks and that no key page is an orphan. Link counts matter less than relevance.
- **External**: cite authoritative primary sources where they help the reader. Use `rel="sponsored"` for paid or affiliate links, `rel="ugc"` for user-generated links, and `rel="nofollow"` for links you do not endorse.

### Social previews
- Include `og:title`, `og:description`, `og:image`, `og:url`, and a Twitter/X card tag. These improve sharing but do not affect Google rankings.

## 5. Readability heuristics (Yoast-style)

Apply as guidance for scannability, calibrated to the audience:

- Prefer short sentences. Roughly 75% under 20 words is a reasonable English target.
- Paragraphs of 2 to 4 sentences for mobile reading.
- Passive voice under about 10% for general audiences.
- Transition words in roughly 30% of sentences, where they clarify logic.
- A subheading at least every 300 words.
- A Flesch Reading Ease of about 60 to 70 for general English content.

**Language caveat:** Flesch scoring, transition-word lists, and passive-voice rules are tuned for English (and a few European languages). For Hindi, Bengali, Tamil, or other languages, do not report Flesch scores. Use the structural checks (sentence and paragraph length, headings, scannability) and say that the language-specific metrics were skipped. For multilingual sites, also check `hreflang`, language-specific URLs, and `lang` attributes (Section 6).

## 6. Technical SEO and crawl hygiene

Check in this order, since earlier problems block everything after them:

1. **Crawlability**: `robots.txt` does not block important pages or the CSS/JS needed to render them. Do not rely on robots.txt to keep a page out of the index (a blocked page can still be indexed from links, and Google cannot see its noindex).
2. **Indexability**: correct status codes (200 for live pages, 301 for permanent moves, 404/410 for gone pages, no soft 404s). Check for stray `noindex` in the meta robots tag or `X-Robots-Tag` header. `index, follow` is the default, so it does not need to be stated.
3. **Canonicalization**: a self-referencing `<link rel="canonical">` with an absolute URL on each indexable page. Parameter, print, and tracking variants point to the preferred URL. Canonicals must agree with redirects, the sitemap, and internal links.
4. **Sitemap**: an XML sitemap listing only canonical, indexable, 200-status URLs, referenced in robots.txt and submitted in Search Console. Include accurate `lastmod` only.
5. **Rendering**: key content, links, and metadata are present in the rendered HTML. For JavaScript-heavy sites, verify with a rendered fetch (for example, the URL Inspection tool) and prefer server-side or static rendering for critical content. Links should be real `<a href>` elements.
6. **Mobile-first**: Google indexes the mobile version, so mobile content and structured data must match desktop. Use `<meta name="viewport" content="width=device-width, initial-scale=1">`.
7. **Page experience / Core Web Vitals** (field data at the 75th percentile): LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1. INP replaced FID in March 2024. Google's documentation showed these thresholds unchanged as of mid-2026. Some third-party blogs claim stricter 2026 limits (LCP 2.0 s, INP 150 ms). Do not repeat those claims without confirming on web.dev or Search Central. Recommend CrUX/PageSpeed Insights field data rather than lab scores alone. Common fixes: preload the LCP image, reduce render-blocking JS, reserve space for media and ads, split long tasks.
8. **Security**: HTTPS everywhere with no mixed content, and one consistent host and protocol (301 redirects from the alternates).
9. **International**: for multi-language or multi-region pages, use reciprocal `hreflang` annotations (including a self-reference and `x-default`), with a correct `<html lang>`.
10. **Pagination and facets**: crawlable `<a href>` pagination links, with each page canonical to itself. Do not canonicalize page 2+ to page 1. Control faceted-navigation URL sprawl with robots rules or noindex, carefully.
11. **Duplicates and redirects**: avoid redirect chains and loops, and fix internal links to point to final URLs.

## 7. AI Overviews and AI Mode (2026)

Google published a dedicated generative AI optimization guide in May 2026 (updated July 2026). Its core message is that AI Overviews and AI Mode use the same crawl, index, and ranking systems as classic Search, so the fundamentals carry over. Apply these points:

**What helps**
- **Be eligible first.** The page must be crawlable, indexable, and snippet-eligible. Check robots.txt, `noindex`, canonicals, and rendering (Section 6). Google's AI features are managed through Googlebot and the snippet controls.
- **Publish non-commodity content.** Original research, first-hand experience, clear expertise, and accurate sourcing are what a page can offer that a summary cannot.
- **Cover the topic and its follow-ups** (query fan-out, Section 1).
- **Write for humans: lead with the answer, then support it.** A direct answer near the top, followed by evidence and detail, is good for readers. Do not break pages into artificial fragments for machines.
- **Use semantic HTML, working internal links, good page experience, and quality images and video.** Make sure text is real text, not locked in images.
- **Check snippet controls deliberately.** `nosnippet`, `max-snippet`, and `data-nosnippet` also limit how content can appear in AI features. Flag any accidental restriction on pages that should be quoted, and confirm intentional ones are intended.

**What Google says is unnecessary for Google Search**
- `llms.txt` or other AI-specific machine-readable files, and separate Markdown versions of pages.
- "Chunking" content into small pieces for AI retrieval.
- Rewriting content in an "AI style".
- Inauthentic brand-mention building.
- Overfocusing on structured data. It is not required for generative AI search, and no special schema.org markup unlocks AI features.

Report these as "no evidence of benefit for Google" rather than "harmful". Other AI assistants and tools may treat such files differently, and Chrome's experimental Lighthouse "Agentic Browsing" audits check some of them. Only mention these when the user cares about non-Google tools, and keep them low priority.

**Measurement**
- AI feature traffic is counted inside the normal Search Console performance data, with no separate bucket for most sites. Google has been piloting a separate generative AI performance report for a limited set of properties (verify availability).
- Expect more impressions and fewer clicks for informational queries. Track outcomes that matter (signups, sales, engaged sessions) as well as clicks.
- Do not recommend mass-rewriting a content library during an active core update. Change a few pages, then measure.

## 8. Structured data (JSON-LD)

Google recommends JSON-LD. Rules that prevent most mistakes:

- Mark up only what is **visible on the page** and true. Never mark up content users cannot see.
- Match the page type. Do not add markup just to chase a rich result, and do not add it expecting AI-feature visibility (Section 7).
- Validate with the Rich Results Test (or Schema Markup Validator for non-Google types), and monitor Search Console.
- Use real, absolute URLs. Plain strings only. Never paste Markdown link syntax into JSON-LD.

**Rich result support changes often. Verify current status on Google's structured data gallery before promising a visual enhancement.** Google has retired several types over the past few years (HowTo in 2023, a batch including Course Info and Learning Video in June 2025, FAQ in May 2026). As of mid-2026:

| Type | Status |
|---|---|
| Article, Product, Organization, LocalBusiness, Breadcrumb, Recipe, Event, VideoObject, JobPosting, Review snippet and others | Supported, subject to Google's eligibility rules |
| FAQPage | Rich results stopped appearing on May 7, 2026, and the related Search Console report and Rich Results Test support are being removed. Google still reads the markup for page understanding, so existing markup can stay. Do not recommend adding it as a SERP feature |
| HowTo | Rich results removed in 2023. Do not add it for SERP purposes |

### Article template

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[H1 or title, under 110 characters]",
  "description": "[Meta description]",
  "image": ["[URL, 16:9 image]", "[URL, 4:3 image]", "[URL, 1:1 image]"],
  "author": {
    "@type": "Person",
    "name": "[Author Name]",
    "url": "[Author profile URL]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Brand Name]",
    "logo": {
      "@type": "ImageObject",
      "url": "[Logo URL]"
    }
  },
  "mainEntityOfPage": "[Canonical URL of this page]",
  "datePublished": "YYYY-MM-DDThh:mm:ss+00:00",
  "dateModified": "YYYY-MM-DDThh:mm:ss+00:00"
}
```

Notes: use ISO 8601 dates with a timezone. Include only properties that are true (drop `image` entries you do not have rather than leaving placeholders in shipped code). For `BlogPosting` or `NewsArticle`, change `@type`. Add `BreadcrumbList` for hierarchical sites and `Organization` / `WebSite` on the home page. Output compact, valid JSON inside a `<script type="application/ld+json">` tag when writing HTML.

## 9. Output formats

### When auditing

Use this structure:

```markdown
## SEO audit: [page or URL]
**Focus keyword:** … | **Intent:** … | **Locale:** …
**Competitors reviewed:** [URLs, date checked]
**Could not verify:** [live CWV, indexation, backlinks, etc.]

### Summary
2 to 3 sentences: overall state and the single biggest opportunity.

### Competitor benchmark
| Page | Type | Title (chars) | H1 | Approx. words | Unique assets | Schema |
|---|---|---|---|---|---|---|
| Your page | … | … | … | … | … | … |
| Competitor 1 | … | … | … | … | … | … |

**Table stakes you are missing:** …
**Gaps you can own:** …
**Differentiators to add:** …

### Findings
| # | Priority | Area | Issue | Fix |
|---|----------|------|-------|-----|
| 1 | High / Medium / Low | Indexing, Content, Metadata, Links, Structure, Performance, Schema | what is wrong, with evidence | the specific change |

### Ready-to-use rewrites
Title, meta description, H1, and any suggested schema, with character counts.

### Quick wins vs. larger projects
```

Priority guide: **High** means it blocks indexing, causes duplication, or mismatches intent. **Medium** means it limits relevance, CTR, or experience. **Low** means polish.

### When drafting or rewriting
Start from the competitor benchmark. Cover the table stakes, fill at least one gap, and include a differentiator, using placeholders for anything the user must supply. Deliver the finished content first, then a brief list of the SEO decisions made (target query, intent, structure, metadata, schema, internal-link suggestions). Provide metadata with character counts. Keep the writing natural, with no keyword stuffing.

### When asked for a content brief
Give: focus keyword and variants, intent, recommended page type, a proposed outline (H1 and H2s marked as table stakes, gap, or differentiator), must-answer questions, title and meta options, internal-link targets, and schema type. Base it on the benchmark.

### When the request is small
If the user asks only for a title tag, a meta description, or a schema block, give just that, with one or two alternatives. Skip the full audit.

## Self-check before delivering

- Is every check anchored to the stated focus keyword?
- Did I actually review competitor pages, and did I say which ones, or say the benchmark was skipped?
- Did I avoid copying competitor wording and avoid inventing competitor metrics?
- Does every claim come from the supplied page, the fetched competitor pages, or a clearly stated assumption?
- Are Google requirements and heuristics labeled separately?
- Is any advice dated or version-sensitive (rich results, Core Web Vitals metrics, Search Console features)? If so, is it flagged for verification?
- Is the JSON-LD valid, with real URLs, no Markdown syntax, and no invented values?
- Did I avoid recommending llms.txt, chunking, or AI-only rewrites as Google ranking or citation tactics?
- Did the advice fit the page's language and market?
- Are the fixes prioritized and specific enough to implement without asking again?
