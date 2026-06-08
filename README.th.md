# tcher-design

[English](README.md) · **ไทย**

skill ที่ install เข้า AI coding tool มี 27 commands, scanner 59 rules, เข้าใจ Thai typography และ UX

```bash
npx tcher-designs skills install
```

---

## Features

### Thai typography (`/tcher thai`)

ปรับ typography ให้รองรับภาษาไทยได้จริง: line-height, letter-spacing, font pairing ไทยกับอังกฤษ

### SEA และ Thai UX (`/tcher sea`)

ปรับ UI ให้เหมาะกับ user ไทยและ SEA: payment, trust signals, layout density, mobile-first

### Detect UX: 59 rules ไม่ต้องเรียก AI (`detect`)

scan DOM จริงบน website ด้วย Design 45 rules จับ AI และ template tells, UX 14 rules จับ usability อิง [Laws of UX](https://lawsofux.com/) ใช้งานได้ใน Live mode หรือรัน `npx tcher-designs detect`

### Flows: user ทำ task จบได้จริงไหม (`/tcher flows`)

ไล่ task ข้ามหน้าใน codebase หา dead ends, missing states, orphan routes, form ที่ submit แล้วเงียบ แล้วบอกว่าควรแก้อะไรก่อน

---

## 27 Commands

ทุก command อ่าน `PRODUCT.md` และ `DESIGN.md` ก่อนทำงาน รัน `/tcher init` ครั้งเดียวพอ พิมพ์ `/tcher` เปล่าๆ มันจะแนะนำ command ถัดไปที่เหมาะกับสถานะโปรเจกต์ตอนนั้น

**Start a project**

| Command | ทำอะไร |
|---|---|
| `/tcher init` | setup ครั้งแรก Skill สัมภาษณ์แล้วเขียน `PRODUCT.md` และ `DESIGN.md` ที่ทุก command อ่านก่อนทำงาน |
| `/tcher document` | generate `DESIGN.md` จาก code ที่มีอยู่แล้ว (ใช้ในกรณีมี design อยู่ก่อน) |
| `/tcher extract` | ดึง pattern, component, token ที่ซ้ำกันมาเป็น design system จริง |
| `/tcher shape` | plan UX และ UI ก่อนเขียน code |
| `/tcher idea` | explore design directions เพื่อหา idea ใหม่ๆ จาก brief |
| `/tcher craft` | shape, build, iterate ฟีเจอร์ตั้งแต่ต้นจนจบ |

**Review what you have**

| Command | ทำอะไร |
|---|---|
| `/tcher critique` | รีวิว UX ของ surface นึง: hierarchy, clarity, cognitive load พร้อม score |
| `/tcher audit` | technical pass: a11y, performance, responsive, anti-patterns |
| `/tcher flows` | ไล่ task ใน code หา dead ends, missing states, orphan pages, broken flows |

**Sharpen one axis**

| Command | ทำอะไร |
|---|---|
| `/tcher typo` | แก้ font และ type scale |
| `/tcher palette` | เปลี่ยน color system |
| `/tcher layout` | แก้ spacing, grids, visual hierarchy |
| `/tcher animate` | เพิ่ม motion ที่มีเหตุผล พร้อม reduced-motion path |
| `/tcher motion` | เพิ่ม micro-interactions และ personality |
| `/tcher extreme` | เกิน convention: shaders, spring physics, scroll-driven reveals |

**Dial the intensity**

| Command | ทำอะไร |
|---|---|
| `/tcher brave` | ทำ design ที่ timid ให้ชัดเจนและกล้าออกแบบมากขึ้น |
| `/tcher calm` | ลด design ที่ loud เกินไป |
| `/tcher trim` | ตัดส่วนเกินใน UI ออก ให้เหลือแค่ที่จำเป็น |
| `/tcher refine` | final pass ก่อน ship |

**Make it production-ready**

| Command | ทำอะไร |
|---|---|
| `/tcher harden` | error states, i18n, edge cases, text overflow |
| `/tcher onboard` | first-run flows, empty states, path ไป first win |
| `/tcher clarify` | เขียน labels, error messages, microcopy ใหม่ให้ไม่งง |
| `/tcher responsive` | adapt ข้าม devices และ contexts พร้อม tap targets ที่ใช้ได้จริง |
| `/tcher optimize` | แก้ UI performance: load, render, bundle |

**Localize for Thai and SEA**

| Command | ทำอะไร |
|---|---|
| `/tcher thai` | ปรับ typography ให้รองรับภาษาไทย |
| `/tcher sea` | ปรับ UX สำหรับ user ไทยและ SEA |

**Iterate in the browser**

| Command | ทำอะไร |
|---|---|
| `/tcher live` | เลือก element บนหน้า website เพื่อออกแบบหรือแก้ใหม่ พร้อม Hot Swap UI |

อยาก shortcut ไหน `/tcher pin audit` ทำให้ `/audit` เรียก `/tcher audit` ได้เลย `/tcher unpin` เอาออก

---

## Live Mode

`/tcher live` เปิด helper บน port 8400 แล้ว inject picker เข้า dev server ที่รันอยู่ (Vite, Next.js, SvelteKit, Astro, Nuxt หรือ static file) คลิก element พิมพ์ direction เช่น "ลด SaaS vibe ลง" แล้ว AI hot-swap variants เข้าหน้าผ่าน HMR ปรับ slider ถ้ามี แล้ว accept มันเขียน winner กลับ source และ clean up เอง ส่วน discard ย้อนกลับ pill bar เดียวกันมีปุ่ม Detect UX ด้วย

---

## Reference Files

ไฟล์ที่ให้ AI คิดในทิศทางที่ถูกต้อง ไม่ใช่แค่ "good design" กว้างๆ

| Reference | ครอบคลุม |
|---|---|
| typography | type systems, font pairing, modular scales |
| color-and-contrast | OKLCH, tinted neutrals, dark mode, contrast ratios |
| spatial-design | spacing systems, grids, visual hierarchy |
| motion-design | easing curves, staggering, reduced motion |
| interaction-design | forms, focus states, loading patterns |
| responsive-design | mobile-first, fluid type, container queries |
| ux-writing | button labels, error messages, empty states |

---

## Install แบบ copy

```bash
npx tcher-designs skills install   # ติดตั้ง
npx tcher-designs skills update    # อัปเดตเป็นเวอร์ชันล่าสุด
```

หรือ copy โฟลเดอร์สำเร็จรูปจาก `dist/`:

| Tool | Command |
|---|---|
| Claude Code (project) | `cp -r dist/claude-code/.claude your-project/` |
| Claude Code (global) | `cp -r dist/claude-code/.claude/* ~/.claude/` |
| Cursor | `cp -r dist/cursor/.cursor your-project/` |
| Gemini CLI | `cp -r dist/gemini/.gemini your-project/` |
| Codex CLI | `cp -r dist/agents/.agents your-project/` |
| GitHub Copilot | `cp -r dist/github/.github your-project/` |
| Trae | `cp -r dist/trae/.trae/skills/* ~/.trae/skills/` |
| Rovo Dev | `cp -r dist/rovo-dev/.rovodev your-project/` |

ใช้ได้กับ Claude Code · Cursor · Gemini CLI · Codex CLI · VS Code Copilot · OpenCode · Kiro · Trae · Rovo Dev · Qoder · Pi

---

## License

Apache 2.0 ดูที่ [LICENSE](LICENSE) และ [NOTICE.md](NOTICE.md) สร้างโดย [Tcher](https://tcher-designs.vercel.app/)
