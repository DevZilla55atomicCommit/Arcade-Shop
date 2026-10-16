#!/usr/bin/env python3
"""Generate the og-image.jpg for the site."""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/Volumes/LEDFLSHDRV/gaming-store/public/images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Create og-image (1200x630)
w, h = 1200, 630
img = Image.new('RGB', (w, h), (0x0a, 0x0a, 0x1a))
draw = ImageDraw.Draw(img)

# Multi-layer gradient background
for y in range(h):
    ratio = y / h
    if ratio < 0.2:
        r = int(0x0a + (0x1a - 0x0a) * (ratio * 5))
        g = int(0x0a + (0x0a - 0x0a) * (ratio * 5))
        b = int(0x1a + (0x2a - 0x1a) * (ratio * 5))
    elif ratio < 0.5:
        r = int(0x1a + (0x2a - 0x1a) * ((ratio - 0.2) * 3.33))
        g = int(0x0a + (0x1a - 0x0a) * ((ratio - 0.2) * 3.33))
        b = int(0x2a + (0x3a - 0x2a) * ((ratio - 0.2) * 3.33))
    else:
        r, g, b = 0x2a, 0x1a, 0x3a
    draw.line([(0, y), (w, y)], fill=(r, g, b))

# Synthwave grid lines (perspective)
horizon = h * 0.35
for i in range(12):
    y = int(horizon + (h - horizon) * (i / 12) ** 1.5)
    alpha = int(80 * (1 - i / 12))
    color = (0xff, 0x00, 0x6e)
    draw.line([(0, y), (w, y)], fill=color, width=1)

# Vertical perspective lines
for i in range(-6, 7):
    x_center = w // 2 + i * (w // 24)
    draw.line([(x_center, horizon), (w // 2 + i * (w // 6), h)], fill=(0x00, 0xd4, 0xff), width=1)

# City silhouette
for i in range(12):
    x = i * w // 12
    building_h = int(horizon * (0.25 + (i % 4) * 0.15))
    draw.rectangle([x, horizon - building_h, x + w // 12, horizon], fill=(0, 0, 10))
    # Lit windows
    for wx in range(int(x + 10), int(x + w // 12 - 10), 20):
        for wy in range(int(horizon - building_h + 10), int(horizon - 10), 15):
            if (wx + wy) % 3 == 0:
                draw.rectangle([wx, wy, wx + 8, wy + 8], fill=(0xff, 0xea, 0x00))

# Neon highway strips
draw.rectangle([0, horizon, w // 10, h], fill=(0x1a, 0x0a, 0x2a))
draw.rectangle([9 * w // 10, horizon, w, h], fill=(0x2a, 0x0a, 0x3a))

# Title text
try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 72)
    subfont = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
except:
    font = ImageFont.load_default()
    subfont = ImageFont.load_default()

title = "ARCADE VAULT"
bbox = draw.textbbox((0, 0), title, font=font)
tx = (w - (bbox[2] - bbox[0])) // 2
ty = int(horizon * 0.6)

# Glow effect
for dx, dy in [(-4, -4), (4, -4), (-4, 4), (4, 4), (-3, 0), (3, 0), (0, -3), (0, 3)]:
    draw.text((tx + dx, ty + dy), title, font=font, fill=(0xff, 0x00, 0x6e))
draw.text((tx, ty), title, font=font, fill=(0xff, 0xff, 0xff))

# Subtitle
subtitle = "PREMIUM GAMING STORE  •  NEON • PIXEL • VOID • LEGENDS • CYBER • RETRO"
sbbox = draw.textbbox((0, 0), subtitle, font=subfont)
stx = (w - (sbbox[2] - sbbox[0])) // 2
sty = ty + (bbox[3] - bbox[1]) + 30
for dx, dy in [(-2, -2), (2, -2), (-2, 2), (2, 2)]:
    draw.text((stx + dx, sty + dy), subtitle, font=subfont, fill=(0, 0, 0))
draw.text((stx, sty), subtitle, font=subfont, fill=(0x00, 0xd4, 0xff))

# Decorative neon lines
draw.line([(w // 4, sty + 40), (3 * w // 4, sty + 40)], fill=(0xff, 0x00, 0x6e), width=3)
draw.line([(w // 4, sty + 44), (3 * w // 4, sty + 44)], fill=(0x00, 0xd4, 0xff), width=1)

# Save
img.save(os.path.join(OUTPUT_DIR, "og-image.jpg"), "JPEG", quality=95)
print(f"Generated: {OUTPUT_DIR}/og-image.jpg")