import { getAllArticles } from "@/lib/articles";
import { getSubstackPosts } from "@/lib/substack";
import { SITE_URL } from "@/lib/seo";

// Rebuilt at build time, which is every deploy — so every new post.
export const dynamic = "force-static";

/**
 * llms.txt: a plain-text map of the site for language models (llmstxt.org).
 * Full site context for AEO — who Riz is, what he does, real pricing, every
 * case study, every guide, and every post (both /articles and the Substack
 * feed at /blog) with its summary.
 */
export async function GET() {
  const articles = getAllArticles()
    .map((p) => `- [${p.title}](${SITE_URL}/articles/${p.slug})${p.excerpt ? `: ${p.excerpt}` : ""}`)
    .join("\n");

  const substackPosts = await getSubstackPosts();
  const posts = substackPosts.map((p) => `- [${p.title}](${p.link})${p.excerpt ? `: ${p.excerpt}` : ""}`).join("\n");

  const body = `# Rizwan Mahmood (Riz)

> Operator and builder based in Tallinn, Estonia. Ten years running operations across four continents — Careem, Bolt, Wise — before founding Soch, an AI workflow automation agency. Riz helps business owners get clear on their process before automating it, then builds the AI systems, agents, and n8n workflows that prove it works. He offers 1:1 consulting, automation builds (via Soch), and team workshops/speaking. Site: ${SITE_URL}.

## Who is Riz

- Background: Cambridge-educated, ACCA-qualified. Career: AIESEC (2014, business development) -> founded and ran Perbal Clothing, a Pakistan clothing brand (2015-2017) -> S&P Global (2018, product ops on insurance data) -> Careem (2019, delivery operations; built an emergency healthcare dispatch system with Pakistan's KPK health ministry, cutting response time from 3 minutes to 20 seconds) -> Motive (2020, corporate strategy, US fleet-tech, launched the Canada market) -> Bolt, Tallinn (2021, moved to Estonia, ran courier operations for Bolt Food) -> Bolt under pressure (2022, cut courier cost from 21% to 14% of GMV across 20 countries, saving $3.9M) -> Bolt going global (2023, operational excellence across 15 countries plus public policy and legal) -> Wise (2025, product/process work - 92% straight-through reconciliation, month-end close cut from 8 days to 3) -> founded Soch (2025, AI workflow automation agency, run with one trusted partner) -> launched Academy by Soch to teach founders AI tools directly.
- 2025 labour dispute: Bolt terminated Riz in March 2025. He disputed the termination at the Estonian Labour Dispute Committee (Toovaidluskomisjon), won, and published the case documents publicly - see the writing posts below.
- Stated principles: clarity before tools; the bottleneck is usually the process, not the people or the tools; ship it, then improve it; document everything; automation amplifies what's already there; the human still matters.
- Personal: based in Tallinn, learning Estonian, hosts the "Conversations with Riz" podcast, Anthropic Partner.
- Page: ${SITE_URL}/about

## What Riz does (services)

Three ways to work with Riz - see ${SITE_URL}/services:

1. Consulting - ${SITE_URL}/services/consulting. "Clarity before systems." For owners and founders who know something is wrong but can't quite name it. Three formats:
   - Strategy sessions - 90 minutes, recorded, actioned. Name the problem, leave with a clear direction.
   - Fractional ops - 1-2 days/week, embedded in the team. Riz runs ops alongside you, not for you.
   - Advisory retainer - monthly, async-first, a second opinion on hard decisions.
   - Every engagement starts with a fixed intro call before anything is scoped, gives direct access (no account managers, no hand-offs), and includes documentation and hand-over on everything built.
   - Pricing on this page: from $140/hr, retainers from $2,400/mo. (The separate booking page below lists a flat $200 for a single 60-minute 1:1 session - that's the standalone one-off booking product; the consulting page's hourly/retainer rates apply to ongoing engagements.)
2. Automation builds (via Soch) - delivered through Soch (https://withsoch.com), the AI workflow automation agency Riz co-founded. Scoped up front, weekly demos, full documentation and handover included, no retainer required. Covers n8n workflow automations, AI agents, internal tools, and Claude/LLM agent integrations - idea to deployed system.
3. Workshops & speaking - ${SITE_URL}/services/speaking. "On stages and in rooms." Talks and team sessions on AI leverage, the future of ops, and what changes when smart people get powerful tools. Topics: "Think first, then automate" (the core thesis); what Careem, Bolt, and Wise taught him about ops at scale; AI literacy for operators. Formats:
   - Keynote (45-60 min) - one clear thesis with real stories from scaling ops across Careem, Bolt, and Wise; ends with a framework usable Monday morning.
   - Workshop (half day) - hands-on, specific to the team's actual workflows; room leaves with a working framework, not slides.
   - Founder dinner facilitation (2-3 hours) - an intimate, off-the-record session for 6-12 founders/execs on AI leverage and scaling ops.
   - Podcast guest (flexible) - long-form or quick-hit formats on AI literacy, the Careem/Bolt/Wise years, and giving smart people powerful tools.
   - Booking enquiries: riz@withsoch.com.

### Booking / pricing

- ${SITE_URL}/booking: standalone 1:1 session, 60 minutes, focused on AI, operations, or building a working system. $200 per session.
- ${SITE_URL}/services/consulting ongoing engagements: strategy sessions, fractional ops, or advisory retainer - from $140/hr, retainers from $2,400/mo.
- Automation project pricing (via Soch) is scoped per engagement - not fixed-rate, since scope varies. Contact riz@withsoch.com.

## Case studies

${SITE_URL}/case-studies - 20 anonymized real-world automation builds across 12 industries. Aggregate stats: 20 systems shipped, up to 89% time reduction, fastest delivery in 1 week. Common tech stack: n8n and Claude API, plus integrations such as Twilio, Airtable, HubSpot, Shopify, Gmail, and Slack. Typical delivery window: 1-3 weeks.

1. AI Lead Qualification & Agent Routing (Real Estate / Sales) - 8 min first contact, 34% conversion
2. Client Intake Automation & Case Routing (Law / Professional Services) - 12 min response, 3 hrs/day saved
3. Appointment Reminder & Slot Recovery (Healthcare) - 50% fewer no-shows, 73% slots refilled
4. AI Support Triage & Auto-Resolution (E-commerce) - 67% auto-resolved, 18 min response
5. Trial-to-Paid Conversion Workflow (B2B SaaS / Technology) - 2.1x conversion, 9% -> 19%
6. CV Screening & Candidate Ranking (Recruitment) - same-day shortlist, 75% less time
7. Lead Qualification & Personalised Nurture (Insurance / Financial Services) - 100% follow-up, 22% conversion
8. Reservation Upsell & Guest Feedback Loop (Hospitality) - 14% upsell, 31% feedback rate
9. Automated Monthly Client Reporting (Marketing Agency) - 89% time reduction
10. Student Engagement & Completion (Education) - drop-off 42% -> 28%, 5 hrs/week saved
11. Maintenance Request Triage & Dispatch (Property Management / Real Estate) - <4hr urgent dispatch, 12 hrs/week saved
12. Accounts Payable Automation (Accounting / Financial Services) - 77% time reduction
13. Discovery Call Booking & Pre-Call Prep (Health Coaching) - 52% conversion, 6 more coaching hrs/week
14. Churn Risk Detection & Intervention (B2B SaaS) - 65% churn reduction
15. Transaction Anomaly Detection & Alerts (Fintech) - <25 min merchant alert
16. Content Repurposing Pipeline (Content / Marketing) - 4x output, $800/mo saved
17. Patient Intake & Therapist Matching (Mental Health) - <20 min response
18. AI Personalised Abandoned Cart Recovery (E-commerce) - 6.4% recovery vs. 2.1% baseline
19. Proactive Shipment Delay Communication (Logistics) - 82% fewer WISMO tickets
20. Automated Proposal Generation (Consulting / Business Development) - 76% time reduction

## Guides

${SITE_URL}/guides - tactical, hands-on guides on AI tools and automation:

- 4 Habits Claude's Reflect Dashboard Will Expose
- Build a Claude Skill in 90 Seconds
- 7 Cinematic Film Portrait Prompts - light, grain, and one rule that makes them read as film
- Edit Any Photo Without Opening a Design App Using Gemini
- Fix ChatGPT's Memory in 60 Seconds
- Give Every Prompt a Definition of Done - a prompt engineering guide
- Build the Failure Path Before the Happy Path - an n8n automation guide
- Stop Asking AI for "Content Ideas" - do this instead
- Stop Closing Tabs to Compare Things: Gemini in Chrome
- The 3-Part Prompt That Fixes ChatGPT Agent Mode
- What AI Agents Still Can't Do
- Why Your AI Voiceover and Music Sound Mismatched (ElevenLabs)
- Automating a YouTube Channel Without Making It Obvious You Did
- Zapier vs Make vs n8n - Which Automation Tool Are You Actually Paying For?

## Frequently asked

- Who is Rizwan Mahmood? An operator and builder based in Tallinn, Estonia, with ten years of operations experience at Careem, Bolt, and Wise, now running the AI automation agency Soch and consulting independently on AI and operations.
- What does Riz do? He diagnoses broken or unclear business processes, then designs and builds the AI systems (agents, n8n workflows, internal tools) that automate them - via 1:1 consulting, automation builds through Soch, or team workshops.
- How do I book time with Riz? Book a standalone 60-minute 1:1 session for $200 at ${SITE_URL}/booking, or for an ongoing engagement (strategy sessions, fractional ops, advisory retainer), see ${SITE_URL}/services/consulting - from $140/hr, retainers from $2,400/mo.
- What is Soch? Soch is the AI workflow automation agency Riz co-founded and runs with one trusted partner, building n8n workflows, AI agents, and internal tools for businesses. See https://withsoch.com.
- Does Riz do speaking or workshops? Yes - hands-on, no-slide-deck workshops and talks where teams build a working automation live. See ${SITE_URL}/services/speaking.
- What results has Riz delivered? Examples include cutting Bolt's courier costs from 21% to 14% of GMV across 20 countries ($3.9M saved), building emergency dispatch at Careem that cut response time from 3 minutes to 20 seconds, and 20+ client automation systems with up to 89% time savings - see ${SITE_URL}/case-studies.

## Pages

- About: ${SITE_URL}/about
- Services: ${SITE_URL}/services
- Consulting: ${SITE_URL}/services/consulting
- Speaking: ${SITE_URL}/services/speaking
- Case studies: ${SITE_URL}/case-studies
- Articles: ${SITE_URL}/articles
- Guides: ${SITE_URL}/guides
- Writing / Blog (Substack): ${SITE_URL}/writing
- Booking: ${SITE_URL}/booking

## Articles (SEO pipeline posts, at /articles)

${articles}

## Writing (Substack feed, at /blog and /writing)

${posts}

## Contact

- Email: riz@withsoch.com
- LinkedIn: https://linkedin.com/in/consult-with-riz/
- Instagram: https://instagram.com/etz.riz/
- Substack: https://conversationswithriz.substack.com/
- Company: Soch (https://withsoch.com) - AI workflow automation agency, Anthropic Partner
`;

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
