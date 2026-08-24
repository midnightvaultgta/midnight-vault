# Midnight Vault — Website

Static marketing site. Plain HTML, CSS and JavaScript — no build step, no framework,
no dependencies. Open `index.html` in a browser and it works.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Homepage — what it is, the machine, the demand, venue benefits |
| `how-it-works.html` | The partnership: what we handle, what the venue provides, FAQ |
| `products.html` | The three product categories |
| `about.html` | Company, standards, Toronto, founding-venue positioning |
| `contact.html` | Venue enquiry form |
| `thank-you.html` | Post-submission page |

## Assets

- `assets/css/style.css` — the whole design system. Colours, type and spacing are
  CSS variables at the top of the file; change them there and the change applies sitewide.
- `assets/js/main.js` — sticky header, mobile menu, scroll reveal, form validation.
- The **MV monogram is drawn in SVG**, not an image file. It lives as `<symbol id="i-mv">`
  at the top of each page's icon sprite — dark M (`#5F594F`), gold V in two tones
  (`#DCBE79` / `#A8853A`). It's razor-sharp at any size and adds nothing to page weight.
  Note it's defined per page, so changing the mark means changing all six sprites.
- `assets/img/machine-wall-mounted.png` — machine render. Also used for the detail
  crops (`.crop--screen`, `.crop--tap`, `.crop--mark`, `.crop--slot`).
- `_v1-archive/` — the previous version of the site. Safe to delete.

## Before going live

1. **Buy a domain** and deploy. Any static host works — Netlify, Vercel, Cloudflare
   Pages and GitHub Pages are all free at this size. Drag the folder in; there is
   nothing to build.

2. **Activate the contact form.** It posts to FormSubmit, which emails submissions
   to `midnightvault.to@gmail.com`. The first submission from the live domain
   triggers a one-time confirmation email — click that link once and it's active
   forever. Send a test submission yourself before promoting the site.

3. **Point the form at the thank-you page.** Once the domain exists, add this line
   inside the `<form>` in `contact.html` (there's a comment marking the spot):

   ```html
   <input type="hidden" name="_next" value="https://YOURDOMAIN.com/thank-you.html">
   ```

   Without it, FormSubmit shows its own generic confirmation page instead of ours.

4. **Update the OG image tags** in `index.html` once there's a share image, so links
   posted to Instagram, WhatsApp and iMessage preview properly.

## Notes on the copy

The site is written for a pre-launch business. There are deliberately **no
testimonials, no venue logos, no install counts and no revenue figures** — nothing
that can't be backed up. Once real venues are live, the strongest additions are:
a named launch partner, a photo of an installed unit, and real performance numbers.

The machine images are labelled as design renders on every page they appear. Keep
that labelling until there are photographs of an installed machine.
