# Contact — copy draft

Status: **DRAFT — awaiting approval**

Purpose per design references: a discovery-call-oriented conversion moment.
Calm, minimal fields, clear states. The form is the only server-side
interaction in the site (Route Handler → email provider → response; no
database, no persistent storage).

---

## Section intro

- Label: `Contact`
- Heading: `Tell us about your project.`
- Supporting: `The more context you give, the more useful our first conversation will be. We reply within two business days.`

---

## Form fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | text | yes | |
| Email | email | yes | |
| Company | text | no | |
| Project type | select | yes | Options: `AI systems` / `Automation` / `Web design & development` / `Digital product` / `Something else` |
| Project description | textarea | yes | Placeholder (not label): `What are you building, and where are you starting from?` |
| Budget (optional) | select | no | Options: `Under $25k` / `$25k–$75k` / `$75k–$150k` / `$150k+` / `Not sure yet` |

- Submit button: `Send inquiry`
- Privacy line under button: `We use your details only to respond to this inquiry. Nothing is stored on this site.` (**needs confirmation**)

---

## Form states (copy)

- Idle: — (form as designed)
- Submitting: button label `Sending…`, disabled
- Success: heading `Thanks — it's on its way.` body `We've received your message and will reply within two business days.`
- Failure: heading `That didn't go through.` body `Something went wrong on our end. Your message is still in the form — try again, or email us directly.` + retry action
- Validation: per-field messages, e.g. `Please add your email so we can reply.`

---

## Secondary contact paths

- Direct email: (**needs address — flag**)
- Booking link (Cal.com/Calendly): **not decided — flag.** If added, it sits
  below the form as a quiet alternative, not a competing CTA.

---

## Final CTA (shared with home footer-adjacent section)

Reuses Home's Final CTA copy (see `home.md`), with the Liquid Glass Waves
visual. This page is the CTA's destination, not its duplicate.

---

## Notes / flags

- **Email address for submissions** — placeholder `hello@flowforge.studio` wired in
  (`CONTACT_TO_EMAIL`); swap for the real inbox before launch.
- **Email provider** — **Resend** chosen 2026-09-14; Route Handler → Resend
  implemented; needs real API key + verified sending domain at launch.
- **Privacy line** — confirm it matches actual handling.
- Budget bands are a proposal; adjust or remove.
- Booking link (Cal.com/Calendly) — **not decided — flag.** Not rendered.
