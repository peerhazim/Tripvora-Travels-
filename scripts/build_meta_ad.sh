#!/bin/bash
set -e

FONT="/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
TMP_DIR="/tmp/meta_ad_build"
mkdir -p "$TMP_DIR"
mkdir -p public

echo "=== 1. Generating Melodic Audio Bed (15.0 seconds) ==="
ffmpeg -y -f lavfi -i "aevalsrc='\
0.09*sin(2*PI*146.83*t) + \
0.07*sin(2*PI*220*t) + \
0.05*sin(2*PI*293.66*t) + \
0.04*sin(2*PI*369.99*t) + \
0.08*sin(2*PI*(293.66 + 37*(mod(floor(t*2),4))))*exp(-4*mod(t,0.5)) + \
0.03*sin(2*PI*587.33*t)*exp(-2*mod(t,1.0)) \
':d=15" -af "afade=t=in:ss=0:d=0.8,afade=t=out:st=14.2:d=0.8,volume=1.5" -c:a aac -b:a 192k "$TMP_DIR/audio.aac"

echo "=== 2. Scene 1: Dal Lake & Houseboats (112 frames = 3.73s) ==="
ffmpeg -y -loop 1 -i public/images/dal-lake-shikara-hero.jpg \
  -vf "zoompan=z='min(zoom+0.0012,1.15)':d=112:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,\
drawbox=y=0:w=1080:h=230:color=black@0.65:t=fill,\
drawbox=x=60:y=70:w=960:h=68:color=0x064e3b@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='TRIPVORA TRAVELS • GOVT REGD KASHMIR':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=88,\
drawtext=fontfile=$FONT:expansion=none:text='★ 4.9/5 RATED • 10,000+ HAPPY TRAVELERS':fontcolor=0xfef08a:fontsize=24:x=(w-text_w)/2:y=155,\
drawbox=y=1220:w=1080:h=640:color=black@0.80:t=fill,\
drawbox=x=60:y=1260:w=440:h=52:color=0xd97706@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='DAL LAKE • HOUSEBOATS':fontcolor=black:fontsize=26:x=85:y=1273,\
drawtext=fontfile=$FONT:expansion=none:text='EXPERIENCE KASHMIR':fontcolor=white:fontsize=58:x=60:y=1335,\
drawtext=fontfile=$FONT:expansion=none:text='Sunset Shikara Cruise & Carved Cedar Stays':fontcolor=0xe5e7eb:fontsize=32:x=60:y=1410,\
drawbox=x=60:y=1470:w=960:h=3:color=0x10b981@0.8:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='All-Inclusive Tour Packages from Rs 12,999/-':fontcolor=0x34d399:fontsize=36:x=60:y=1495,\
drawtext=fontfile=$FONT:expansion=none:text='Includes: Private Cab + 4-Star Stay + Meals + Shikara':fontcolor=0xd1d5db:fontsize=26:x=60:y=1550,\
drawtext=fontfile=$FONT:expansion=none:text='Verified Native Tour Operator • 0% Hidden Cost':fontcolor=0x9ca3af:fontsize=24:x=60:y=1595,\
drawbox=x=60:y=1650:w=960:h=110:color=0x047857@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='WHATSAPP / CALL: +91 7006644364':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=1685,\
drawtext=fontfile=$FONT:expansion=none:text='Tap Below To Get Free Custom Itinerary':fontcolor=0x86efac:fontsize=22:x=(w-text_w)/2:y=1790" \
  -vframes 112 -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -r 30 "$TMP_DIR/s1.mp4"

echo "=== 3. Scene 2: Gulmarg Snow & Gondola (112 frames = 3.73s) ==="
ffmpeg -y -loop 1 -i public/images/gulmarg-gondola-snow.jpg \
  -vf "zoompan=z='min(zoom+0.0012,1.15)':d=112:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,\
drawbox=y=0:w=1080:h=230:color=black@0.65:t=fill,\
drawbox=x=60:y=70:w=960:h=68:color=0x064e3b@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='TRIPVORA TRAVELS • NATIVE GROUND EXPERTS':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=88,\
drawtext=fontfile=$FONT:expansion=none:text='★ 4.9/5 RATED • GONDOLA ASSISTANCE INCLUDED':fontcolor=0xfef08a:fontsize=24:x=(w-text_w)/2:y=155,\
drawbox=y=1220:w=1080:h=640:color=black@0.80:t=fill,\
drawbox=x=60:y=1260:w=480:h=52:color=0x0284c7@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='GULMARG AT 13,780 FT':fontcolor=white:fontsize=26:x=85:y=1273,\
drawtext=fontfile=$FONT:expansion=none:text='ASIA HIGHEST CABLE CAR':fontcolor=white:fontsize=58:x=60:y=1335,\
drawtext=fontfile=$FONT:expansion=none:text='Mount Apharwat Snow, Skiing & Snowmobiles':fontcolor=0xe5e7eb:fontsize=32:x=60:y=1410,\
drawbox=x=60:y=1470:w=960:h=3:color=0x38bdf8@0.8:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='Guaranteed Gondola Passes & Snow Gear Help':fontcolor=0x7dd3fc:fontsize=36:x=60:y=1495,\
drawtext=fontfile=$FONT:expansion=none:text='Private Heating Hotel Stay & Delicious Buffets':fontcolor=0xd1d5db:fontsize=26:x=60:y=1550,\
drawtext=fontfile=$FONT:expansion=none:text='Safe Snow Chains Vehicle from Tangmarg to Gulmarg':fontcolor=0x9ca3af:fontsize=24:x=60:y=1595,\
drawbox=x=60:y=1650:w=960:h=110:color=0x047857@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='WHATSAPP / CALL: +91 7006644364':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=1685,\
drawtext=fontfile=$FONT:expansion=none:text='Tap Below To Get Free Custom Itinerary':fontcolor=0x86efac:fontsize=22:x=(w-text_w)/2:y=1790" \
  -vframes 112 -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -r 30 "$TMP_DIR/s2.mp4"

echo "=== 4. Scene 3: Pahalgam & Betaab Valley (112 frames = 3.73s) ==="
ffmpeg -y -loop 1 -i public/images/betaab-valley-pahalgam.jpg \
  -vf "zoompan=z='min(zoom+0.0012,1.15)':d=112:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,\
drawbox=y=0:w=1080:h=230:color=black@0.65:t=fill,\
drawbox=x=60:y=70:w=960:h=68:color=0x064e3b@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='TRIPVORA TRAVELS • UNBEATABLE ITINERARIES':fontcolor=white:fontsize=32:x=(w-text_w)/2:y=88,\
drawtext=fontfile=$FONT:expansion=none:text='★ 4.9/5 RATED • 100% TAILOR-MADE ITINERARIES':fontcolor=0xfef08a:fontsize=24:x=(w-text_w)/2:y=155,\
drawbox=y=1220:w=1080:h=640:color=black@0.80:t=fill,\
drawbox=x=60:y=1260:w=490:h=52:color=0x15803d@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='PAHALGAM & BETAAB VALLEY':fontcolor=white:fontsize=26:x=80:y=1273,\
drawtext=fontfile=$FONT:expansion=none:text='VALLEY OF SHEPHERDS':fontcolor=white:fontsize=58:x=60:y=1335,\
drawtext=fontfile=$FONT:expansion=none:text='Lush Pine Forests, Aru & Turquoise Lidder River':fontcolor=0xe5e7eb:fontsize=32:x=60:y=1410,\
drawbox=x=60:y=1470:w=960:h=3:color=0x4ade80@0.8:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='Private Dedicated Cabs & Courteous Drivers':fontcolor=0x86efac:fontsize=36:x=60:y=1495,\
drawtext=fontfile=$FONT:expansion=none:text='Explore Mini-Switzerland (Baisaran) & Saffron Fields':fontcolor=0xd1d5db:fontsize=26:x=60:y=1550,\
drawtext=fontfile=$FONT:expansion=none:text='Pure Family Friendly Stays & Local Halal / Veg Cuisine':fontcolor=0x9ca3af:fontsize=24:x=60:y=1595,\
drawbox=x=60:y=1650:w=960:h=110:color=0x047857@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='WHATSAPP / CALL: +91 7006644364':fontcolor=white:fontsize=40:x=(w-text_w)/2:y=1685,\
drawtext=fontfile=$FONT:expansion=none:text='Tap Below To Get Free Custom Itinerary':fontcolor=0x86efac:fontsize=22:x=(w-text_w)/2:y=1790" \
  -vframes 112 -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -r 30 "$TMP_DIR/s3.mp4"

echo "=== 5. Scene 4: Direct Booking Call to Action (114 frames = 3.80s) ==="
ffmpeg -y -loop 1 -i public/images/sonamarg-valley-hero.jpg \
  -vf "zoompan=z='min(zoom+0.0010,1.12)':d=114:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=30,\
drawbox=y=0:w=1080:h=1920:color=black@0.74:t=fill,\
drawbox=x=60:y=120:w=960:h=85:color=0x064e3b@0.98:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='TRIPVORA TRAVELS':fontcolor=white:fontsize=46:x=(w-text_w)/2:y=140,\
drawtext=fontfile=$FONT:expansion=none:text='GOVT. REGD NATIVE KASHMIR TOUR OPERATOR':fontcolor=0xfef08a:fontsize=24:x=(w-text_w)/2:y=230,\
drawbox=x=60:y=300:w=960:h=780:color=0x111827@0.88:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='BOOK DIRECT & SAVE 25%':fontcolor=0xf59e0b:fontsize=48:x=(w-text_w)/2:y=340,\
drawtext=fontfile=$FONT:expansion=none:text='Why Book With TripVora Native Team?':fontcolor=white:fontsize=34:x=(w-text_w)/2:y=415,\
drawtext=fontfile=$FONT:expansion=none:text='✓ 100% Customized Family & Honeymoon Plans':fontcolor=0x34d399:fontsize=28:x=100:y=490,\
drawtext=fontfile=$FONT:expansion=none:text='✓ Sanitized Private Cabs (Sedan, Ertiga, Innova)':fontcolor=0x34d399:fontsize=28:x=100:y=550,\
drawtext=fontfile=$FONT:expansion=none:text='✓ Premium Hotels & Heritage Cedar Houseboats':fontcolor=0x34d399:fontsize=28:x=100:y=610,\
drawtext=fontfile=$FONT:expansion=none:text='✓ Guaranteed Gondola Pass Assistance in Gulmarg':fontcolor=0x34d399:fontsize=28:x=100:y=670,\
drawtext=fontfile=$FONT:expansion=none:text='✓ 24/7 On-Ground Native Support in Kashmir':fontcolor=0x34d399:fontsize=28:x=100:y=730,\
drawtext=fontfile=$FONT:expansion=none:text='✓ Zero Middlemen - Direct Local Pricing':fontcolor=0x34d399:fontsize=28:x=100:y=790,\
drawbox=x=60:y=1120:w=960:h=80:color=0xd97706@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='PACKAGES STARTING FROM RS 12,999/-':fontcolor=black:fontsize=36:x=(w-text_w)/2:y=1142,\
drawbox=x=60:y=1260:w=960:h=380:color=0x064e3b@0.95:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='GET YOUR FREE CUSTOM ITINERARY TODAY':fontcolor=0x86efac:fontsize=28:x=(w-text_w)/2:y=1290,\
drawtext=fontfile=$FONT:expansion=none:text='CALL / WHATSAPP:':fontcolor=white:fontsize=34:x=(w-text_w)/2:y=1350,\
drawtext=fontfile=$FONT:expansion=none:text='+91 7006644364':fontcolor=0xfef08a:fontsize=64:x=(w-text_w)/2:y=1405,\
drawtext=fontfile=$FONT:expansion=none:text='Office: Dal Lake Boulevard, Srinagar':fontcolor=0xd1d5db:fontsize=24:x=(w-text_w)/2:y=1495,\
drawtext=fontfile=$FONT:expansion=none:text='Email: reservations@tripvora.com':fontcolor=0x9ca3af:fontsize=22:x=(w-text_w)/2:y=1540,\
drawbox=x=60:y=1690:w=960:h=110:color=0x0284c7@0.98:t=fill,\
drawtext=fontfile=$FONT:expansion=none:text='TAP SEND MESSAGE TO CHAT WITH US':fontcolor=white:fontsize=38:x=(w-text_w)/2:y=1725" \
  -vframes 114 -c:v libx264 -preset fast -crf 20 -pix_fmt yuv420p -r 30 "$TMP_DIR/s4.mp4"

echo "=== 6. Concatenating Scenes & Merging Soundtrack ==="
cat << 'CAT_EOF' > "$TMP_DIR/concat.txt"
file 's1.mp4'
file 's2.mp4'
file 's3.mp4'
file 's4.mp4'
CAT_EOF

ffmpeg -y -f concat -safe 0 -i "$TMP_DIR/concat.txt" -i "$TMP_DIR/audio.aac" \
  -c:v copy -c:a aac -shortest -movflags +faststart \
  public/tripvora-kashmir-meta-ad.mp4

echo "=== SUCCESS! Final Video Created at public/tripvora-kashmir-meta-ad.mp4 ==="
ls -lh public/tripvora-kashmir-meta-ad.mp4
ffprobe -hide_banner public/tripvora-kashmir-meta-ad.mp4
