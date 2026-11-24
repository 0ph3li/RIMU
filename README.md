# RIMU — bird park

> a bird park at the bottom of the world.
> fourteen birds that were almost gone, four trails, no cats. ever.

**RIMU** is a concept site for a bird park on **Whenua Hou**, a small island off Rakiura (Stewart Island), at the bottom of New Zealand. You take a 40-minute ferry from Bluff, scrub your boots at the jetty, and walk four trails where the birds have right of way: the kākāpō, the white heron, the takahē that was declared extinct in 1898, the hihi, the tūī and nine more.

The park is named after the **rimu**, a native tree. In the years the rimu fruits, the kākāpō breed. Nothing else on the island matters as much.

It's a site you listen to as well as look at. Every bird has its **real call** next to it, recorded in the field, mostly by New Zealand's Department of Conservation. You can play them one after another as a dawn chorus or guess who's singing.

concept, design & code by **ghostly.grl ♥**

---

## contents

- [the idea](#the-idea)
- [the look](#the-look)
- [the pages](#the-pages): [home](#home) · [the birds](#the-birds) · [trails](#trails) · [adopt](#adopt) · [visit](#visit)
- [the voices](#the-voices)
- [live things](#live-things)
- [always on](#always-on)
- [easter eggs](#easter-eggs)
- [run it](#run-it)
- [structure](#structure)
- [stack](#stack)
- [images & sound](#images--sound)
- [a note](#a-note)

---

## the idea

Most bird parks are cages with a café. Rimu is the opposite. The birds live free on a predator-free island and **you are the visitor in their house**. So the site does three things:

- **it shows the birds as protagonists.** Big photos, their Māori names in giant letters, how many are left in the world.
- **it lets you hear them.** Fourteen real recordings, each drawn as its real waveform.
- **it teaches you the rules before you arrive.** The bag check, the boots, red light only after dark. These are the real biosecurity rules of New Zealand's predator-free islands, made into things you click.

The four birds Martina loves most are on the island as their New Zealand cousins:

| her bird | on the island |
|---|---|
| hummingbird | **hihi**, the stitchbird, who drinks nectar and hovers |
| mockingjay | **tūī**, who copies everything, phones included |
| heron / crane | **kōtuku**, the white heron |
| long-tailed widowbird | **koekoeā**, the long-tailed cuckoo, half of it tail |

---

## the look

One idea: **the island is always seen through a window.** Every screen is a photo in a thin cream frame with round corners, on black, like looking out from the inside of a hut at night. The name of the place sits on the photo in a tall thin serif, and a small cream **postcard** (a strip, a photo, a strip) sits in the corner with the details. The layout comes from the Eagle's Nest resort reference.

The only colour that isn't a photo is the orange of the mark: a **koru**, the fern frond that hasn't opened yet.

| | |
|---|---|
| ink (the hut at night) | `#0a0a09` |
| ink 2 | `#141412` |
| cream (frames, postcards) | `#f2ecdc` |
| cream 2 | `#d8d0bc` |
| mute | `#8f8a7e` |
| koru orange | `#e8821e` |

| type | used for |
|---|---|
| **Italiana** | every name: birds, trails, pages, the giant RIMU |
| **Inter Tight** | everything else: labels, postcards, body |
| **Pinyon Script** | the signature, and your name on the adoption card |

**The window** (`.win`) is the one component of the whole site: a frame, a photo that fills it (`.slot`), a shade so the text reads (`.win-shade`), a name bottom left, a postcard bottom right (`.pc`). Every page opens on one.

**The cursor** is a small cream dot. Over anything you can use, it turns orange and a little label appears next to it (*listen*, *walk it*, *turn the card*, *drag ⟷*).

**The loader** shows the koru turning in, then the frame draws itself around where the first photo will be, and the photo appears inside it. It plays once per visit.

---

## the pages

### home

`index.html` · *the whole park on one page.*

| # | section | what happens |
|---|---|---|
| 01 | hero | the Eagle's Nest screen: a framed photo of the island, a two-column menu with the **live island time** and open/closed, *RIMU BIRD PARK* in giant serif, and a **seen today** postcard that changes bird every few seconds (click it for the next one). **On scroll the window opens to the edges of the screen** and the photo follows your mouse a little |
| 02 | the park | one long sentence whose **words light up as you read**, with two tiny photo pills inside it; four numbers count up (14 species, 4 trails, 0 cats, 40 minutes of ferry) |
| 03 | the birds | six names in giant serif. **A postcard with the bird's photo follows your hand** and leans with how fast you move. A button leads to all fourteen |
| 04 | name band | the fourteen names running, faster when you scroll |
| 05 | trails | **four full-screen windows that stack** as you scroll; the one underneath shrinks and goes dark. Each has its length, time, the birds you'll meet and a bird postcard |
| 06 | a day on the island | a pinned window with a **giant clock that runs from 06:40 to 22:00**. Eight moments: the first ferry, the gate, the herons fishing, the hihi at the feeders, lunch with takahē, the tūī chorus, the last ferry, the kākāpō booming |
| 07 | stay the night | four huts in the trees and the night walk. **Drag the row** (with inertia); scrolling pushes it too |
| 08 | adopt | Tīwai, Hine, Pip and Moana. **Click a card to turn it** and see what you get |
| 09 | visit | the last window opens as you reach it. **A ticket card you can fill**: day, ferry, people, NZ$ total |

### the birds

`birds.html` · *fourteen birds, fourteen voices.*

| # | section | what happens |
|---|---|---|
| 01 | dawn chorus | one big window. Press **play the dawn chorus** and all fourteen sing one after another, 8 seconds each, in the order they wake up: korimako at dawn → tūī → kākā → hihi → … → tītī at dusk → kākāpō in the night. With every bird the photo rises in, the giant name scrambles into the new one, and the postcard draws its waveform |
| 02 | the fourteen | a staggered grid of fourteen cards: photo, name, how many are left, Latin name, what the call sounds like, and **a player with the bird's real call**. The card being played gets an orange frame. Filter by where they live: estuary, forest, meadow, ridge, after dark |
| 03 | field card | click a photo and the bird's card opens over the page: where, when, size, how many, what it sounds like, one more thing, and the player. **← →** move between birds, **Esc** closes |
| 04 | who's singing? | a game. Press the big play button, listen, pick one of four names. Only after you answer does the photo rise into the window. Five rounds, then a score (*you could be a ranger* / *the birds forgive you*) |
| 05 | the recordings | who recorded each call, with the licence and a link to the source |

### trails

`trails.html` · *you pick one, the birds pick the rest.*

| # | section | what happens |
|---|---|---|
| 01 | window | *FOUR WALKS* over the island seen from the ridge. Live island time and whether the trails are open. The postcard lists the four trails: **click one to jump straight to it on the map** |
| 02 | the map | pinned for the length of thirteen screens. On the left, the island drawn as a line with depth lines around it and the four trails dotted. **Your scroll is your walk**: an orange dot walks the trail and lights each stop as it passes, and the trail you're on draws itself in orange. On the right, a window shows what you'd see at that stop (mudflats, oystercatchers, shags, the hide, the boardwalk, the feeders, the old rimu, tussock, the picnic table, pūkeko, moss, beech, the summit) with a postcard saying who you'll meet. Below, a km counter and a progress bar |
| 03 | the walker's pact | six promises: check your bag, scrub your boots, stay on the path, feed no one, red light only, take it all back. **Tick them one by one** (they're remembered). Six out of six: *the island says thank you* |
| 04 | next | a window that takes you to visit: *TAKE THE FERRY* |

The four trails:

| | trail | length | time | you'll meet |
|---|---|---|---|---|
| 01 | the estuary | 1.2 km | 40 min, easy | kōtuku, tōrea, kawau |
| 02 | the boardwalk | 2.4 km | 1 h 10, easy | hihi, tūī, korimako, kākā |
| 03 | the meadow | 1.8 km | 50 min, easy | takahē, pūkeko, pīwakawaka |
| 04 | the ridge | 3.6 km | 2 h, steep | mohua, koekoeā, tūī |

### adopt

`adopt.html` · *one bird, one year, a postcard every month.*

| # | section | what happens |
|---|---|---|
| 01 | window | *ADOPT ONE* over the kākāpō, with how many birds and people adopted this year. The postcard is the three steps |
| 02 | the eight | eight birds with names given by the rangers: **Tīwai** the kākāpō, **Hine** the kōtuku, **Pip** the hihi, **Moana** the takahē chick, **Koro** the kākā, **Aroha** the robin, **Wiri** the tūī, **Kahu** the cuckoo. Each can be adopted by 40 people at most; a bar shows how many places are taken. **Click one to pick it** |
| 03 | the postcard | a form on the left, the adoption postcard on the right, and **the card writes itself as you type**: your name in script, a line for the bird, today's date, a card number, a koru stamp. Three tiers (Feather NZ$25, Nest NZ$60, Flock NZ$120) change what you get. **Download card** redraws the same postcard on a canvas and saves it as a png |
| 04 | letters from Mere | the ranger on the ridge writes every month. Her postcards (*he took my pen again, that's why this one is in pencil*) **slide sideways while the page stands still** |
| 05 | next | *COME AND SEE HER* → visit |

### visit

`visit.html` · *a ferry, a jetty, a gate, and then the birds.*

| # | section | what happens |
|---|---|---|
| 01 | window | *COME OVER* over the island in a grey sea. The postcard is **live**: island time, gate open or closed, the next ferry from Bluff, and **the real weather off Whenua Hou right now** (temperature, wind, sky) |
| 02 | the crossing | six windows from the Bluff wharf to the island gate, **sliding sideways while a giant clock runs from 08:10 to 09:20**: the wharf, cast off, the strait, land, the boots, the gate |
| 03 | the bag check | ten cards: a sandwich, muddy boots, binoculars, a mouse, your dog, a red torch, velcro, a drone, an apple, a field guide. **Guess, then turn each card** for the ranger's answer: green *yes*, yellow *scrub / check / eat it*, red *no*, with the real reason. Turn all ten and the bag is cleared |
| 04 | tickets | ten days, ferry out, ferry back (you can't book a return less than three hours after you land), adults and kids, and an optional night in one of the four huts (then you're on the 10:00 ferry next morning). **The boarding pass fills itself**: date, out, back, people, hut, total, and a ticket number and barcode generated from your choices |
| 05 | questions | getting to Bluff, rough seas, kids, boots, wheelchairs and prams, and *is Rimu real?* |

---

## the voices

Each call is an mp3 in `audio/`. The page uses **one audio player for everything**, so only one bird sings at a time.

- **real waveforms.** Each file is decoded once with the Web Audio API (`decodeAudioData`) and its loudness is measured in 120 slices. That's the shape you see: a booming kākāpō looks nothing like a buzzing mohua. As it plays, the bars fill orange.
- **no silence.** Field recordings often start with seconds of wind. The player finds the first moment the bird is really there (above 22% of the loudest point) and starts a quarter of a second before it.
- **short and soft.** Each call plays for 30 s at most (8 in the chorus, 14 in the game) and fades in and out.
- **quiet when you leave.** Switching tab stops everything.

---

## live things

| what | where | from |
|---|---|---|
| island time | every page | your clock, converted to `Pacific/Auckland` |
| open / closed | home, trails, visit | island time against 08:00–18:00 |
| next ferry | visit | island time against 08:30 / 10:30 / 12:30 |
| weather | visit | [open-meteo](https://open-meteo.com) at 46.77°S 167.64°E, no key; if it fails the card says *bring a jacket. always.* |
| ticket days | home, visit | the next days in New Zealand, not where you are |

---

## always on

- **the top bar**: a rounded pill with the koru, the four pages and *Tickets*. On the home it only appears once you've left the first window; it hides when you scroll down and comes back when you scroll up
- **the cursor**: dot + label, magnetic buttons
- **sound**: off by default. Turn it on and small synthesized bird chirps answer what you do (turning a card, a new stop on the map, a new moment of the day). The real calls on *the birds* always play, because you press play
- **tab title**: leave the tab and it says *the birds are still here. come back*
- **mobile**: every page has a phone layout; the menu becomes a full-screen list of names

Saved in your browser (`localStorage`, prefix `rm-`): `rm-sound`, `rm-pact` (your promises), `rm-adopted` (the birds you adopted). `sessionStorage` `rm-in` keeps the loader to once per visit.

---

## easter eggs

- **Konami code** (↑ ↑ ↓ ↓ ← → ← → B A): *the rimu fruited. it's a breeding year.* and red rimu berries rain down the page, with chirps if sound is on
- **console**: an ascii cat (*the cat is not allowed in the park. ever.*) and `KP.help()`
- `KP.mast()` makes the rimu fruit, `KP.call()` makes a bird call, `KP.toast(k, t)` writes a postcard note
- every html file ends with an ascii cat after `</html>`

---

## run it

It's plain html, css and js, with nothing to build or install. Because the calls are decoded with `fetch`, open it through a local server, not by double-clicking:

```bash
cd RIMU
python3 -m http.server 8000
```

then go to `http://localhost:8000`.

---

## structure

```
RIMU/
├── index.html        home
├── birds.html        the birds + their calls
├── trails.html       the map you walk
├── adopt.html        the adoption postcard
├── visit.html        crossing, bag check, tickets
├── favicon.svg       the koru
├── css/
│   ├── style.css     shared: window, postcard, slots, top bar, cursor, footer, loader
│   ├── home.css
│   ├── birds.css
│   └── pages.css     trails, adopt, visit
├── js/
│   ├── main.js       window.KP: slots, lenis, cursor, sound, toast, nz time, loader, konami, console
│   ├── home.js
│   ├── birds.js      the player, waveforms, chorus, field card, quiz
│   ├── trails.js     the map walk + the pact
│   ├── adopt.js      the eight, the postcard (+ png), the letters
│   └── visit.js      live card, crossing, bag check, boarding pass, questions
├── img/
│   ├── HOME/   BIRDS/   TRAILS/   VISIT/
└── audio/            fourteen calls
```

Images go in `.slot[data-img="FOLDER/name.jpg"]`. If a file is missing, the slot shows a soft gradient with a label instead. It also tries `.png` and `.webp` with the same name, so you can swap any photo by dropping in a file with the same name.

---

## stack

- HTML, CSS, vanilla JavaScript: no framework, no build
- [GSAP 3.12.5](https://gsap.com) + ScrollTrigger: pins, scrubbed timelines, the map walk
- [Lenis 1.1.13](https://lenis.darkroom.engineering): smooth scroll
- Web Audio API (`decodeAudioData`) for the waveforms, `<canvas>` to draw them and the postcard png
- [open-meteo](https://open-meteo.com) for the weather
- Google Fonts: Italiana, Inter Tight, Pinyon Script

---

## images & sound

Photos of the birds are from **Wikimedia Commons**. Landscapes, huts and the crossing are mostly from **Pinterest** (authors unknown). Calls are from **Wikimedia Commons** (mostly the Department of Conservation) and **xeno-canto**. Every file is credited below. If you're an author and want a photo removed or credited differently, open an issue.

Some notes:

- The mohua is a painting by J. G. Keulemans from Buller's *A History of the Birds of New Zealand* (1888, public domain), because there was no good free photo.
- The pūkeko photo (`TRAILS/m3.jpg`) was taken in Australia. It's the same species, but not in New Zealand.
- Three calls from xeno-canto are **CC BY-NC-SA**: non-commercial only, which is fine for a portfolio concept.

### photo credits

| file | source | author | licence | |
|---|---|---|---|---|
| `BIRDS/kotuku.jpg` | White heron,(Egretta alba modesta) (41598563312).jpg | Bernard Spragg. NZ from Christchurch, New Zealand | CC0 | [link](https://commons.wikimedia.org/wiki/File:White_heron,(Egretta_alba_modesta)_(41598563312).jpg) |
| `BIRDS/kakapo.jpg` | Kakapo Sirocco 1.jpg | Department of Conservation | CC BY 2.0 | [link](https://commons.wikimedia.org/wiki/File:Kakapo_Sirocco_1.jpg) |
| `BIRDS/takahe.jpg` | South Island Takahe. (Porphyrio hochstetteri) (8177479445).jpg | Bernard Spragg. NZ from Christchurch, New Zealand | CC0 | [link](https://commons.wikimedia.org/wiki/File:South_Island_Takahe._(Porphyrio_hochstetteri)_(8177479445).jpg) |
| `BIRDS/hihi.jpg` | Male hihi perched on a twig, raising its white ear tufts.jpg | Pseudopanax at English Wikipedia | Public domain | [link](https://commons.wikimedia.org/wiki/File:Male_hihi_perched_on_a_twig,_raising_its_white_ear_tufts.jpg) |
| `BIRDS/tui.jpg` | Tui (Prosthemadera novaeseelandiae) Tiritiri Matangi 2.jpg | Charles J. Sharp | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Tui_(Prosthemadera_novaeseelandiae)_Tiritiri_Matangi_2.jpg) |
| `BIRDS/kaka.jpg` | Adult-kaka-head-profile.jpg | Judi Lapsley Miller | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Adult-kaka-head-profile.jpg) |
| `BIRDS/kereru.jpg` | Kererū on a rangiora at Zealandia.jpg | Judi Lapsley Miller | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Kerer%C5%AB_on_a_rangiora_at_Zealandia.jpg) |
| `BIRDS/titi.jpg` | Sooty Shearwater - 3.jpg | DKRKaynor | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Sooty_Shearwater_-_3.jpg) |
| `BIRDS/korimako.jpg` | New Zealand bellbird (Anthornis melanura) male Tiritiri Matangi.jpg | Charles J. Sharp | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:New_Zealand_bellbird_(Anthornis_melanura)_male_Tiritiri_Matangi.jpg) |
| `BIRDS/piwakawaka.jpg` | New Zealand fantail (Rhipidura fuliginosa) (39121530410).jpg | Bernard Spragg. NZ from Christchurch, New Zealand | CC0 | [link](https://commons.wikimedia.org/wiki/File:New_Zealand_fantail_(Rhipidura_fuliginosa)_(39121530410).jpg) |
| `BIRDS/toutouwai.jpg` | NZ South Island robin (Petroica australis) (36942992722).jpg | Bernard Spragg. NZ from Christchurch, New Zealand | CC0 | [link](https://commons.wikimedia.org/wiki/File:NZ_South_Island_robin_(Petroica_australis)_(36942992722).jpg) |
| `BIRDS/titipounamu.jpg` | Acanthisitta chloris granti 111560532.jpg | Christopher Stephens | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Acanthisitta_chloris_granti_111560532.jpg) |
| `BIRDS/koekoea.jpg` | Urodynamis taitensis 60290834.jpg | Christopher Stephens | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Urodynamis_taitensis_60290834.jpg) |
| `BIRDS/mohua.jpg` | A History of the Birds of New Zealand - Mohoua albicilla, Mohoua ochrocephala.jpg | John Gerrard Keulemans | Public domain | [link](https://commons.wikimedia.org/wiki/File:A_History_of_the_Birds_of_New_Zealand_-_Mohoua_albicilla,_Mohoua_ochrocephala.jpg) |
| `HOME/hero.jpg` | Ruggedy Mountains.jpg | Jake Osborne | CC BY-SA 2.0 | [link](https://commons.wikimedia.org/wiki/File:Ruggedy_Mountains.jpg) |
| `HOME/t1.jpg` | Ōkārito Lagoon • Okarito Kayaks • MRD 14.jpg | Okarito Kayaks | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:%C5%8Ck%C4%81rito_Lagoon_%E2%80%A2_Okarito_Kayaks_%E2%80%A2_MRD_14.jpg) |
| `HOME/t2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/38/88/84/388884c1200a0f819d008d7796f4402d.jpg) |
| `HOME/t3.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/74/1a/d9/741ad988ee5c53187fb28d380e3f5c1b.jpg) |
| `HOME/t4.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/0b/25/ef/0b25eff8ae303c0d41c5e5596e00ce8a.jpg) |
| `HOME/d1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/05/6a/24/056a2432cd674bc231b15a12ed8127b8.jpg) |
| `HOME/d2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/4d/57/1b/4d571b75789f13ea9324bc4ff0b7c19e.jpg) |
| `HOME/d3.jpg` | Ōkārito Lagoon • Okarito Kayaks • MRD 15.jpg | Okarito Kayaks | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:%C5%8Ck%C4%81rito_Lagoon_%E2%80%A2_Okarito_Kayaks_%E2%80%A2_MRD_15.jpg) |
| `HOME/d4.jpg` | Male hihi - stitchbird.jpg | Judi Lapsley Miller | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Male_hihi_-_stitchbird.jpg) |
| `HOME/d5.jpg` | Two juvenile and two adult takahe standing on grass.jpg | Pseudopanax at English Wikipedia | Public domain | [link](https://commons.wikimedia.org/wiki/File:Two_juvenile_and_two_adult_takahe_standing_on_grass.jpg) |
| `HOME/d6.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/d5/c6/18/d5c61801568b9df5c3f452b88ff9395d.jpg) |
| `HOME/d7.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/b1/c2/74/b1c274dd1500d7e5e364daa20fffbd77.jpg) |
| `HOME/d8.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/39/f9/05/39f90564c6f2c54603b6c356d10b6107.jpg) |
| `HOME/h1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/44/9b/11/449b11eaa3b5b74aa8d272915c43f74a.jpg) |
| `HOME/h2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/1f/30/a1/1f30a1b3278ca4ab56e4dee0fbf11a97.jpg) |
| `HOME/h3.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/9c/5a/06/9c5a065ad79d72b5dd2392cdf737f167.jpg) |
| `HOME/h4.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/0b/61/80/0b6180bde4bc1e0fb54e4eb3076f0a28.jpg) |
| `HOME/h5.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/a1/ff/e4/a1ffe4ed2487a685883936beb9614623.jpg) |
| `HOME/p1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/54/0b/a1/540ba1f390e0b9dff2bf3060af7a3d3f.jpg) |
| `HOME/p2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/a6/7b/be/a67bbe84b83994e7ef78fd4ad2350ee1.jpg) |
| `HOME/visit.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/15/1e/79/151e796a2fbf03ce9ef2d16872362a48.jpg) |
| `HOME/a1.jpg` | Ma - Strigops habroptilus - 6.jpg | Emőke Dénes | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Ma_-_Strigops_habroptilus_-_6.jpg) |
| `HOME/a2.jpg` | White heron,( Egretta alba modesta),NZ. (28727006183).jpg | Bernard Spragg. NZ from Christchurch, New Zealand | CC0 | [link](https://commons.wikimedia.org/wiki/File:White_heron,(_Egretta_alba_modesta),NZ._(28727006183).jpg) |
| `HOME/a3.jpg` | Female hihi (stitchbird) perched on a twig.jpg | Pseudopanax at English Wikipedia | Public domain | [link](https://commons.wikimedia.org/wiki/File:Female_hihi_(stitchbird)_perched_on_a_twig.jpg) |
| `HOME/a4.jpg` | Porphyrio hochstetteri 23982582.jpg | Wouter Koch | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Porphyrio_hochstetteri_23982582.jpg) |
| `TRAILS/hero.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/6c/5a/b6/6c5ab6ac8dd9ab057f08f835e59c6420.jpg) |
| `TRAILS/e1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/08/1e/ce/081ecedb9df53faf3813a6c38a4ce221.jpg) |
| `TRAILS/e2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/7a/63/81/7a63812d86861e4a2bf7e7f1ae506777.jpg) |
| `TRAILS/b1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/19/51/9f/19519f9425ef399e14a362174382f58e.jpg) |
| `TRAILS/b2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/34/21/fe/3421fe3eedcf41e37843caa29fb50c42.jpg) |
| `TRAILS/m1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/74/1a/d9/741ad988ee5c53187fb28d380e3f5c1b.jpg) |
| `TRAILS/m2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/1d/7e/21/1d7e21bcee9f8720e6eebc273960dcf2.jpg) |
| `TRAILS/r1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/f0/1c/1e/f01c1e3bae042fc9ded24a25c12e6ac3.jpg) |
| `TRAILS/r2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/3f/b7/9a/3fb79ae78220744317c5d2f1b91bed8f.jpg) |
| `TRAILS/r3.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/46/1d/3e/461d3e51e925499625d3f5cc4e410450.jpg) |
| `TRAILS/r4.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/b6/f7/ad/b6f7ad1c008f2a12986d94a81b960105.jpg) |
| `TRAILS/pack1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/5a/27/ad/5a27adbaabc2688152d5bf296b04a637.jpg) |
| `TRAILS/pack2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/0a/03/ff/0a03ffb2d136816ecd598b9fe1d2bf7e.jpg) |
| `VISIT/hero.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/1e/59/75/1e59756dbd6af5990f62ff8c0d6fc6dc.jpg) |
| `VISIT/v1.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/12/67/37/1267375631254d3b3c64e4909194da97.jpg) |
| `VISIT/v2.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/5a/8b/f2/5a8bf27668197b50577d1a142d3d039f.jpg) |
| `VISIT/v3.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/be/36/86/be368691852b61b5929775f9005aa300.jpg) |
| `VISIT/v4.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/f9/d1/59/f9d159f7010ccda86218c2fb3da43c62.jpg) |
| `VISIT/v6.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/73/6a/40/736a407b395f37807af24246ae0b8d27.jpg) |
| `VISIT/v8.jpg` | Pinterest | unknown | — | [link](https://i.pinimg.com/736x/a1/d7/07/a1d707ed4475c1f198c85c6baca2f7a2.jpg) |
| `TRAILS/e3.jpg` | Haematopus finschi - Point Chevalier.jpg | JJ Harrison (https://www.jjharrison.com.au/) | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Haematopus_finschi_-_Point_Chevalier.jpg) |
| `TRAILS/m3.jpg` | Purple Swamp Hen Wollongong.jpg | Toby Hudson | CC BY-SA 3.0 au | [link](https://commons.wikimedia.org/wiki/File:Purple_Swamp_Hen_Wollongong.jpg) |
| `TRAILS/b3.jpg` | Dacrydium cupressinum trunk 3.jpg | Hannah Rogers | CC0 | [link](https://commons.wikimedia.org/wiki/File:Dacrydium_cupressinum_trunk_3.jpg) |
| `VISIT/v7.jpg` | Stewart Island Halfmoon Bay fishing sheds.jpg | AlasdairW | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:Stewart_Island_Halfmoon_Bay_fishing_sheds.jpg) |
| `TRAILS/e4.jpg` | Leucocarbo chalconotus (10741237885).jpg | Brian Ralphs from Berkhamsted, Hertfordshire, UK | CC BY 2.0 | [link](https://commons.wikimedia.org/wiki/File:Leucocarbo_chalconotus_(10741237885).jpg) |

### call credits

| file | recording | recordist | licence | |
|---|---|---|---|---|
| `audio/kotuku.mp3` | Great Egret (Ardea alba alba) call.ogg | Stanislas Wroza | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Great_Egret_(Ardea_alba_alba)_call.ogg) |
| `audio/kakapo.mp3` | 051226-kakapo-billbooming.ogg | Mnolf | CC BY 2.5 | [link](https://commons.wikimedia.org/wiki/File:051226-kakapo-billbooming.ogg) |
| `audio/takahe.mp3` | Porphyrio hochstetteri - Takahe-song-10.mp3 | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Porphyrio_hochstetteri_-_Takahe-song-10.mp3) |
| `audio/hihi.mp3` | Stitchbird - hihi - song.mp3 | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Stitchbird_-_hihi_-_song.mp3) |
| `audio/tui.mp3` | Tui song - Trelissick Park -8 March 2021.ogg | Marshelec | CC BY-SA 4.0 | [link](https://commons.wikimedia.org/wiki/File:Tui_song_-_Trelissick_Park_-8_March_2021.ogg) |
| `audio/kaka.mp3` | South-island-kaka.mp3 | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:South-island-kaka.mp3) |
| `audio/kereru.mp3` | Nz-pigeon-song.wav | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Nz-pigeon-song.wav) |
| `audio/mohua.mp3` | Yellowhead-song.ogg | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:Yellowhead-song.ogg) |
| `audio/korimako.mp3` | New Zealand Bellbird (Anthornis melanura).ogg | Sabine's Sunbird | CC BY-SA 3.0 | [link](https://commons.wikimedia.org/wiki/File:New_Zealand_Bellbird_(Anthornis_melanura).ogg) |
| `audio/piwakawaka.mp3` | South-island-fantail.mp3 | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:South-island-fantail.mp3) |
| `audio/toutouwai.mp3` | South-island-robin-song-48.wav | Department of Conservation | CC BY 4.0 | [link](https://commons.wikimedia.org/wiki/File:South-island-robin-song-48.wav) |
| `audio/koekoea.mp3` | XC467378 | Matt Slaymaker | CC BY-NC-SA 4.0 | [link](https://xeno-canto.org/467378) |
| `audio/titi.mp3` | XC1011959 | David Boyle | CC BY-NC-SA 4.0 | [link](https://xeno-canto.org/1011959) |
| `audio/titipounamu.m4a` | XC960628 | Meena Haribal | CC BY-NC-SA 4.0 | [link](https://xeno-canto.org/960628) |

---

## a note

RIMU is a concept. **Whenua Hou is a real nature reserve**, and it's closed to visitors: it's one of the last safe places for the kākāpō. The real kākāpō recovery is run by the Department of Conservation (Te Papa Atawhai) and Ngāi Tahu. No ferry goes there, no tickets are sold, no birds are adopted. If you'd like to help the real ones, look up the **Kākāpō Recovery** programme.

*learn the birds, then let them be.*

ghostly.grl ♥
