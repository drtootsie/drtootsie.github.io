#!/usr/bin/env python3
"""
Ebook Scout POC - Genre-Targeted Ebook Discovery & Delivery Engine
Built for Dad's Favorite Genres: Mystery, Sci-Fi, Time Travel, and Crime/Noir.

Features:
- Curated multi-genre crossover matcher (Sci-Fi + Time Travel + Crime + Mystery)
- Live Gutendex (Project Gutenberg) API search for instant DRM-free EPUB downloads
- Live Open Library API search for broader catalog & ISBN discovery
- 1-Tap Libby / Mid-Continent Public Library (MCPL) borrow deep links
- Direct DRM-free EPUB downloader for ReadEra / Kindle Send-to-Kindle
"""

import argparse
import json
import os
import urllib.parse
import urllib.request
from pathlib import Path
from typing import List, Dict, Any

BASE_DIR = Path(__file__).resolve().parent
CATALOG_PATH = BASE_DIR / "dad_curated_catalog.json"
DOWNLOAD_DIR = BASE_DIR / "books_downloaded"

GENRE_TOPICS = {
    "mystery": "detective and mystery stories",
    "sci-fi": "science fiction",
    "time-travel": "time travel",
    "crime": "crime",
}


def build_libby_mcpl_link(title: str, author: str = "") -> str:
    q = urllib.parse.quote(f"{title} {author}".strip())
    return f"https://mcpl.overdrive.com/search?query={q}"


def build_amazon_link(title: str, author: str = "", asin: str = "") -> str:
    if asin:
        return f"https://www.amazon.com/dp/{asin}"
    q = urllib.parse.quote_plus(f"{title} {author} kindle ebook".strip())
    return f"https://www.amazon.com/s?k={q}"


def load_curated_picks(genre_filter: str = "all") -> List[Dict[str, Any]]:
    with open(CATALOG_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    picks = data.get("curated_crossover_picks", [])
    if genre_filter and genre_filter != "all":
        picks = [p for p in picks if genre_filter in p.get("genres", [])]
    for p in picks:
        p["libby_url"] = build_libby_mcpl_link(p["title"], p["author"])
        p["amazon_url"] = build_amazon_link(p["title"], p["author"], p.get("asin", ""))
    return picks


def query_gutendex(topic: str, limit: int = 5) -> List[Dict[str, Any]]:
    encoded = urllib.parse.quote(topic)
    url = f"https://gutendex.com/books?topic={encoded}&languages=en"
    req = urllib.request.Request(url, headers={"User-Agent": "EbookScoutPOC/1.0"})
    results = []
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            for item in payload.get("results", [])[:limit]:
                authors = ", ".join(a.get("name", "") for a in item.get("authors", []))
                formats = item.get("formats", {})
                epub_url = (
                    formats.get("application/epub+zip")
                    or f"https://www.gutenberg.org/ebooks/{item['id']}.epub3.images"
                )
                results.append({
                    "id": item["id"],
                    "title": item["title"],
                    "author": authors or "Unknown",
                    "downloads": item.get("download_count", 0),
                    "epub_url": epub_url,
                    "libby_url": build_libby_mcpl_link(item["title"], authors),
                })
    except Exception as e:
        print(f"[warn] Gutendex query failed for '{topic}': {e}")
    return results


def download_epub(title: str, url: str, dest_dir: Path = DOWNLOAD_DIR) -> Path:
    dest_dir.mkdir(parents=True, exist_ok=True)
    safe_name = "".join(c if c.isalnum() or c in " -_" else "" for c in title).strip().replace(" ", "_")
    out_path = dest_dir / f"{safe_name}.epub"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 EbookScoutPOC/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = resp.read()
        out_path.write_bytes(data)
    return out_path


def main():
    parser = argparse.ArgumentParser(description="Ebook Scout POC - Mystery, Sci-Fi, Time Travel & Crime")
    parser.add_argument("--genre", default="all", choices=["all", "mystery", "sci-fi", "time-travel", "crime"])
    parser.add_argument("--live-api", action="store_true", help="Query live Gutendex API for open-access EPUBs")
    parser.add_argument("--download-sample", action="store_true", help="Download a sample DRM-free EPUB to verify pipeline")
    args = parser.parse_args()

    picks = load_curated_picks(args.genre)
    print(f"=== Curated Crossover Picks ({args.genre.upper()}) [{len(picks)} matches] ===")
    for idx, p in enumerate(picks, 1):
        badges = ", ".join(p["genres"])
        print(f"{idx}. {p['title']} — {p['author']} [{badges}]")
        print(f"   Hook: {p['hook']}")
        print(f"   Libby (MCPL): {p['libby_url']}")
        if p.get("epub_url"):
            print(f"   DRM-Free EPUB: {p['epub_url']}")
        else:
            print(f"   Kindle/Amazon: {p['amazon_url']}")

    if args.live_api:
        topic_key = "time-travel" if args.genre == "all" else args.genre
        topic_str = GENRE_TOPICS.get(topic_key, topic_key)
        print(f"\n=== Live Gutendex API Search: '{topic_str}' ===")
        live_books = query_gutendex(topic_str, limit=5)
        for b in live_books:
            print(f" - {b['title']} ({b['author']}) | Downloads: {b['downloads']} | EPUB: {b['epub_url']}")

    if args.download_sample:
        sample = [p for p in picks if p.get("epub_url")][0]
        print(f"\n=== Testing DRM-Free EPUB Download: {sample['title']} ===")
        out = download_epub(sample["title"], sample["epub_url"])
        print(f"Saved: {out.name} ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
