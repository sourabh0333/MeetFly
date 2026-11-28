// The Guides: /guides and /guides/<slug>. Practical articles for the searches people make before
// they pick a meeting tool. Every MeetFly fact is from the app (as on the rest of the site); no
// competitor names, nothing about stealth mode, interviews only as practice, never "100% local".
// Text supports **bold** and [links](/path). `published` / `updated` are ISO dates. Plan hours come
// from content/pricing.js and the note templates from content/features.js, so they stay in step.
import { hoursText, planById } from "./pricing";
import { templates } from "./features";
import { accent } from "./home";

export const guidesPage = {
  eyebrow: { tag: "Guides", text: "Straight answers for better calls" },
  title: { top: "Guides for people", prefix: "who talk for a", mark: "living." },
  lead: "Practical how-tos for meetings, sales calls and interview practice: what works, what to watch for, and how to do it with MeetFly.",
  readLabel: "min read",
  updatedLabel: "Updated",
  contentsLabel: "In this guide",
  relatedLabel: "More guides",
  allLabel: "All guides",
  tryTitle: "Try it on your next call",
  tryText: "MeetFly is a desktop app for Mac and Windows. It listens on your computer, suggests what to say, and writes your notes when you hang up.",
};

export const guides = [
  {
    slug: "meeting-notes-without-a-bot",
    tag: "Meeting notes",
    title: "How to take meeting notes without a bot joining the call",
    metaTitle: "How to take meeting notes without a bot joining the call",
    description:
      "Four ways to get notes from Zoom, Google Meet or Teams without adding a bot to the meeting: by hand, with your meeting app, or with an assistant that listens on your computer.",
    lead: "Note-taking bots join your meeting as an extra guest. Some people don’t mind; plenty of clients, hosts and companies do. Here’s how to get good notes with nothing added to the call.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "why",
        h: "Why people avoid meeting bots",
        blocks: [
          { p: "A meeting bot is a separate participant that joins the call to record and transcribe it. It shows up in the participant list, often with a name like “Notetaker”, and the host may have to let it in." },
          {
            ul: [
              "**It changes the room.** An extra guest that records everything makes some people more guarded, especially on sales, hiring and support calls.",
              "**It can be blocked.** Some companies and hosts don’t admit bots, so the notes never happen.",
              "**It’s visible to everyone.** Even when it’s welcome, it’s one more thing to explain at the start of the call.",
            ],
          },
          { p: "None of this means you have to give up on notes. You just need a way that doesn’t add anyone to the meeting." },
        ],
      },
      {
        id: "by-hand",
        h: "Option 1: take notes by hand",
        blocks: [
          { p: "The oldest option still works for short calls. A simple structure helps: **decisions**, **action items** (who, what, by when) and **open questions**. Write those three headings before the call and fill them in as you go." },
          { p: "The catch is attention. Every line you write is a moment you’re not listening, and in a busy call you’ll miss exact numbers, names and promises." },
        ],
      },
      {
        id: "meeting-app",
        h: "Option 2: use your meeting app’s own captions or transcript",
        blocks: [
          { p: "Many meeting apps offer live captions, and some offer a transcript. They don’t add a bot, but what you get depends on the app, your plan and whether the host turns it on. Transcripts are often only available to the host, and they’re usually a wall of text rather than notes." },
          { tip: "If you’re not the host, ask before the call whether captions or a transcript will be on, so you know what you’ll have afterwards." },
        ],
      },
      {
        id: "on-your-computer",
        h: "Option 3: an assistant that listens on your computer",
        blocks: [
          { p: "A desktop assistant doesn’t join the meeting at all. It hears the call the way you do: through **your microphone** for your side and **your computer’s sound** for everyone else. Nothing appears in the participant list, and it works with whatever call app you use." },
          { p: "Because it runs beside the call, it can do more than take notes: show a live transcript, suggest a reply when someone asks you something, or translate the other side’s captions." },
          { p: "MeetFly works this way. It saves your notes, transcripts and recordings on your computer. While you talk, the audio goes to a speech service and the transcript text to an AI service, so it can write things down and answer; our [privacy page](/privacy) shows exactly where each part goes." },
        ],
      },
      {
        id: "with-meetfly",
        h: "How to do it with MeetFly, step by step",
        blocks: [
          {
            ol: [
              "**Install MeetFly** on your Mac or Windows PC and sign in. Setup takes about a minute: test your microphone, then play any sound and let MeetFly hear it.",
              "**Start a meeting** from Home, or click **Join** on a meeting from your calendar. Pick the call type (sales, interview, support, team meeting, negotiation or other), so the notes come back in the right shape.",
              "**Talk normally.** The transcript fills in as you speak, labelled You and Them. Type your own rough notes if you like, and press **B** to bookmark a key moment.",
              "**Press End.** Structured notes are ready: a summary, decisions, action items with owners and open questions, plus a follow-up email addressed to the people invited.",
            ],
          },
          { p: "Your rough notes aren’t lost: MeetFly turns them into full notes and keeps every point you wrote. You can then copy the notes as Markdown or rich text, save them as PDF or Word, or send them to Slack." },
        ],
      },
      {
        id: "consent",
        h: "Tell people, even without a bot",
        blocks: [
          { p: "No bot doesn’t mean no one should know. If you’re transcribing a call, tell the people in it, and where the law requires it, ask for their consent. MeetFly reminds you when each meeting starts, with a short notice you can paste into the meeting chat." },
        ],
      },
      {
        id: "checklist",
        h: "A quick checklist",
        blocks: [
          {
            ul: [
              "Decide where the notes will live before the call (your computer, a shared doc, Slack).",
              "Use a structure: summary, decisions, action items with owners, open questions.",
              "Wear headphones, so your microphone doesn’t pick up the other side twice.",
              "Tell people the call is being transcribed.",
              "Send the follow-up while the call is fresh.",
            ],
          },
        ],
      },
    ],
    related: ["meeting-notes-templates", "ai-note-taker-vs-meeting-copilot"],
  },
  {
    slug: "ai-note-taker-vs-meeting-copilot",
    tag: "Choosing a tool",
    title: "AI note-taker vs AI meeting copilot: what’s the difference?",
    metaTitle: "AI note-taker vs AI meeting copilot: what’s the difference?",
    description:
      "AI note-takers write up the meeting afterwards; AI meeting copilots help you while you’re talking. What each does, when each fits, and what to ask before you choose.",
    lead: "Both listen to your meetings and both use AI, but they solve different problems. A note-taker helps after the call. A copilot helps during it.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "note-taker",
        h: "What an AI note-taker does",
        blocks: [
          { p: "An AI note-taker records or transcribes the meeting and turns it into a summary, action items and a searchable record. The value arrives **after the call**: you don’t have to write anything down, and nothing gets forgotten." },
          { p: "Many note-takers work by sending a bot into the meeting as an extra participant. Others run on your computer and listen there instead." },
        ],
      },
      {
        id: "copilot",
        h: "What an AI meeting copilot does",
        blocks: [
          { p: "A copilot helps **while you’re talking**. It follows the conversation live and, when the other person asks something, suggests what you could say, with the key points. It can also answer a question you type mid-call, look at what’s shared on screen, or translate the other side as they speak." },
          { p: "Most copilots still give you notes at the end, so in practice a copilot is a note-taker plus live help." },
        ],
      },
      {
        id: "compare",
        h: "Side by side",
        blocks: [
          {
            table: {
              head: ["", "AI note-taker", "AI meeting copilot"],
              rows: [
                ["When it helps", "After the call", "During the call, and after"],
                ["Main output", "Summary, action items, transcript", "Suggested replies and answers live, then notes"],
                ["How it listens", "Often a bot in the meeting; some run on your computer", "Usually on your computer, beside the call"],
                ["Best for", "Busy teams who want a record of every meeting", "People whose calls depend on what they say next"],
              ],
            },
          },
        ],
      },
      {
        id: "when",
        h: "Which one fits you",
        blocks: [
          { p: "**Choose a note-taker** if your meetings are mostly internal, you already know what to say, and the problem is remembering what was agreed." },
          { p: "**Choose a copilot** if your calls are where the work happens: sales calls with objections, support calls with tricky questions, pitches, negotiations, or calls in a language you’re still learning. Live help changes the call itself, not just the write-up." },
        ],
      },
      {
        id: "questions",
        h: "Five questions to ask before you choose",
        blocks: [
          {
            ol: [
              "**Does it join the call?** A bot is visible to everyone and can be blocked by the host.",
              "**Where are the notes kept?** On your computer, or on the company’s servers?",
              "**What leaves your computer, and where does it go?** Look for a plain list, not just “secure”.",
              "**Does it work with every call app you use?** Including the desktop apps and browser calls.",
              "**What’s free, and what costs money?** Check whether features or only hours differ between plans.",
            ],
          },
        ],
      },
      {
        id: "meetfly",
        h: "Where MeetFly fits",
        blocks: [
          { p: "MeetFly is a copilot that also takes your notes. It listens on your computer, so **no bot joins the call**, and it works with Zoom, Google Meet, Microsoft Teams and any call your computer can hear. During the call it suggests replies the moment the other person stops; after it, you get structured notes from a template for the call type and a follow-up email." },
          { p: "Your notes, transcripts and recordings are saved on your computer. Every plan has every feature, including the free one; plans differ only in hours. See [all features](/features) or [pricing](/pricing)." },
        ],
      },
    ],
    related: ["real-time-help-on-sales-calls", "meeting-notes-without-a-bot"],
  },
  {
    slug: "practise-job-interview-with-ai",
    tag: "Interview practice",
    title: "How to practise for a job interview with AI",
    metaTitle: "How to practise for a job interview with AI",
    description:
      "A step-by-step way to rehearse interview answers out loud with AI: prepare your stories, run a practice call, get suggested answers, and review what to improve.",
    lead: "Reading answers in your head isn’t the same as saying them out loud. Here’s a simple routine for practising interviews with AI, so the real one feels familiar.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "why",
        h: "Why practise out loud",
        blocks: [
          { p: "Most interview nerves come from saying things for the first time under pressure. Practising out loud shows you where your answers ramble, where you forget the result, and which questions you haven’t thought about at all." },
          { p: "AI makes this easier because you don’t need a friend to play the interviewer, and you get a suggested answer and notes to compare against." },
        ],
      },
      {
        id: "prepare",
        h: "Step 1: prepare your material",
        blocks: [
          {
            ul: [
              "**The job post.** Pull out the five or six things they clearly care about.",
              "**Your CV**, so answers can draw on what you’ve actually done.",
              "**Three to five stories** from your work, each with the situation, what you did and the result. Most behavioural questions can be answered with one of them.",
            ],
          },
        ],
      },
      {
        id: "set-up",
        h: "Step 2: set up a practice call in MeetFly",
        blocks: [
          {
            ol: [
              "Start a new meeting and pick the **Interview** call type.",
              "Set a goal, like “Show I can handle difficult customers”.",
              "In **Notes for the AI**, add the company and role, and attach your CV and the job post (PDF, text, Markdown, CSV or JSON).",
              "Turn on **Practice**. In Practice mode your microphone plays the other person, so you can read the interviewer’s questions aloud yourself.",
              "Pick an answer length: **Bullets** to see the key points, or **Script** to see a full answer you can learn from.",
            ],
          },
          { tip: "Save your CV and stories as a context profile, so you can add them to every practice call in one click." },
        ],
      },
      {
        id: "run",
        h: "Step 3: run the practice",
        blocks: [
          { p: "Read a question out loud, the way an interviewer would ask it. MeetFly writes it down and suggests an answer with the key points, drawing on your CV and notes. Then answer it yourself, in your own words, out loud." },
          { p: "Don’t memorise the suggested answer. Use it to check what you missed: a result you forgot to mention, a stronger example, or a point you buried at the end." },
          {
            ul: [
              "Tell me about yourself.",
              "Why do you want this role?",
              "Tell me about a time you handled a difficult situation.",
              "What’s a mistake you made, and what did you learn?",
              "Do you have any questions for us?",
            ],
          },
        ],
      },
      {
        id: "review",
        h: "Step 4: review and repeat",
        blocks: [
          { p: "When you press End, the Interview notes list **the questions asked**, **how you answered** (your strong points), **what to improve next time** and a draft thank-you email. Read them, fix one thing, and run the questions again." },
          { p: "Two or three short sessions are worth more than one long one. Leave a day between them if you can, so the stories settle." },
        ],
      },
      {
        id: "accent",
        h: "If English isn’t your first language",
        blocks: [
          { p: "Practising out loud helps most when you’re speaking a second language. You can also pick the answer length that suits you: **Short** or **Bullets** keep suggestions easy to scan while you speak." },
        ],
      },
      {
        id: "plan",
        h: "A plan for a big interview week",
        blocks: [
          { p: "If you have several interviews coming up, MeetFly’s **Interview Pass** gives you a week of Pro + Voice for one payment, with no subscription to cancel. Every account also starts with 7 days of Pro + Voice free. See [pricing](/pricing)." },
        ],
      },
    ],
    related: ["follow-a-meeting-in-another-language", "meeting-notes-templates"],
  },
  {
    slug: "real-time-help-on-sales-calls",
    tag: "Sales calls",
    title: "How to get real-time help on sales calls",
    metaTitle: "How to get real-time AI help on sales calls",
    description:
      "How to prepare a sales call so AI can help live: give it your prices and terms, get suggested replies to objections as they happen, and leave with deal notes and a follow-up.",
    lead: "The hardest moments in a sales call last a few seconds: a price objection, a question about security, a competitor you didn’t expect. Here’s how to have a good answer ready while you’re still on the call.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "what",
        h: "What real-time help looks like",
        blocks: [
          { p: "A meeting copilot listens to the call on your computer. When the prospect finishes a question or an objection, it suggests what you could say, with the key points under it, in a small panel beside the call. You read it at a glance, then answer in your own words." },
          { p: "In our own test call, suggestions appeared in about a second after the other person stopped talking. Nothing joins the meeting, so the prospect sees the same call they always do." },
        ],
      },
      {
        id: "prepare",
        h: "Step 1: give it what it needs to know",
        blocks: [
          { p: "A suggestion is only as good as the facts behind it. Five minutes of preparation is what turns generic advice into an answer with your real prices in it." },
          {
            ol: [
              "Start a new meeting in MeetFly and pick the **Sales** call type.",
              "Set a **goal** for the call, like “Agree a two-week pilot”.",
              "In **Notes for the AI**, write the facts you’d want at hand: what you sell, prices, discounts you can offer, pilot terms, and who you’re meeting.",
              "Attach documents, like a price list or a case study (PDF, text, Markdown, CSV or JSON).",
            ],
          },
          { tip: "Save your product facts and pricing as a **context profile**, so every sales call starts with them in one click." },
        ],
      },
      {
        id: "objections",
        h: "Step 2: handle objections as they come",
        blocks: [
          { p: "Here’s a real moment from a MeetFly practice call. The prospect said: “Our main worry is the price. It is higher than the tool we use right now.” MeetFly suggested:" },
          { tip: "“I completely understand where you are coming from on cost. How about we run a two-week free pilot for up to 10 seats so your team can test the value firsthand before making any decision?”" },
          { p: "Notice what it does: it acknowledges the worry, then moves to a next step drawn from the pilot terms in the notes. Use suggestions like that as a prompt, not a script. Say it your way." },
          {
            ul: [
              "**Pick an answer length** that you can read while talking: **Short** or **Bullets** work best on live calls.",
              "**Use quick actions** when you need something specific: What should I say?, Follow-ups, Recap or Fact-check.",
              "**Press B** to bookmark a key moment, like the first mention of budget. It’s highlighted in your notes.",
            ],
          },
        ],
      },
      {
        id: "screen",
        h: "Step 3: get help with what they share",
        blocks: [
          { p: "Prospects often share a screen: a security questionnaire, a requirements list, their current tool. **Read my screen** looks at what’s shared and answers with it in mind, so you can respond to “point three on our checklist” without scrolling back through your notes." },
          { p: "For anything else, type it in the **Ask box**, like “What did they say about the budget?”. It answers privately from the call so far." },
        ],
      },
      {
        id: "after",
        h: "Step 4: leave with deal notes and a follow-up",
        blocks: [
          { p: "When you press End, the Sales notes template fills itself in from the call:" },
          {
            ul: [
              "Customer needs and pain points",
              "Budget, authority, need and timeline",
              "Objections and how they were handled",
              "Action items, with owners and due dates",
              "Next steps",
              "A follow-up email draft, addressed to the people invited",
            ],
          },
          { p: "Open the follow-up in your mail app, copy the notes for Slack, or send the meeting to Zapier, Make or n8n with a webhook, to pass it on to the tools your team uses." },
        ],
      },
      {
        id: "tips",
        h: "Good habits for live help",
        blocks: [
          {
            ul: [
              "Listen first. Glance at the suggestion after they finish, not while they’re talking.",
              "Keep your notes for the AI current. Old prices produce confident wrong answers.",
              "Wear headphones, so your microphone doesn’t pick up the prospect twice.",
              "Tell people the call is being transcribed; MeetFly reminds you at the start.",
            ],
          },
        ],
      },
    ],
    related: ["ai-note-taker-vs-meeting-copilot", "meeting-notes-templates"],
  },
  {
    slug: "follow-a-meeting-in-another-language",
    tag: "Languages",
    title: "How to follow a meeting in another language",
    metaTitle: "How to follow a meeting in another language",
    description:
      "How to follow a call when the other side speaks another language: live translated captions in 14 languages, replies suggested in your language, and notes you can read afterwards.",
    lead: "Following a fast meeting in your second language is tiring, and missing one sentence can mean missing the decision. Here’s how to read along in your own language while the call happens.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "captions",
        h: "Read their words in your language, live",
        blocks: [
          { p: "MeetFly writes down both sides of the call as you talk. With live translation on, each of the other side’s lines also appears translated, right underneath, in the language you pick. You can listen to the original and glance at the translation when you need it." },
          { p: "It translates into any of these 14 languages: English, Hindi, Spanish, French, German, Portuguese, Italian, Japanese, Korean, Chinese, Arabic, Russian, Tamil and Bengali." },
        ],
      },
      {
        id: "set-up",
        h: "Set it up",
        blocks: [
          {
            ol: [
              "In MeetFly, open **Settings** and choose your language under **Translate their words to**.",
              "Start or join the meeting as usual, from MeetFly or your own call app.",
              "Open the floating panel over the meeting, so the captions sit right next to the call.",
            ],
          },
        ],
      },
      {
        id: "replies",
        h: "Get suggested replies in your language",
        blocks: [
          { p: "MeetFly suggests what to say when the other person stops talking. To get those suggestions in a particular language, say so in **Notes for the AI** before the call, like “Reply in English”. It then answers in that language even when the other side speaks another." },
          { tip: "Pick the **Short** answer length. Short suggestions are much easier to read while you’re also following a conversation in another language." },
        ],
      },
      {
        id: "notes",
        h: "Catch up without interrupting",
        blocks: [
          { p: "If you lose the thread, you don’t have to stop the meeting. **Live notes** keep a rolling summary, action items and open questions, refreshed every 30 seconds. The **Ask box** lets you check privately: “What did they decide about Friday?”" },
          { p: "After the call, the full transcript, translations and structured notes are saved with the meeting, so you can read anything you missed at your own pace." },
        ],
      },
      {
        id: "speak",
        h: "And when you speak",
        blocks: [
          { p: "If you’d like people to hear your English in a particular accent, MeetFly’s **accent voice** can speak your words in one of 17 English accents, a moment after you say them. Read [how to speak in a different accent on calls](/guides/speak-in-a-different-accent-on-calls)." },
        ],
      },
      {
        id: "tips",
        h: "Tips for multilingual meetings",
        blocks: [
          {
            ul: [
              "Wear headphones, so MeetFly hears the other side clearly and your microphone hears only you.",
              "Ask people to put numbers, dates and names in the chat as well; they’re the easiest things to mishear.",
              "Confirm decisions out loud at the end: “So we agreed Friday, if testing is done by Wednesday?”",
            ],
          },
        ],
      },
    ],
    related: ["speak-in-a-different-accent-on-calls", "meeting-notes-without-a-bot"],
  },
  {
    slug: "speak-in-a-different-accent-on-calls",
    tag: "Accent voice",
    title: "How to speak in a different accent on Zoom, Meet or Teams",
    metaTitle: "How to speak in a different accent on Zoom, Meet or Teams",
    description:
      "How an accent voice works on calls: you speak normally and people hear your words in the English accent you pick, spoken by a native voice. Set-up for Zoom, Google Meet and Teams.",
    lead: "Some people want to be understood more easily on calls; others just prefer how a different accent sounds. An accent voice lets you speak normally while the people on the call hear your words in the accent you choose.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "how",
        h: "How an accent voice works",
        blocks: [
          { p: "You speak as you always do. MeetFly writes down what you said, then a voice native to the accent you picked says it to the call, about 1 to 1.5 seconds later. The people on the call hear only that voice, not your own microphone." },
          { p: "Because it says what speech recognition heard, it works best when you speak clearly in full sentences. Whole sentences are spoken as soon as you start the next one, and the rest when you pause." },
        ],
      },
      {
        id: "choose",
        h: "Choose the accent, voice and tone",
        blocks: [
          { p: `There are ${accent.accents.length} English accents: ${accent.accents.join(", ")}. Each one is spoken by a native speaker.` },
          {
            ul: [
              "**Voice:** female or male.",
              "**Tone:** Natural, Calm, Warm, Neutral, Soft or Firm.",
              "**Speed:** from 0.6× to 1.5×.",
              "**Try it:** type a line and press Play to hear it before the call.",
            ],
          },
        ],
      },
      {
        id: "set-up",
        h: "Set it up for your call app",
        blocks: [
          {
            table: {
              head: ["Where the meeting runs", "Mac", "Windows"],
              rows: [
                ["Joined from MeetFly (Zoom, Teams, Webex, Whereby, Slack huddles)", "Nothing to set up. MeetFly is the meeting’s microphone.", "Nothing to set up. MeetFly is the meeting’s microphone."],
                ["Google Meet (opens in your browser)", "Pick MeetFly Microphone as the microphone in Meet.", "Pick “CABLE Output (VB-Audio Virtual Cable)” as the microphone in Meet."],
                ["The Zoom or Teams desktop app", "Pick MeetFly Microphone as the microphone in the app.", "Pick “CABLE Output (VB-Audio Virtual Cable)” in the app. MeetFly adds it the first time; Windows asks for permission and a restart."],
              ],
            },
          },
          { p: "On a Mac, MeetFly Microphone installs with the .pkg installer, or MeetFly offers to add it on first launch. See the set-up for [Zoom](/works-with/zoom), [Google Meet](/works-with/google-meet) and [Microsoft Teams](/works-with/microsoft-teams)." },
        ],
      },
      {
        id: "use",
        h: "Turn it on during a call",
        blocks: [
          {
            ul: [
              "Press **V**, or use the **Accent** button on the call bar or the floating panel.",
              "Or tick **Turn my accent on** while you prepare the call, so it’s on from the start.",
              "To hear the accent voice yourself, switch on “Let me hear the accent voice too” and wear headphones, or you’ll hear yourself twice.",
            ],
          },
        ],
      },
      {
        id: "honest",
        h: "Be open about it",
        blocks: [
          { p: "An accent voice changes how people hear you, so tell the people you talk to that you’re using one. Use it to be understood, never to pretend to be someone else." },
        ],
      },
      {
        id: "plans",
        h: "Which plans include it",
        blocks: [
          { p: `**Pro + Voice** includes ${hoursText(planById.pro_voice.voice)} of accent voice a month, and the **Interview Pass** ${hoursText(planById.interview_pass.voice)} over its 7 days. The **Free** plan has ${hoursText(planById.free.voice)} a month to try it, and every account starts with 7 days of Pro + Voice. See [pricing](/pricing).` },
        ],
      },
    ],
    related: ["follow-a-meeting-in-another-language", "meeting-notes-without-a-bot"],
  },
  {
    slug: "meeting-notes-templates",
    tag: "Meeting notes",
    title: "Meeting notes templates for sales, support, interviews and negotiations",
    metaTitle: "Meeting notes templates for sales, support and interviews",
    description:
      "Five meeting notes templates you can use today: team meetings, sales calls, customer support, interviews and negotiations, with what to capture in each section.",
    lead: "Good notes have a shape that fits the call. A sales call needs the budget and the objections; a support call needs the steps you tried. Here are five templates, the same ones MeetFly fills in for you.",
    published: "2026-11-28",
    updated: "2026-11-28",
    sections: [
      {
        id: "shared",
        h: "What every template has",
        blocks: [
          { p: "Whatever the call, three parts are always worth writing down:" },
          {
            ul: [
              "**A summary** in three to five sentences, so anyone can catch up in a minute.",
              "**Action items**, each with a task, an owner and a due date. Without an owner, it won’t happen.",
              "**A follow-up email draft**, short and ready to send while the call is fresh.",
            ],
          },
        ],
      },
      ...templates.types.map((t) => ({
        id: t.id,
        h: `${t.label} notes template`,
        blocks: [
          { p: t.blurb },
          { ul: t.sections.map(([name, hint]) => (hint ? `**${name}** (${hint})` : `**${name}**`)) },
        ],
      })),
      {
        id: "automatic",
        h: "Let the template fill itself in",
        blocks: [
          { p: "In MeetFly, you pick the call type before you start, and when you press End the notes come back in that template, written from the transcript. Your own rough notes are kept, too: MeetFly turns them into full notes and keeps every point you wrote." },
          { p: "Picked the wrong one? **Rewrite notes** turns any meeting’s notes into another template. See all five side by side on the [features page](/features#templates)." },
        ],
      },
    ],
    related: ["meeting-notes-without-a-bot", "real-time-help-on-sales-calls"],
  },
];

// Reading time from the article's words (about 220 words a minute).
export function readingMinutes(g) {
  const text = [g.lead, ...g.sections.flatMap((s) => [s.h, ...s.blocks.flatMap((b) => [b.p, b.tip, ...(b.ul || []), ...(b.ol || []), ...(b.table ? b.table.rows.flat() : [])])])]
    .filter(Boolean)
    .join(" ");
  return Math.max(2, Math.ceil(text.split(/\s+/).length / 220));
}
