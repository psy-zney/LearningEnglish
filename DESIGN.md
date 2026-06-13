---
name: AI English Learning
description: Minimal vocabulary learning with calm AI-assisted practice
colors:
  autumn-ink: "#1f1a17"
  autumn-forest: "#2f3428"
  autumn-moss: "#5e6a43"
  autumn-clay: "#8b5e46"
  autumn-umber: "#b06a4a"
  autumn-rust: "#c07a4a"
  autumn-sand: "#d9c4a6"
  autumn-cream: "#f3eadf"
  autumn-slate: "#3a332e"
  autumn-surface: "#251f1b"
  autumn-panel: "#2c2521"
  autumn-border: "#463d36"
  autumn-text: "#f3eadf"
  autumn-text-muted: "#c8b59f"
typography:
  display:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2vw, 2rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "24px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.autumn-umber}"
    textColor: "{colors.autumn-cream}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.autumn-rust}"
    textColor: "{colors.autumn-cream}"
    rounded: "{rounded.md}"
    padding: "12px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.autumn-text}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  card-surface:
    backgroundColor: "{colors.autumn-panel}"
    textColor: "{colors.autumn-text}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-field:
    backgroundColor: "{colors.autumn-surface}"
    textColor: "{colors.autumn-text}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
---

# Design System: AI English Learning

## 1. Overview

**Creative North Star: "The Study Cabin"**

This system should feel like a quiet workspace at dusk, warm wood tones, soft light, and only the tools a learner needs right now. The interface is intentionally minimal and low-noise, with enough warmth to feel human but enough restraint to keep attention on vocabulary, review, and practice.

The product is not trying to impress with spectacle. It should feel dependable, compact, and clear, with calm surfaces, strong hierarchy, and a steady rhythm across dashboard, vocabulary management, login, and practice flows. That aligns with the product goal to make learning active, not passive, and keeps the AI layer supportive rather than dominant.

This system explicitly rejects generic SaaS chrome, noisy neon AI styling, school-like worksheets, and toy flashcard visuals. It should not feel like a corporate admin panel or a consumer social feed. The look is understated, editorial, and practical.

**Key Characteristics:**
- Warm and grounded, not bright or clinical.
- Minimal, focused, and low-noise.
- Clear hierarchy for review, practice, and correction.
- Calm AI assistance, never visually dominant.
- Built for repeated use, not one-time novelty.

## 2. Colors

The palette is a Dark Autumn system: deep warm neutrals, muted moss and clay accents, and a soft cream highlight for legibility and emphasis.

### Primary
- **Autumn Umber** (`#b06a4a`): Primary action color for buttons, active states, and key learning prompts.
- **Autumn Rust** (`#c07a4a`): Hover and emphasis tone for interactive warmth without excess saturation.
- **Autumn Moss** (`#5e6a43`): Secondary learning signal for progress, mastery, and calm success states.

### Neutral
- **Autumn Ink** (`#1f1a17`): Deep text and near-black anchor.
- **Autumn Surface** (`#251f1b`): Main app background in dark mode.
- **Autumn Panel** (`#2c2521`): Cards, sheets, and elevated content surfaces.
- **Autumn Slate** (`#3a332e`): Supporting surface and low-contrast separators.
- **Autumn Border** (`#463d36`): Hairline borders and dividers.
- **Autumn Text** (`#f3eadf`): Primary text on dark surfaces.
- **Autumn Text Muted** (`#c8b59f`): Secondary text, helper copy, and metadata.
- **Autumn Cream** (`#f3eadf`): Light emphasis, readable contrast on warm accents.
- **Autumn Sand** (`#d9c4a6`): Soft highlight for badges, subtle fills, and emphasis backgrounds.

### Named Rules
**The Warm-Contrast Rule.** Use warm neutrals for almost everything, and reserve accent colors for real actions, status, or progress. Bright color should be rare enough that it feels intentional.

## 3. Typography

**Display Font:** Inter (with Segoe UI, Arial, sans-serif)
**Body Font:** Inter (with Segoe UI, Arial, sans-serif)
**Label/Mono Font:** Cascadia Code, Consolas, Courier New, monospace for technical snippets only

**Character:** Clean, modern, and highly readable. The typography should support fast scanning, not decorative reading. Weight and size do the work, with tight tracking on headings and generous line-height in body text.

### Hierarchy
- **Display** (`700`, `clamp(2.25rem, 4vw, 3.5rem)`, `1.05`): Page heroes and primary dashboard welcome text.
- **Headline** (`700`, `clamp(1.5rem, 2vw, 2rem)`, `1.15`): Section titles and major screen headings.
- **Title** (`600`, `1.125rem`, `1.25`): Card titles, panel labels, and compact page sections.
- **Body** (`400`, `1rem`, `1.6`): Explanatory copy and longer learning guidance, kept around 65 to 75ch.
- **Label** (`600`, `0.8125rem`, `0.04em`, uppercase): Small metadata, status pills, and form labels.

### Named Rules
**The Scan-First Rule.** Headlines should be brief and informative, body copy should be short enough to skim, and labels should clarify state without repeating the obvious.

## 4. Elevation

This system uses subtle tonal layering more than heavy shadow. Depth should come from warm surface shifts, restrained borders, and slightly raised panels rather than dramatic floating cards. Shadows exist, but they stay soft and ambient so the interface remains calm.

### Shadow Vocabulary
- **Ambient Low** (`0 1px 2px rgba(0,0,0,0.24), 0 8px 24px rgba(0,0,0,0.18)`): Default card lift and hover response.
- **Ambient Medium** (`0 2px 6px rgba(0,0,0,0.26), 0 16px 32px rgba(0,0,0,0.20)`): Active panels and focused content blocks.

### Named Rules
**The Surface-First Rule.** A surface should read correctly even without shadow. Shadows refine depth, they do not define it.

## 5. Components

Components should feel tactile, restrained, and easy to parse. Rounded corners are present but not syrupy, and spacing should stay disciplined so the interface reads as a study tool, not a playground.

### Buttons
- **Shape:** Medium rounded corners, `14px`.
- **Primary:** Dark umber fill with cream text, `12px 18px` padding.
- **Hover / Focus:** Slight rust shift on hover, visible focus ring, no movement beyond a subtle lift.
- **Secondary / Ghost:** Transparent or low-contrast fills for quieter actions.

### Cards / Containers
- **Corner Style:** `18px` to `24px` depending on density.
- **Background:** Autumn panel or slightly lighter warm surface.
- **Shadow Strategy:** Soft ambient lift only.
- **Border:** Thin warm border when separation is needed.
- **Internal Padding:** `24px` default, tighter for compact cards.

### Inputs / Fields
- **Style:** Warm dark background, muted border, clear text, no harsh chrome.
- **Focus:** Border shifts toward primary umber and a gentle ring appears.
- **Error / Disabled:** Use muted clay or rust for error, reduce contrast for disabled.

### Navigation
- **Style:** Vertical app sidebar on desktop, compact stacked links, simple icon plus label.
- **States:** Active item uses warmer fill and clearer text, hover stays subtle.
- **Mobile Treatment:** Collapse into a compact top or drawer-style entry point before using dense side chrome.

### Status Pills
- **Style:** Small rounded pills with low-noise fills and strong labels.
- **State:** Use color sparingly for correctness, review due, and learning progress.

### Practice Surface
- **Style:** Large, focused content block with generous breathing room.
- **Behavior:** Keep challenge generation, answer entry, and feedback visually separated but close.

## 6. Do's and Don'ts

### Do:
- **Do** keep most surfaces in warm dark neutrals, using cream text for readability.
- **Do** use umber, rust, and moss only where they clarify action or progress.
- **Do** preserve a compact, focused layout with clear hierarchy and low visual noise.
- **Do** make review, add-word, and practice actions easy to find without scanning the whole page.
- **Do** keep cards, inputs, and buttons consistent across dashboard, vocabulary, login, and practice screens.

### Don't:
- **Don't** make the UI look like a generic SaaS dashboard with empty hero stats.
- **Don't** lean into noisy neon AI branding.
- **Don't** use school-like worksheets that feel punitive.
- **Don't** make it feel like a toy flashcard app, a corporate admin panel, or a consumer social feed.
- **Don't** overwhelm the surface with bright gradients, high-saturation accents, or decorative chrome.
- **Don't** make the interface busy, crowded, or emotionally loud.
