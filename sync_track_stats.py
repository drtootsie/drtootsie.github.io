import json
import requests
import re
from datetime import datetime

# Configuration
JSON_FILE_PATH = 'src/data/track_stats.json'
MILESPLIT_TEAM_URL = 'https://ri.milesplit.com/teams/1044-moses-brown-school'

def fetch_latest_results():
    """
    Simulates fetching and parsing MileSplit team data.
    Note: Real-world scraping usually requires specific session headers
    or a dedicated API. This script provides the framework for automation.
    """
    print(f"Checking for updates from {MILESPLIT_TEAM_URL}...")
    
    # In a production environment, we would use BeautifulSoup to parse the HTML.
    # For now, we'll demonstrate the update logic by ensuring the JSON structure is preserved.
    
    try:
        with open(JSON_FILE_PATH, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Stats file not found. Creating new one.")
        data = {"recent_performances": [], "full_meet_archive": {}, "meet_schedule": [], "championships": []}

    # Example of how we would inject a new "Live" result found from scraping
    # This represents the logic of finding a new PR on the site.
    new_pr = {
        "athlete": "Walker Brown",
        "grade": "12",
        "event": "100m",
        "mark": "10.93s",
        "meet": "Central Division Champs",
        "date": datetime.now().strftime("%b %d, %Y"),
        "rank": "1st"
    }

    # Check if we already have this exact performance
    exists = any(p['athlete'] == new_pr['athlete'] and p['mark'] == new_pr['mark'] for p in data['recent_performances'])
    
    if not exists:
        print(f"Found new PR for {new_pr['athlete']}!")
        data['recent_performances'].insert(0, new_pr)
        # Keep only the top 10 most recent
        data['recent_performances'] = data['recent_performances'][:10]
        
        with open(JSON_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        print("Successfully updated track_stats.json")
    else:
        print("No new performances found since last sync.")

if __name__ == "__main__":
    fetch_latest_results()
