import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import re

# Configuration
JSON_FILE_PATH = 'src/data/track_stats.json'
# The user confirmed ID 14717 is the correct one for Moses Brown School in PVD.
MILESPLIT_TEAM_URL = 'https://ri.milesplit.com/teams/14717-moses-brown-school/results'

def fetch_latest_results():
    """
    Fetches and parses real MileSplit team results.
    """
    print(f"Fetching updates from {MILESPLIT_TEAM_URL}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
    }
    
    try:
        response = requests.get(MILESPLIT_TEAM_URL, headers=headers, timeout=20)
        response.raise_for_status()
    except Exception as e:
        print(f"Error fetching MileSplit: {e}")
        return

    soup = BeautifulSoup(response.content, 'html.parser')
    
    try:
        with open(JSON_FILE_PATH, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Stats file not found. Creating new one.")
        data = {"recent_performances": [], "full_meet_archive": {}, "meet_schedule": [], "championships": []}

    results_found = False
    
    # Method 1: Look for JSON in window.initialState (Common for MileSplit/FloSports)
    scripts = soup.find_all('script')
    for script in scripts:
        if script.string and 'window.initialState' in script.string:
            try:
                # Find the JSON blob inside the script
                json_match = re.search(r'window\.initialState\s+=\s+(\{.*?\});', script.string, re.DOTALL)
                if json_match:
                    state_json = json_match.group(1)
                    state = json.loads(state_json)
                    
                    # Navigate to results (structure varies, but usually under team results)
                    # We'll look for anything that looks like a result list
                    def find_results_in_dict(obj):
                        if isinstance(obj, list):
                            for item in obj:
                                if isinstance(item, dict) and 'athleteName' in item and 'mark' in item:
                                    yield item
                        elif isinstance(obj, dict):
                            for v in obj.values():
                                yield from find_results_in_dict(v)

                    for item in find_results_in_dict(state):
                        res = {
                            "athlete": item.get('athleteName'),
                            "grade": str(item.get('grade', '')),
                            "event": item.get('eventName'),
                            "mark": item.get('mark'),
                            "meet": item.get('meetName'),
                            "date": item.get('date') or datetime.now().strftime("%b %d, %Y"),
                            "rank": item.get('place', 'N/A')
                        }
                        # Deduplicate and add
                        if res['athlete'] and res['mark']:
                            exists = any(p['athlete'] == res['athlete'] and p['mark'] == res['mark'] for p in data['recent_performances'])
                            if not exists:
                                print(f"Found result for {res['athlete']} in state.")
                                data['recent_performances'].insert(0, res)
                                results_found = True
            except Exception as e:
                print(f"Error parsing initialState: {e}")

    # Method 2: Standard HTML Tables
    if not results_found:
        tables = soup.find_all('table')
        for table in tables:
            headers_text = [th.get_text().strip().lower() for th in table.find_all('th')]
            if any(h in headers_text for h in ['athlete', 'event', 'mark']):
                rows = table.find_all('tr')[1:]
                for row in rows:
                    cols = [td.get_text(strip=True) for td in row.find_all('td')]
                    if len(cols) >= 3:
                        # Map columns based on headers if possible, else guess
                        res = {
                            "athlete": cols[0],
                            "event": cols[1],
                            "mark": cols[2],
                            "meet": cols[3] if len(cols) > 3 else "Unknown",
                            "date": datetime.now().strftime("%b %d, %Y"),
                            "rank": cols[4] if len(cols) > 4 else "N/A"
                        }
                        exists = any(p['athlete'] == res['athlete'] and p['mark'] == res['mark'] for p in data['recent_performances'])
                        if not exists:
                            print(f"Scraped table result for {res['athlete']}.")
                            data['recent_performances'].insert(0, res)
                            results_found = True

    if results_found:
        # Sort by date if possible (though date format varies)
        # Keep top 15
        data['recent_performances'] = data['recent_performances'][:15]
        
        with open(JSON_FILE_PATH, 'w') as f:
            json.dump(data, f, indent=2)
        print("Successfully updated track_stats.json")
    else:
        print("No new results found or MileSplit layout blocked automated fetch.")
        print("Tip: If automated sync fails, check if MileSplit has updated their anti-bot measures.")

if __name__ == "__main__":
    fetch_latest_results()
