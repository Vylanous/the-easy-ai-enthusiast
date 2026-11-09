# The Easy AI Enthusiast — design direction

User reference: /home/user/Attachments/1794198240132_D5y4DO.jpg. Approved single-reference direction, no gallery.

## Visual identity
- Background #070f16; panels #0c1922 and #0e2028; borders #213740.
- Lime #7cff75 primary; cyan #31e9df secondary; warm ivory #e6f0ee text; muted #91a4ac.
- High-contrast cyberpunk illustrated control room, precise angular framing, fine circuit lines, restrained glow. No purple. No pill-card dashboard grid.
- Wide hero: masked enthusiast left, DOM typography middle, luminous brain right. Recreated text-free art plate. ALL words/numbers in live accessible markup, no lettering in images/screens.

## Typography
- Self-host Rajdhani bold for condensed all-caps display and wordmark, Barlow regular/medium for body, monospace for labels/indices.
- Hero 52–64px desktop; page headings 32px; section 23px; body 14–16px, 1.55 line-height; labels 10–11px tracked.
- Brand heading bright lime/mint with dark stroke and restrained shadow matching reference; solid fills avoid a browser text-clipping rendering bug. Body never glows.

## Layout
- Desktop 224px persistent sidebar; 76px top bar; content padding 30px, max width 1500px.
- Main hero full width, section summaries four across, asymmetric curated resource + learning path, newest-resource list.
- 6px corners for functional controls; 12px chamfers on hero and cards; 1px borders, small corner ticks.
- Base spacing 4px; section gaps 24–32px. Intentionally dense but readable command center.
- Mobile sidebar becomes focus-managed drawer; summaries 2 across, feature columns stack. No horizontal page overflow.

## Interaction / accessibility
- One staggered entrance; prefers-reduced-motion disables animation.
- All controls labelled, keyboard focus cyan outline, dialogs trap focus and Escape closes.
- Loading, error, empty and disabled-with-reason states. Clipboard feedback. Confirm destructive actions.
- Public build is static snapshot; workspace link never fakes a signed-in state.
- Auth screen shares illustration/palette, verifies email before access. User-owned private items separate from owner-only published library.