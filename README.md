# 📚 Ebook Scout POC (`ebook-scout`)

A lightweight Python CLI and mobile-first web dashboard built to discover, filter, and acquire books across **Dad's 4 Favorite Genres**:
- 🕵️ **Mystery & Whodunits**
- 🚀 **Science Fiction**
- ⏱️ **Time Travel & Multiverse Thrillers**
- 🚓 **Crime & Detective Noir**

## ⚡ Core Features
1. **Multi-Genre Crossover Catalog (`dad_curated_catalog.json`)**: Hand-picked titles that blend all four genres (e.g., *Recursion*, *Dark Matter*, *The 7½ Deaths of Evelyn Hardcastle*, *11/22/63*, *The Caves of Steel*, *The Gone World*).
2. **1-Tap Library Borrow Links (MCPL / Libby)**: Automatically builds deep search links into the **Mid-Continent Public Library (OverDrive/Libby)** catalog for zero-cost Kindle/EPUB borrowing.
3. **Live Open-Access EPUB Discovery (`ebook_scout.py`)**: Queries the **Gutendex (Project Gutenberg)** API in real time for DRM-free classics (*The Time Machine*, *Sherlock Holmes*, *Hercule Poirot*, *Philip K. Dick*) and downloads clean `.epub` files directly.
4. **Mobile Reading Dashboard (`index.html`)**: Zero-dependency dark-mode web UI with instant genre chips and 1-tap acquisition buttons.

## 🚀 Quick Start
```bash
# List all curated crossover picks
python3 ebook_scout.py --genre all

# Filter by Time Travel + query live Gutendex API + test EPUB download
python3 ebook_scout.py --genre time-travel --live-api --download-sample
```
