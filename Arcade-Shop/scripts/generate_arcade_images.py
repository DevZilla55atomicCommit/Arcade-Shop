#!/usr/bin/env python3
"""
Generate arcade-themed placeholder images for gaming store.
Each image matches the game's theme with proper colors and visual elements.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

# Game configurations with theme-specific parameters
GAMES = {
    "neon-drifter": {
        "title": "NEON DRIFTER",
        "bg_colors": [(0x0a, 0x0a, 0x1a), (0x1a, 0x0a, 0x2a), (0x2a, 0x0a, 0x3a)],
        "accent_colors": [(0xff, 0x00, 0x6e), (0x00, 0xd4, 0xff), (0xff, 0xea, 0x00)],
        "theme": "synthwave_highway",
        "elements": ["grid_lines", "neon_strips", "city_silhouette", "speed_lines"]
    },
    "pixel-warrior": {
        "title": "PIXEL WARRIOR",
        "bg_colors": [(0x0a, 0x0a, 0x12), (0x12, 0x0a, 0x1a), (0x1a, 0x0a, 0x22)],
        "accent_colors": [(0x39, 0xff, 0x14), (0xff, 0xea, 0x00), (0xff, 0x00, 0x6e)],
        "theme": "pixel_platformer",
        "elements": ["pixel_grid", "character_sprite", "platform_blocks", "coin_sprites"]
    },
    "void-station": {
        "title": "VOID STATION",
        "bg_colors": [(0x05, 0x00, 0x0a), (0x0a, 0x00, 0x14), (0x14, 0x00, 0x1e)],
        "accent_colors": [(0xbc, 0x13, 0xfe), (0xff, 0x00, 0x33), (0x00, 0xd4, 0xff)],
        "theme": "cosmic_horror",
        "elements": ["starfield", "black_hole", "station_silhouette", "emergency_lights", "particle_debris"]
    },
    "arcade-legends": {
        "title": "ARCADE LEGENDS",
        "bg_colors": [(0x0a, 0x0a, 0x0f), (0x12, 0x12, 0x1a), (0x1a, 0x1a, 0x24)],
        "accent_colors": [(0xff, 0xea, 0x00), (0xff, 0x00, 0x6e), (0x00, 0xd4, 0xff)],
        "theme": "arcade_cabinets",
        "elements": ["cabinet_rows", "marquee_lights", "crt_curves", "coin_slots", "joystick_icons"]
    },
    "cyber-knight": {
        "title": "CYBER KNIGHT",
        "bg_colors": [(0x0a, 0x0a, 0x14), (0x14, 0x0a, 0x1e), (0x1e, 0x0a, 0x28)],
        "accent_colors": [(0x00, 0xd4, 0xff), (0xff, 0x00, 0x6e), (0x39, 0xff, 0x14)],
        "theme": "cyberpunk_knight",
        "elements": ["knight_silhouette", "neon_armor", "hud_elements", "circuit_patterns", "upgrade_modules"]
    },
    "retro-racer-64": {
        "title": "RETRO RACER 64",
        "bg_colors": [(0x0a, 0x0a, 0x14), (0x14, 0x14, 0x1e), (0x1e, 0x1e, 0x28)],
        "accent_colors": [(0xff, 0x6b, 0x00), (0xff, 0xea, 0x00), (0x00, 0xd4, 0xff)],
        "theme": "lowpoly_racer",
        "elements": ["lowpoly_car", "polygon_track", "chunky_mountains", "checkered_flags", "split_screen_lines"]
    }
}

OUTPUT_DIR = "/Volumes/LEDFLSHDRV/gaming-store/public/images/games"
SIZES = {
    "hero": (800, 450),
    "thumb": (400, 225),
    "screenshot": (800, 450)
}

def create_gradient_bg(width, height, colors, direction="vertical"):
    """Create a multi-color gradient background."""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    if direction == "vertical":
        for y in range(height):
            ratio = y / height
            if ratio < 0.33:
                r = int(colors[0][0] + (colors[1][0] - colors[0][0]) * (ratio * 3))
                g = int(colors[0][1] + (colors[1][1] - colors[0][1]) * (ratio * 3))
                b = int(colors[0][2] + (colors[1][2] - colors[0][2]) * (ratio * 3))
            elif ratio < 0.66:
                r = int(colors[1][0] + (colors[2][0] - colors[1][0]) * ((ratio - 0.33) * 3))
                g = int(colors[1][1] + (colors[2][1] - colors[1][1]) * ((ratio - 0.33) * 3))
                b = int(colors[1][2] + (colors[2][2] - colors[1][2]) * ((ratio - 0.33) * 3))
            else:
                r = colors[2][0]
                g = colors[2][1]
                b = colors[2][2]
            draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def draw_synthwave_highway(draw, width, height, colors):
    """Draw synthwave highway with perspective grid."""
    # Horizon line
    horizon = height * 0.4
    # Perspective grid lines
    for i in range(10):
        y_start = int(horizon + (height - horizon) * (i / 10) ** 1.5)
        y_end = int(horizon + (height - horizon) * ((i + 1) / 10) ** 1.5)
        alpha = int(255 * (1 - i / 10) * 0.3)
        color = (*colors[0], alpha) if alpha > 0 else colors[0]
        draw.line([(0, y_start), (width, y_start)], fill=colors[0], width=1)
    
    # Vertical perspective lines
    for i in range(-5, 6):
        x_center = width // 2 + i * (width // 20)
        draw.line([(x_center, horizon), (width // 2 + i * (width // 5), height)], fill=colors[1], width=1)
    
    # Neon strips on road sides
    draw.rectangle([0, horizon, width // 8, height], fill=colors[0])
    draw.rectangle([7 * width // 8, horizon, width, height], fill=colors[2])
    # City silhouette
    for i in range(8):
        x = i * width // 8
        h = int(horizon * (0.3 + (i % 3) * 0.2))
        draw.rectangle([x, horizon - h, x + width // 8, horizon], fill=(0, 0, 0, 200))

def draw_pixel_platformer(draw, width, height, colors):
    """Draw pixel art platformer scene with detailed sprites."""
    block_size = 16
    # Parallax background layers
    # Layer 1: Far mountains
    for x in range(0, width, block_size * 4):
        h = block_size * 6 + (x // (block_size * 4) % 3) * block_size * 2
        draw.rectangle([x, height - h, x + block_size * 4, height - block_size * 2], fill=(15, 15, 25))
    # Layer 2: Mid buildings
    for x in range(0, width, block_size * 3):
        h = block_size * 8 + (x // (block_size * 3) % 2) * block_size * 3
        draw.rectangle([x, height - h, x + block_size * 3, height - block_size * 2], fill=(20, 20, 30))
        # Windows
        for wx in range(x + 4, x + block_size * 3 - 4, 12):
            for wy in range(height - h + 4, height - block_size * 2 - 4, 12):
                draw.rectangle([wx, wy, wx + 6, wy + 6], fill=(80, 255, 100))
    
    # Ground with pattern
    for x in range(0, width, block_size):
        pattern_color = colors[0] if (x // block_size) % 2 == 0 else (min(255, colors[0][0] + 20), min(255, colors[0][1] + 20), min(255, colors[0][2] + 20))
        draw.rectangle([x, height - block_size * 2, x + block_size, height], fill=pattern_color)
    
    # Platforms with edges
    platforms = [
        (width // 6, height // 2, 6, 1),
        (width // 2 - 48, height // 3, 5, 1),
        (2 * width // 3, height // 2.5, 7, 1),
        (width // 4, height // 4, 4, 1),
    ]
    for px, py, w_blocks, h_blocks in platforms:
        # Platform top
        draw.rectangle([px, py, px + w_blocks * block_size, py + h_blocks * block_size], fill=colors[1])
        # Platform edges (darker)
        draw.rectangle([px, py, px + w_blocks * block_size, py + 2], fill=(0, 200, 0))
        draw.rectangle([px, py + h_blocks * block_size - 2, px + w_blocks * block_size, py + h_blocks * block_size], fill=(0, 100, 0))
    
    # Main character sprite (detailed 16-bit style)
    char_x, char_y = width // 6 + block_size, height // 2 - block_size * 5
    # Body
    draw.rectangle([char_x + 4, char_y + 16, char_x + 12, char_y + 32], fill=colors[2])  # torso
    draw.rectangle([char_x + 6, char_y, char_x + 10, char_y + 16], fill=colors[2])  # head
    # Arms
    draw.rectangle([char_x, char_y + 16, char_x + 4, char_y + 28], fill=colors[2])
    draw.rectangle([char_x + 12, char_y + 16, char_x + 16, char_y + 28], fill=colors[2])
    # Legs
    draw.rectangle([char_x + 4, char_y + 32, char_x + 8, char_y + 48], fill=colors[2])
    draw.rectangle([char_x + 8, char_y + 32, char_x + 12, char_y + 48], fill=colors[2])
    # Sword
    draw.rectangle([char_x + 16, char_y + 8, char_x + 18, char_y + 40], fill=colors[1])
    draw.rectangle([char_x + 14, char_y + 8, char_x + 20, char_y + 10], fill=colors[1])
    
    # Enemy sprites
    for i in range(3):
        ex = width // 2 + i * 60
        ey = height // 3 - 32
        draw.rectangle([ex, ey, ex + 16, ey + 16], fill=(200, 0, 100))
        draw.rectangle([ex + 4, ey + 16, ex + 12, ey + 32], fill=(200, 0, 100))
    
    # Coins with sparkle
    for i in range(8):
        cx = width // 3 + i * 40
        cy = height // 3 - 40 + (i % 2) * 20
        draw.ellipse([cx, cy, cx + 12, cy + 12], fill=colors[1])
        draw.ellipse([cx + 3, cy + 3, cx + 9, cy + 9], fill=(255, 255, 200))
    
    # HUD elements
    draw.rectangle([10, 10, 150, 40], fill=(0, 0, 0, 180))
    draw.text((15, 15), "SCORE 000000", font=ImageFont.load_default(), fill=colors[2])
    draw.rectangle([width - 120, 10, width - 10, 40], fill=(0, 0, 0, 180))
    draw.text((width - 115, 15), "LIVES x3", font=ImageFont.load_default(), fill=colors[2])
    
    # CRT scanlines overlay
    for y in range(0, height, 4):
        draw.line([(0, y), (width, y)], fill=(0, 0, 0, 30), width=1)

def draw_cosmic_horror(draw, width, height, colors):
    """Draw cosmic horror space station scene."""
    # Starfield
    import random
    random.seed(42)
    for _ in range(200):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        brightness = random.randint(100, 255)
        draw.ellipse([x, y, x + size, y + size], fill=(brightness, brightness, brightness))
    
    # Black hole (center)
    cx, cy = width // 2, height // 3
    for r in range(min(width, height) // 3, 0, -1):
        alpha = int(255 * (1 - r / (min(width, height) // 3)) * 0.8)
        color = (int(colors[1][0] * alpha / 255), int(colors[1][1] * alpha / 255), int(colors[1][2] * alpha / 255))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    
    # Station silhouette
    station_w = width // 3
    station_h = height // 4
    sx = width // 2 - station_w // 2
    sy = cy + min(width, height) // 4
    draw.rectangle([sx, sy, sx + station_w, sy + station_h], fill=(10, 10, 20))
    # Solar panels
    draw.rectangle([sx - 50, sy + 20, sx, sy + station_h - 20], fill=(20, 20, 30))
    draw.rectangle([sx + station_w, sy + 20, sx + station_w + 50, sy + station_h - 20], fill=(20, 20, 30))
    
    # Emergency lights
    for i in range(5):
        ly = sy + i * (station_h // 5)
        draw.ellipse([sx + 10, ly, sx + 20, ly + 10], fill=colors[1])
        draw.ellipse([sx + station_w - 20, ly, sx + station_w - 10, ly + 10], fill=colors[2])

def draw_arcade_cabinets(draw, width, height, colors):
    """Draw 3D modern arcade cabinets with depth, lighting, and reflections."""
    cabinet_w = 80
    cabinet_h = 220
    cabinet_d = 60  # depth for 3D effect
    start_x = (width - 5 * cabinet_w - 4 * 25) // 2
    start_y = height - cabinet_h - 60
    
    cabinet_colors = [
        (0xff, 0x00, 0x6e), (0x00, 0xd4, 0xff), (0xff, 0xea, 0x00),
        (0xbc, 0x13, 0xfe), (0x39, 0xff, 0x14)
    ]
    
    # Floor reflection plane
    floor_y = height - 40
    for y in range(floor_y, height):
        alpha = int(80 * (1 - (y - floor_y) / 40))
        draw.line([(0, y), (width, y)], fill=(*colors[0][:3], alpha))
    
    for i in range(5):
        x = start_x + i * (cabinet_w + 25)
        y = start_y
        cab_color = cabinet_colors[i]
        
        # 3D Cabinet - Side face (depth)
        side_points = [
            (x + cabinet_w, y),
            (x + cabinet_w + cabinet_d, y - cabinet_d // 2),
            (x + cabinet_w + cabinet_d, y + cabinet_h - cabinet_d // 2),
            (x + cabinet_w, y + cabinet_h),
        ]
        side_color = tuple(min(255, c + 30) for c in cab_color)
        draw.polygon(side_points, fill=side_color)
        
        # 3D Cabinet - Top face
        top_points = [
            (x, y),
            (x + cabinet_d, y - cabinet_d // 2),
            (x + cabinet_w + cabinet_d, y - cabinet_d // 2),
            (x + cabinet_w, y),
        ]
        top_color = tuple(min(255, c + 50) for c in cab_color)
        draw.polygon(top_points, fill=top_color)
        
        # 3D Cabinet - Front face
        draw.rectangle([x, y, x + cabinet_w, y + cabinet_h], fill=cab_color)
        
        # Marquee (top)
        marquee_h = 40
        draw.rectangle([x, y - marquee_h, x + cabinet_w, y], fill=(10, 10, 20))
        # Marquee side
        marquee_side = [
            (x + cabinet_w, y - marquee_h),
            (x + cabinet_w + cabinet_d, y - marquee_h - cabinet_d // 2),
            (x + cabinet_w + cabinet_d, y - cabinet_d // 2),
            (x + cabinet_w, y),
        ]
        draw.polygon(marquee_side, fill=(15, 15, 30))
        marquee_top = [
            (x, y - marquee_h),
            (x + cabinet_d, y - marquee_h - cabinet_d // 2),
            (x + cabinet_w + cabinet_d, y - marquee_h - cabinet_d // 2),
            (x + cabinet_w, y - marquee_h),
        ]
        draw.polygon(marquee_top, fill=(20, 20, 40))
        # Marquee art
        draw.rectangle([x + 5, y - marquee_h + 5, x + cabinet_w - 5, y - 5], fill=cab_color)
        # Game title on marquee
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 11)
        except:
            font = ImageFont.load_default()
        draw.text((x + 8, y - marquee_h + 12), f"GAME {i+1}", font=font, fill=(255, 255, 255))
        
        # Screen with 3D bezel
        screen_x, screen_y = x + 10, y + 20
        screen_w, screen_h = cabinet_w - 20, 130
        # Screen glow
        draw.rectangle([screen_x - 3, screen_y - 3, screen_x + screen_w + 3, screen_y + screen_h + 3], fill=cab_color)
        # Screen face
        draw.rectangle([screen_x, screen_y, screen_x + screen_w, screen_y + screen_h], fill=(5, 5, 15))
        # Screen content - game scene
        if i == 0:  # Pac-Man style
            draw.ellipse([screen_x + 30, screen_y + 40, screen_x + 60, screen_y + 70], fill=(255, 255, 0))
            draw.polygon([(screen_x + 45, screen_y + 55), (screen_x + 30, screen_y + 40), (screen_x + 30, screen_y + 70)], fill=(5, 5, 15))
        elif i == 1:  # Donkey Kong style
            draw.rectangle([screen_x + 20, screen_y + 80, screen_x + 30, screen_y + 120], fill=(139, 69, 19))
            draw.ellipse([screen_x + 50, screen_y + 50, screen_x + 70, screen_y + 70], fill=(255, 0, 0))
        elif i == 2:  # Galaga style
            draw.polygon([(screen_x + 40, screen_y + 100), (screen_x + 30, screen_y + 120), (screen_x + 50, screen_y + 120)], fill=(0, 255, 255))
            for ex in range(3):
                draw.ellipse([screen_x + 20 + ex * 20, screen_y + 30, screen_x + 30 + ex * 20, screen_y + 40], fill=(255, 100, 100))
        elif i == 3:  # Street Fighter style
            draw.rectangle([screen_x + 15, screen_y + 70, screen_x + 30, screen_y + 110], fill=(255, 100, 100))
            draw.rectangle([screen_x + 55, screen_y + 70, screen_x + 70, screen_y + 110], fill=(100, 100, 255))
        else:  # Generic
            draw.rectangle([screen_x + 15, screen_y + 40, screen_x + screen_w - 15, screen_y + 100], fill=(20, 20, 40))
            draw.text((screen_x + 20, screen_y + 65), "INSERT COIN", font=font, fill=(255, 255, 0))
        
        # Screen reflection
        draw.rectangle([screen_x, screen_y + screen_h // 2, screen_x + screen_w, screen_y + screen_h], fill=(0, 0, 0, 100))
        
        # Control panel (3D)
        panel_y = y + 160
        panel_h = cabinet_h - 160 - 10
        # Panel top face
        panel_top = [
            (x + 5, panel_y),
            (x + 5 + cabinet_d, panel_y - cabinet_d // 2),
            (x + cabinet_w - 5 + cabinet_d, panel_y - cabinet_d // 2),
            (x + cabinet_w - 5, panel_y),
        ]
        draw.polygon(panel_top, fill=(40, 40, 50))
        # Panel front
        draw.rectangle([x + 5, panel_y, x + cabinet_w - 5, panel_y + panel_h], fill=(30, 30, 40))
        # Panel side
        panel_side = [
            (x + cabinet_w - 5, panel_y),
            (x + cabinet_w - 5 + cabinet_d, panel_y - cabinet_d // 2),
            (x + cabinet_w - 5 + cabinet_d, panel_y + panel_h - cabinet_d // 2),
            (x + cabinet_w - 5, panel_y + panel_h),
        ]
        draw.polygon(panel_side, fill=(25, 25, 35))
        
        # Joystick (3D)
        joy_x = x + cabinet_w // 2 - 40
        joy_y = panel_y + panel_h // 2
        # Base
        draw.ellipse([joy_x - 15, joy_y + 15, joy_x + 15, joy_y + 45], fill=(20, 20, 30))
        # Stick
        draw.ellipse([joy_x - 10, joy_y - 10, joy_x + 10, joy_y + 20], fill=(50, 50, 60))
        draw.ellipse([joy_x - 6, joy_y - 6, joy_x + 6, joy_y + 6], fill=(200, 200, 200))
        # Ball top
        draw.ellipse([joy_x - 12, joy_y - 22, joy_x + 12, joy_y + 2], fill=(220, 0, 50))
        draw.ellipse([joy_x - 8, joy_y - 18, joy_x + 8, joy_y - 2], fill=(255, 100, 120))
        
        # Buttons (3D)
        for j in range(6):
            bx = x + cabinet_w - 45 + (j % 3) * 20
            by = panel_y + panel_h // 2 - 10 + (j // 3) * 25
            # Button base
            draw.ellipse([bx - 12, by + 3, bx + 12, by + 27], fill=(20, 20, 30))
            # Button top
            btn_color = cabinet_colors[(i + j) % 5]
            draw.ellipse([bx - 10, by, bx + 10, by + 20], fill=btn_color)
            draw.ellipse([bx - 6, by + 2, bx + 6, by + 16], fill=tuple(min(255, c + 50) for c in btn_color))
        
        # Cabinet reflection on floor
        ref_y_start = floor_y
        ref_h = 60
        for ry in range(ref_h):
            alpha = int(60 * (1 - ry / ref_h))
            draw.line([(x, ref_y_start + ry), (x + cabinet_w, ref_y_start + ry)], fill=(*cab_color[:3], alpha))
            draw.line([(x + cabinet_w, ref_y_start + ry), (x + cabinet_w + cabinet_d, ref_y_start + ry)], fill=(*tuple(min(255, c + 30) for c in cab_color)[:3], alpha))

    # Neon accent strips on floor
    for i in range(3):
        strip_y = floor_y + 10 + i * 10
        draw.line([(0, strip_y), (width, strip_y)], fill=(*colors[i % 3], 100), width=2)

def draw_cosmic_horror(draw, width, height, colors):
    """Draw 3D cosmic horror space station with volumetric lighting."""
    import random
    random.seed(42)
    
    # Deep starfield with parallax layers
    for layer in range(4):
        star_count = 100 - layer * 20
        star_size = 1 + layer
        star_brightness = 80 + layer * 40
        for _ in range(star_count):
            x = random.randint(0, width)
            y = random.randint(0, height)
            draw.ellipse([x, y, x + star_size, y + star_size], 
                        fill=(star_brightness, star_brightness, star_brightness))
    
    # Nebula clouds
    for _ in range(5):
        cx = random.randint(0, width)
        cy = random.randint(0, height)
        r = random.randint(100, 300)
        nebula_color = colors[random.randint(0, 2)]
        for radius in range(r, 0, -5):
            alpha = int(30 * (radius / r))
            draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], 
                        fill=(*nebula_color[:3], alpha))
    
    # Black hole with accretion disk (3D)
    cx, cy = width // 2, height // 3
    # Accretion disk (elliptical, perspective)
    for ring in range(5):
        ring_r = 180 - ring * 30
        ring_color = colors[ring % 3]
        # Draw as ellipse for perspective
        draw.ellipse([cx - ring_r, cy - ring_r // 2, cx + ring_r, cy + ring_r // 2], 
                    outline=ring_color, width=3)
        # Inner glow
        draw.ellipse([cx - ring_r + 5, cy - ring_r // 2 + 2, cx + ring_r - 5, cy + ring_r // 2 - 2], 
                    outline=tuple(min(255, c + 50) for c in ring_color), width=1)
    
    # Event horizon (black sphere with gravitational lensing)
    horizon_r = 60
    for r in range(horizon_r, 0, -1):
        alpha = int(255 * (1 - r / horizon_r))
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(0, 0, 0, alpha))
    # Photon ring
    draw.ellipse([cx - horizon_r - 5, cy - horizon_r - 5, cx + horizon_r + 5, cy + horizon_r + 5], 
                outline=colors[2], width=2)
    
    # Space station (3D modular)
    station_cx = width // 2
    station_cy = cy + 120
    module_w = 120
    module_h = 80
    module_d = 40
    
    # Central hub (cylindrical)
    hub_r = 50
    hub_h = 100
    # Hub side
    draw.ellipse([station_cx - hub_r, station_cy - hub_h // 2, station_cx + hub_r, station_cy + hub_h // 2], 
                fill=(30, 30, 40))
    # Hub top
    draw.ellipse([station_cx - hub_r, station_cy - hub_h // 2 - 10, station_cx + hub_r, station_cy - hub_h // 2 + 10], 
                fill=(40, 40, 50))
    # Hub windows
    for wy in range(station_cy - hub_h // 2 + 10, station_cy + hub_h // 2 - 10, 20):
        draw.ellipse([station_cx - hub_r + 2, wy, station_cx + hub_r - 2, wy + 10], 
                    fill=(0, 200, 255, 180))
    
    # Solar arrays (4 wings)
    wing_length = 180
    wing_w = 30
    for wing_idx in range(4):
        angle = wing_idx * math.pi / 2
        wx1 = station_cx + int(hub_r * math.cos(angle))
        wy1 = station_cy - hub_h // 2 + int(hub_r * math.sin(angle) * 0.5)
        wx2 = station_cx + int((hub_r + wing_length) * math.cos(angle))
        wy2 = station_cy - hub_h // 2 + int((hub_r + wing_length) * math.sin(angle) * 0.5)
        # Wing as polygon
        perp_angle = angle + math.pi / 2
        px1 = int(wing_w * math.cos(perp_angle))
        py1 = int(wing_w * math.sin(perp_angle) * 0.5)
        px2 = int(wing_w * math.cos(perp_angle + math.pi))
        py2 = int(wing_w * math.sin(perp_angle + math.pi) * 0.5)
        wing_points = [
            (wx1 + px1, wy1 + py1),
            (wx1 + px2, wy1 + py2),
            (wx2 + px2, wy2 + py2),
            (wx2 + px1, wy2 + py1),
        ]
        draw.polygon(wing_points, fill=(60, 60, 80))
        # Solar cells
        for s in range(0, wing_length, 20):
            sx = station_cx + int((hub_r + s) * math.cos(angle))
            sy = station_cy - hub_h // 2 + int((hub_r + s) * math.sin(angle) * 0.5)
            draw.rectangle([sx - 8, sy - 8, sx + 8, sy + 8], fill=(0, 100, 200))
    
    # Docked ships
    for i in range(2):
        sx = station_cx + (i - 0.5) * 140
        sy = station_cy - hub_h // 2 - 30
        draw.polygon([(sx, sy), (sx - 15, sy + 30), (sx + 15, sy + 30)], fill=(80, 80, 90))
        draw.ellipse([sx - 8, sy + 10, sx + 8, sy + 26], fill=(0, 150, 255))
    
    # Emergency lights pulsing
    for i in range(8):
        ly = station_cy - hub_h // 2 + i * (hub_h // 8)
        lx = station_cx + hub_r + 5
        pulse = (math.sin(i) + 1) * 0.5
        light_color = colors[1] if i % 2 == 0 else colors[2]
        r = int(8 + pulse * 4)
        draw.ellipse([lx - r, ly - r, lx + r, ly + r], fill=light_color)
        draw.ellipse([lx - r * 2, ly - r * 2, lx + r * 2, ly + r * 2], fill=(*light_color[:3], 50))
    
    # Particle debris near black hole
    for _ in range(50):
        angle = random.random() * 2 * math.pi
        dist = random.randint(horizon_r + 10, 200)
        px = cx + int(dist * math.cos(angle))
        py = cy + int(dist * math.sin(angle) * 0.5)
        size = random.randint(1, 4)
        draw.ellipse([px, py, px + size, py + size], fill=(200, 200, 255, 150))
    
    # Volumetric light shafts from station
    for i in range(3):
        angle = -math.pi / 2 + i * 0.3
        length = 200
        lx1 = station_cx
        ly1 = station_cy
        lx2 = station_cx + int(length * math.cos(angle))
        ly2 = station_cy + int(length * math.sin(angle))
        for w in range(20, 0, -2):
            alpha = int(20 * w / 20)
            draw.line([(lx1, ly1), (lx2, ly2)], fill=(*colors[0][:3], alpha), width=w)

def draw_cyberpunk_knight(draw, width, height, colors):
    """Draw 3D cyberpunk knight with volumetric neon lighting and HUD."""
    cx, cy = width // 2, height // 2
    
    # Circuit board floor (3D grid perspective)
    grid_y = cy + 100
    for i in range(20):
        y = grid_y + i * 15
        alpha = int(60 * (1 - i / 20))
        draw.line([(0, y), (width, y)], fill=(*colors[0][:3], alpha), width=1)
    for i in range(-10, 11):
        x = cx + i * 40
        alpha = 40
        draw.line([(x, grid_y), (cx + i * 60, height)], fill=(*colors[0][:3], alpha), width=1)
    
    # Neon grid glow
    for y in range(grid_y, height, 30):
        draw.line([(0, y), (width, y)], fill=(*colors[1][:3], 20), width=2)
    
    # Knight - 3D construction with depth
    knight_w = 140
    knight_h = 300
    kx = cx - knight_w // 2
    ky = cy - knight_h // 2
    depth = 30
    
    # Helmet (3D)
    helmet_w = 80
    helmet_h = 90
    hx = cx - helmet_w // 2
    hy = ky
    
    # Helmet back (depth)
    draw.ellipse([hx + depth, hy + depth, hx + helmet_w + depth, hy + helmet_h + depth], fill=(15, 15, 25))
    # Helmet main
    draw.ellipse([hx, hy, hx + helmet_w, hy + helmet_h], fill=(25, 25, 35))
    # Helmet top highlight
    draw.ellipse([hx + 10, hy + 5, hx + helmet_w - 10, hy + 25], fill=(40, 40, 50))
    
    # Visor (3D curved)
    visor_points = [
        (hx + 15, hy + 20),
        (hx + helmet_w - 15, hy + 20),
        (hx + helmet_w - 10, hy + 60),
        (hx + 10, hy + 60),
    ]
    draw.polygon(visor_points, fill=(0, 20, 40))
    # Visor glow
    draw.polygon([
        (hx + 18, hy + 23),
        (hx + helmet_w - 18, hy + 23),
        (hx + helmet_w - 13, hy + 57),
        (hx + 13, hy + 57),
    ], fill=(*colors[1][:3], 100))
    # Visor reflection
    draw.ellipse([hx + 25, hy + 25, hx + 55, hy + 45], fill=(255, 255, 255, 30))
    
    # Neon trim on helmet
    draw.arc([hx, hy, hx + helmet_w, hy + helmet_h], 0, 360, fill=colors[1], width=3)
    draw.arc([hx + 5, hy + 5, hx + helmet_w - 5, hy + helmet_h - 5], 0, 360, fill=colors[2], width=1)
    
    # Torso armor (3D layered)
    torso_w = 100
    torso_h = 130
    tx = cx - torso_w // 2
    ty = ky + helmet_h - 10
    
    # Back plates (depth)
    for layer in range(3):
        d = depth - layer * 8
        plate_color = tuple(max(10, c - layer * 10) for c in (35, 35, 45))
        draw.rectangle([tx + d, ty + layer * 5, tx + torso_w + d, ty + torso_h - layer * 5], fill=plate_color)
    
    # Main torso
    draw.rectangle([tx, ty, tx + torso_w, ty + torso_h], fill=(30, 30, 40))
    # Torso top bevel
    draw.rectangle([tx + 5, ty, tx + torso_w - 5, ty + 5], fill=(50, 50, 60))
    
    # Neon armor lines (glowing)
    for i in range(5):
        ly = ty + 15 + i * 25
        draw.line([tx + 10, ly, tx + torso_w - 10, ly], fill=colors[i % 3], width=4)
        draw.line([tx + 12, ly, tx + torso_w - 12, ly], fill=tuple(min(255, c + 80) for c in colors[i % 3]), width=1)
        # Glow bloom
        draw.line([tx + 10, ly - 1, tx + torso_w - 10, ly - 1], fill=(*colors[i % 3][:3], 60), width=8)
        draw.line([tx + 10, ly + 1, tx + torso_w - 10, ly + 1], fill=(*colors[i % 3][:3], 60), width=8)
    
    # Core reactor (chest)
    core_x, core_y = cx, ty + torso_h // 2
    for r in range(30, 0, -2):
        alpha = int(200 * (1 - r / 30))
        pulse = (math.sin(core_y * 0.01) + 1) * 0.5
        core_color = colors[1] if pulse > 0.5 else colors[2]
        draw.ellipse([core_x - r, core_y - r, core_x + r, core_y + r], fill=(*core_color[:3], alpha))
    draw.ellipse([core_x - 8, core_y - 8, core_x + 8, core_y + 8], fill=(255, 255, 255))
    
    # Shoulder pauldrons (3D)
    for side in [-1, 1]:
        spx = cx + side * (torso_w // 2 + 20)
        spy = ty + 20
        # Pauldron back
        draw.ellipse([spx - 30 + side * depth, spy + depth, spx + 30 + side * depth, spy + 70 + depth], fill=(20, 20, 30))
        # Pauldron main
        draw.ellipse([spx - 30, spy, spx + 30, spy + 70], fill=(35, 35, 45))
        # Neon rim
        draw.arc([spx - 30, spy, spx + 30, spy + 70], -90 if side == -1 else 90, 90 if side == -1 else 270, fill=colors[0], width=4)
        # Thruster vents
        for v in range(3):
            vx = spx + side * (-10, 0, 10)[v + 1]
            vy = spy + 20 + v * 15
            draw.ellipse([vx - 5, vy, vx + 5, vy + 10], fill=colors[2])
            draw.ellipse([vx - 3, vy + 2, vx + 3, vy + 8], fill=(255, 200, 200))
    
    # Arms (3D segmented)
    for side in [-1, 1]:
        ax = cx + side * (torso_w // 2 + 10)
        ay = ty + 20
        # Upper arm
        draw.rectangle([ax - 15, ay, ax + 15, ay + 80], fill=(30, 30, 40))
        draw.ellipse([ax - 15, ay + 75, ax + 15, ay + 85], fill=(40, 40, 50))  # elbow
        # Forearm
        draw.rectangle([ax - 12, ay + 80, ax + 12, ay + 160], fill=(35, 35, 45))
        # Wrist
        draw.ellipse([ax - 15, ay + 155, ax + 15, ay + 165], fill=(45, 45, 55))
        # Hand (gauntlet)
        draw.rectangle([ax - 18, ay + 160, ax + 18, ay + 190], fill=(40, 40, 50))
        # Neon accent on forearm
        draw.line([ax, ay + 90, ax, ay + 150], fill=colors[1 if side == -1 else 2], width=3)
        # Energy blade on right hand
        if side == 1:
            draw.rectangle([ax + 18, ay + 100, ax + 18 + 80, ay + 106], fill=colors[2])
            draw.rectangle([ax + 18, ay + 100, ax + 18 + 80, ay + 106], fill=tuple(min(255, c + 100) for c in colors[2]))
            for g in range(5):
                draw.line([ax + 18 + g * 16, ay + 100, ax + 18 + g * 16, ay + 106], fill=(255, 255, 255, 100), width=1)
    
    # HUD Elements (floating 3D)
    hud_elements = [
        (cx - 180, cy - 150, 120, 60, "SHIELD\n████████░░ 80%", colors[1]),
        (cx + 60, cy - 150, 120, 60, "HEALTH\n█████████░ 90%", colors[2]),
        (cx - 180, cy + 100, 120, 40, "AMMO: ∞", colors[0]),
        (cx + 60, cy + 100, 120, 40, "SECTOR 07", colors[1]),
    ]
    
    for hx, hy, hw, hh, text, hcolor in hud_elements:
        # Panel back (depth)
        draw.rectangle([hx + 3, hy + 3, hx + hw + 3, hy + hh + 3], fill=(0, 0, 0, 100))
        # Panel front
        draw.rectangle([hx, hy, hx + hw, hy + hh], fill=(10, 10, 20))
        # Neon border
        draw.rectangle([hx, hy, hx + hw, hy + hh], outline=hcolor, width=2)
        # Corner brackets
        bracket_size = 8
        for bx, by in [(hx, hy), (hx + hw - bracket_size, hy), (hx, hy + hh - bracket_size), (hx + hw - bracket_size, hy + hh - bracket_size)]:
            draw.line([(bx, by), (bx + bracket_size, by)], fill=hcolor, width=3)
            draw.line([(bx, by), (bx, by + bracket_size)], fill=hcolor, width=3)
        # Text
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 11)
        except:
            font = ImageFont.load_default()
        for i, line in enumerate(text.split('\n')):
            draw.text((hx + 10, hy + 8 + i * 18), line, font=font, fill=hcolor)
    
    # Floating upgrade modules (orbiting)
    for i in range(6):
        angle = i * math.pi / 3 + (cy * 0.001)
        mx = cx + int(160 * math.cos(angle))
        my = cy + int(80 * math.sin(angle))
        # Module box (3D)
        draw.rectangle([mx - 20 + 5, my - 20 + 5, mx + 20 + 5, my + 20 + 5], fill=(0, 0, 0, 80))
        draw.rectangle([mx - 20, my - 20, mx + 20, my + 20], fill=(25, 25, 35))
        draw.rectangle([mx - 20, my - 20, mx + 20, my + 20], outline=colors[i % 3], width=2)
        # Module icon
        draw.text((mx - 10, my - 8), ["CPU", "GPU", "RAM", "SSD", "COOL", "NET"][i], font=ImageFont.load_default(), fill=colors[i % 3])
        # Orbit trail
        draw.ellipse([cx - 160, cy - 80, cx + 160, cy + 80], outline=(*colors[i % 3][:3], 30), width=1)
    
    # Particle effects
    for _ in range(30):
        px = random.randint(cx - 100, cx + 100)
        py = random.randint(cy - 150, cy + 150)
        size = random.randint(1, 3)
        pcolor = colors[random.randint(0, 2)]
        draw.ellipse([px, py, px + size, py + size], fill=(*pcolor[:3], 150))

def draw_lowpoly_racer(draw, width, height, colors):
    """Draw N64-era low-poly racer with 3D perspective and chunky polygons."""
    # Sky gradient
    for y in range(height // 2):
        ratio = y / (height // 2)
        r = int(0x87 + (0x00 - 0x87) * ratio)
        g = int(0xce + (0x33 - 0xce) * ratio)
        b = int(0xeb + (0x66 - 0xeb) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Sun
    draw.ellipse([width - 100, 50, width - 20, 130], fill=(0xff, 0xff, 0x00))
    draw.ellipse([width - 95, 55, width - 25, 125], fill=(0xff, 0xea, 0x00))
    
    # Distant mountains (low poly layers)
    mountain_layers = [
        (height * 0.55, 60, (0x4a, 0x4a, 0x6a)),
        (height * 0.60, 80, (0x3a, 0x3a, 0x5a)),
        (height * 0.65, 100, (0x2a, 0x2a, 0x4a)),
    ]
    
    for base_y, amplitude, mcolor in mountain_layers:
        points = [(0, height), (0, base_y)]
        for x in range(0, width + 40, 40):
            h = base_y + int(amplitude * math.sin(x * 0.015 + mountain_layers.index((base_y, amplitude, mcolor))) + 
                           amplitude * 0.5 * math.sin(x * 0.03))
            points.append((x, h))
        points.append((width, base_y))
        points.append((width, height))
        draw.polygon(points, fill=mcolor)
        # Snow caps
        for x in range(20, width, 80):
            peak_y = base_y + int(amplitude * math.sin(x * 0.015))
            draw.polygon([(x - 15, peak_y + 20), (x, peak_y), (x + 15, peak_y + 20)], fill=(200, 220, 255))
    
    # Ground plane with texture
    ground_y = int(height * 0.7)
    for y in range(ground_y, height):
        ratio = (y - ground_y) / (height - ground_y)
        g = int(0x1a + (0x0a - 0x1a) * ratio)
        draw.line([(0, y), (width, y)], fill=(g, g, g + 10))
    
    # Track (3D perspective)
    track_top_y = int(height * 0.5)
    track_bottom_y = height
    track_top_w = 180
    track_bottom_w = 600
    
    # Track surface
    track_points = [
        (width // 2 - track_top_w // 2, track_top_y),
        (width // 2 + track_top_w // 2, track_top_y),
        (width // 2 + track_bottom_w // 2, track_bottom_y),
        (width // 2 - track_bottom_w // 2, track_bottom_y),
    ]
    draw.polygon(track_points, fill=(0x1a, 0x1a, 0x2a))
    
    # Track edges with posts
    for i in range(15):
        t = i / 14
        edge_y = int(track_top_y + (track_bottom_y - track_top_y) * t ** 1.2)
        edge_w = int(track_top_w + (track_bottom_w - track_top_w) * t ** 1.2)
        left_x = width // 2 - edge_w // 2
        right_x = width // 2 + edge_w // 2
        # Edge lines
        draw.line([(left_x, edge_y), (left_x, edge_y + 20)], fill=colors[1], width=4)
        draw.line([(right_x, edge_y), (right_x, edge_y + 20)], fill=colors[1], width=4)
        # Posts
        if i % 3 == 0:
            post_h = int(30 + 60 * t)
            draw.rectangle([left_x - 8, edge_y - post_h, left_x + 8, edge_y], fill=(0xcc, 0x00, 0x00))
            draw.rectangle([right_x - 8, edge_y - post_h, right_x + 8, edge_y], fill=(0x00, 0xcc, 0xcc))
    
    # Low-poly cars (chunky, faceted)
    car_data = [
        {"x": width // 2, "y": track_top_y + 60, "color": colors[0], "player": True},
        {"x": width // 2 - 100, "y": track_top_y + 130, "color": colors[1], "player": False},
        {"x": width // 2 + 100, "y": track_top_y + 130, "color": colors[2], "player": False},
    ]
    
    for car in car_data:
        cx, cy = car["x"], car["y"]
        ccolor = car["color"]
        scale = 1.0 if car["player"] else 0.8
        
        # Car body (faceted low-poly)
        body_points = [
            (cx - int(30 * scale), cy + int(15 * scale)),
            (cx + int(30 * scale), cy + int(15 * scale)),
            (cx + int(40 * scale), cy - int(10 * scale)),
            (cx + int(20 * scale), cy - int(30 * scale)),
            (cx - int(20 * scale), cy - int(30 * scale)),
            (cx - int(40 * scale), cy - int(10 * scale)),
        ]
        draw.polygon(body_points, fill=ccolor)
        # Body highlight (top face)
        top_points = [
            (cx - int(20 * scale), cy - int(30 * scale)),
            (cx + int(20 * scale), cy - int(30 * scale)),
            (cx + int(30 * scale), cy - int(10 * scale)),
            (cx - int(30 * scale), cy - int(10 * scale)),
        ]
        draw.polygon(top_points, fill=tuple(min(255, c + 40) for c in ccolor))
        # Body side (depth)
        side_points = [
            (cx + int(30 * scale), cy + int(15 * scale)),
            (cx + int(40 * scale), cy - int(10 * scale)),
            (cx + int(40 * scale) + 5, cy - int(10 * scale) + 5),
            (cx + int(30 * scale) + 5, cy + int(15 * scale) + 5),
        ]
        draw.polygon(side_points, fill=tuple(max(0, c - 30) for c in ccolor))
        
        # Cockpit
        cockpit_points = [
            (cx - int(10 * scale), cy - int(10 * scale)),
            (cx + int(10 * scale), cy - int(10 * scale)),
            (cx + int(15 * scale), cy - int(25 * scale)),
            (cx - int(15 * scale), cy - int(25 * scale)),
        ]
        draw.polygon(cockpit_points, fill=(0x0a, 0x0a, 0x1a))
        draw.polygon(cockpit_points, outline=colors[2], width=1)
        
        # Spoiler (low poly wing)
        spoiler_points = [
            (cx - int(25 * scale), cy - int(30 * scale)),
            (cx + int(25 * scale), cy - int(30 * scale)),
            (cx + int(30 * scale), cy - int(40 * scale)),
            (cx - int(30 * scale), cy - int(40 * scale)),
        ]
        draw.polygon(spoiler_points, fill=colors[2])
        
        # Wheels (low poly - octagons)
        wheel_y = cy + int(18 * scale)
        for wx in [cx - int(35 * scale), cx + int(35 * scale)]:
            # Wheel as octagon
            wheel_pts = []
            for w in range(8):
                a = w * math.pi / 4
                wheel_pts.append((wx + int(12 * scale * math.cos(a)), wheel_y + int(12 * scale * math.sin(a))))
            draw.polygon(wheel_pts, fill=(0x0a, 0x0a, 0x0a))
            # Rim
            rim_pts = []
            for w in range(8):
                a = w * math.pi / 4
                rim_pts.append((wx + int(8 * scale * math.cos(a)), wheel_y + int(8 * scale * math.sin(a))))
            draw.polygon(rim_pts, fill=(0x44, 0x44, 0x44))
        
        # Player indicator
        if car["player"]:
            draw.text((cx - 25, cy - 50), "P1", font=ImageFont.load_default(), fill=(0xff, 0xea, 0x00))
    
    # Checkered start/finish line
    flag_y = track_bottom_y - 20
    for i in range(16):
        fx = width // 2 - track_bottom_w // 2 + i * (track_bottom_w // 16)
        draw.rectangle([fx, flag_y - 30, fx + track_bottom_w // 16, flag_y], 
                      fill=(255, 255, 255) if i % 2 == 0 else (0, 0, 0))
    
    # Split screen divider (for 2-player)
    draw.line([(width // 2, track_top_y), (width // 2, height)], fill=(255, 255, 255, 100), width=2, joint="curve")
    draw.line([(width // 2 - 1, track_top_y), (width // 2 - 1, height)], fill=(0, 0, 0, 100), width=1)
    draw.line([(width // 2 + 1, track_top_y), (width // 2 + 1, height)], fill=(0, 0, 0, 100), width=1)
    
    # HUD - Speedometer
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
    except:
        font = ImageFont.load_default()
    draw.rectangle([20, height - 80, 120, height - 20], fill=(0, 0, 0, 180))
    draw.text((30, height - 75), "SPEED", font=font, fill=colors[1])
    draw.text((30, height - 55), "248 km/h", font=font, fill=(0xff, 0xea, 0x00))
    draw.rectangle([25, height - 40, 115, height - 30], fill=(0x33, 0x33, 0x33))
    draw.rectangle([25, height - 40, 25 + 90 * 0.8, height - 30], fill=colors[0])
    
    # Lap counter
    draw.rectangle([width - 120, height - 80, width - 20, height - 20], fill=(0, 0, 0, 180))
    draw.text((width - 110, height - 75), "LAP 2/3", font=font, fill=colors[1])
    draw.text((width - 110, height - 55), "01:23.456", font=font, fill=(0xff, 0xea, 0x00))
    
    # Position
    draw.rectangle([width // 2 - 50, 20, width // 2 + 50, 60], fill=(0, 0, 0, 180))
    draw.text((width // 2 - 20, 30), "1st / 8", font=font, fill=(0xff, 0xea, 0x00))

def draw_cyberpunk_knight(draw, width, height, colors):
    """Draw cyberpunk knight character."""
    cx, cy = width // 2, height // 2
    
    # Circuit background pattern
    for x in range(0, width, 40):
        draw.line([(x, 0), (x, height)], fill=(int(colors[0][0]*0.1), int(colors[0][1]*0.1), int(colors[0][2]*0.1)), width=1)
    for y in range(0, height, 40):
        draw.line([(0, y), (width, y)], fill=(int(colors[0][0]*0.1), int(colors[0][1]*0.1), int(colors[0][2]*0.1)), width=1)
    
    # Knight silhouette
    knight_w = 120
    knight_h = 280
    kx = cx - knight_w // 2
    ky = cy - knight_h // 2
    
    # Helmet
    draw.ellipse([cx - 40, ky, cx + 40, ky + 80], fill=(20, 20, 30))
    draw.ellipse([cx - 30, ky + 10, cx + 30, ky + 50], fill=colors[1])
    # Visor
    draw.rectangle([cx - 25, ky + 20, cx + 25, ky + 40], fill=colors[1])
    
    # Armor torso
    draw.rectangle([cx - 50, ky + 80, cx + 50, ky + 180], fill=(25, 25, 35))
    # Neon armor lines
    for i in range(3):
        y_line = ky + 90 + i * 30
        draw.line([cx - 40, y_line, cx + 40, y_line], fill=colors[i % 3], width=3)
    
    # Arms
    draw.rectangle([cx - 70, ky + 80, cx - 50, ky + 200], fill=(25, 25, 35))
    draw.rectangle([cx + 50, ky + 80, cx + 70, ky + 200], fill=(25, 25, 35))
    # Neon arm accents
    draw.line([cx - 60, ky + 100, cx - 60, ky + 180], fill=colors[1], width=2)
    draw.line([cx + 60, ky + 100, cx + 60, ky + 180], fill=colors[2], width=2)
    
    # HUD elements around knight
    draw.rectangle([cx - 80, ky - 20, cx - 60, ky - 5], fill=(0, 0, 0, 180))
    draw.rectangle([cx + 60, ky - 20, cx + 80, ky - 5], fill=(0, 0, 0, 180))
    # HP/Shield bars
    draw.rectangle([cx - 78, ky - 18, cx - 62, ky - 10], fill=colors[2])
    draw.rectangle([cx + 62, ky - 18, cx + 78, ky - 10], fill=colors[1])
    
    # Upgrade modules floating
    for i in range(6):
        mx = cx + (i % 3 - 1) * 100
        my = cy + (i // 3 - 0.5) * 100
        draw.rectangle([mx - 15, my - 15, mx + 15, my + 15], fill=(30, 30, 40))
        draw.rectangle([mx - 10, my - 10, mx + 10, my + 10], fill=colors[i % 3])

def draw_lowpoly_racer(draw, width, height, colors):
    """Draw N64-era low-poly racer."""
    # Chunky mountain background
    mountain_points = []
    for x in range(0, width + 50, 50):
        h = height * 0.3 + int(50 * math.sin(x * 0.02) + 30 * math.sin(x * 0.01))
        mountain_points.append((x, height))
        mountain_points.append((x, h))
    mountain_points.append((width, height))
    mountain_points.append((0, height))
    draw.polygon(mountain_points, fill=(20, 20, 40))
    
    # Second mountain layer
    mountain_points2 = []
    for x in range(0, width + 50, 50):
        h = height * 0.45 + int(40 * math.sin(x * 0.03) + 20 * math.sin(x * 0.015))
        mountain_points2.append((x, height))
        mountain_points2.append((x, h))
    mountain_points2.append((width, height))
    mountain_points2.append((0, height))
    draw.polygon(mountain_points2, fill=(30, 30, 50))
    
    # Low-poly track (perspective)
    track_top = height * 0.5
    track_bottom = height
    draw.polygon([
        (width // 2 - 100, track_top),
        (width // 2 + 100, track_top),
        (width // 2 + 300, track_bottom),
        (width // 2 - 300, track_bottom)
    ], fill=(40, 40, 60))
    
    # Track edges
    draw.line([(width // 2 - 100, track_top), (width // 2 - 300, track_bottom)], fill=colors[1], width=4)
    draw.line([(width // 2 + 100, track_top), (width // 2 + 300, track_bottom)], fill=colors[1], width=4)
    
    # Low-poly cars (chunky polygons)
    car_positions = [
        (width // 2, track_top + 50),
        (width // 2 - 80, track_top + 120),
        (width // 2 + 80, track_top + 120),
    ]
    
    for cx, cy in car_positions:
        # Car body (chunky polygons)
        car_color = colors[0] if cx == width // 2 else colors[2]
        draw.polygon([
            (cx - 25, cy + 15),
            (cx + 25, cy + 15),
            (cx + 35, cy - 10),
            (cx + 15, cy - 25),
            (cx - 15, cy - 25),
            (cx - 35, cy - 10),
        ], fill=car_color)
        # Wheels (squares for low-poly)
        draw.rectangle([cx - 30, cy + 20, cx - 15, cy + 35], fill=(10, 10, 10))
        draw.rectangle([cx + 15, cy + 20, cx + 30, cy + 35], fill=(10, 10, 10))
        # Spoiler
        draw.polygon([
            (cx - 20, cy - 25),
            (cx + 20, cy - 25),
            (cx + 25, cy - 35),
            (cx - 25, cy - 35),
        ], fill=colors[2])
    
    # Checkered flags
    for i in range(8):
        fx = i * (width // 8)
        draw.rectangle([fx, height - 40, fx + 40, height], fill=(255, 255, 255) if i % 2 == 0 else (0, 0, 0))
    
    # Split screen indicator
    draw.line([(width // 2, height // 2), (width // 2, height)], fill=colors[2], width=2, joint="curve")

THEME_DRAWERS = {
    "synthwave_highway": draw_synthwave_highway,
    "pixel_platformer": draw_pixel_platformer,
    "cosmic_horror": draw_cosmic_horror,
    "arcade_cabinets": draw_arcade_cabinets,
    "cyberpunk_knight": draw_cyberpunk_knight,
    "lowpoly_racer": draw_lowpoly_racer,
}

def generate_game_images():
    """Generate all images for all games."""
    for game_id, config in GAMES.items():
        game_dir = os.path.join(OUTPUT_DIR, game_id)
        os.makedirs(game_dir, exist_ok=True)
        
        drawer = THEME_DRAWERS[config["theme"]]
        colors = config["accent_colors"]
        
        for img_type, (w, h) in SIZES.items():
            if img_type == "screenshot":
                # Generate 2-4 screenshots
                for i in range(1, 5):
                    if game_id == "neon-drifter" and i > 3: break
                    if game_id in ["pixel-warrior", "arcade-legends", "cyber-knight", "retro-racer-64"] and i > 2: break
                    if game_id == "void-station" and i > 4: break
                    
                    img = create_gradient_bg(w, h, config["bg_colors"])
                    draw = ImageDraw.Draw(img)
                    drawer(draw, w, h, colors)
                    
                    # Add variation for screenshots
                    if i > 1:
                        # Slight color shift
                        shifted_colors = [(min(255, c[0] + 20), min(255, c[1] + 10), min(255, c[2] + 5)) for c in colors]
                        drawer(draw, w, h, shifted_colors)
                    
                    # Add game title
                    try:
                        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
                    except:
                        font = ImageFont.load_default()
                    
                    title_text = config["title"]
                    bbox = draw.textbbox((0, 0), title_text, font=font)
                    tx = (w - (bbox[2] - bbox[0])) // 2
                    ty = 20
                    # Outline
                    for dx, dy in [(-2, -2), (2, -2), (-2, 2), (2, 2)]:
                        draw.text((tx + dx, ty + dy), title_text, font=font, fill=(0, 0, 0))
                    draw.text((tx, ty), title_text, font=font, fill=colors[0])
                    
                    filename = f"{img_type}-{i}.jpg" if img_type == "screenshot" else f"{img_type}.jpg"
                    filepath = os.path.join(OUTPUT_DIR, game_id, filename)
                    img.save(filepath, "JPEG", quality=90)
                    print(f"Generated: {filepath}")
            else:
                img = create_gradient_bg(w, h, config["bg_colors"])
                draw = ImageDraw.Draw(img)
                drawer(draw, w, h, colors)
                
                # Add game title
                try:
                    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 48 if img_type == "hero" else 24)
                except:
                    font = ImageFont.load_default()
                
                title_text = config["title"]
                bbox = draw.textbbox((0, 0), title_text, font=font)
                tx = (w - (bbox[2] - bbox[0])) // 2
                ty = h // 2 - (bbox[3] - bbox[1]) // 2
                # Outline
                for dx, dy in [(-3, -3), (3, -3), (-3, 3), (3, 3)]:
                    draw.text((tx + dx, ty + dy), title_text, font=font, fill=(0, 0, 0))
                draw.text((tx, ty), title_text, font=font, fill=colors[0])
                
                # Subtitle for hero
                if img_type == "hero":
                    subtitle = "ARCADE VAULT EXCLUSIVE"
                    try:
                        subfont = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
                    except:
                        subfont = ImageFont.load_default()
                    sbbox = draw.textbbox((0, 0), subtitle, font=subfont)
                    stx = (w - (sbbox[2] - sbbox[0])) // 2
                    sty = ty + (bbox[3] - bbox[1]) + 20
                    for dx, dy in [(-1, -1), (1, -1), (-1, 1), (1, 1)]:
                        draw.text((stx + dx, sty + dy), subtitle, font=subfont, fill=(0, 0, 0))
                    draw.text((stx, sty), subtitle, font=subfont, fill=colors[1])
                
                filename = f"{img_type}.jpg"
                filepath = os.path.join(OUTPUT_DIR, game_id, filename)
                img.save(filepath, "JPEG", quality=90)
                print(f"Generated: {filepath}")

if __name__ == "__main__":
    generate_game_images()
    print("\nAll images generated successfully!")