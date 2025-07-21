import requests
import json
import os
import time
from functools import partial

BASE_URL = "https://www.thebluealliance.com/api/v3"

def make_headers(api_key):
    return {
        "X-TBA-Auth-Key": api_key
    }

def fetch(url, headers):
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Request failed for {url}: {e}")
        return []

def fetch_event_keys(year, headers):
    return fetch(f"{BASE_URL}/events/{year}/keys", headers)

def fetch_event_matches(event_key, headers):
    return fetch(f"{BASE_URL}/event/{event_key}/matches", headers)

def fetch_year_matches(year, headers):
    print(f"\nFetching events for year {year}...")
    event_keys = fetch_event_keys(year, headers)
    fetch_matches = partial(fetch_event_matches, headers=headers)
    
    def get_event_data(event_key):
        matches = fetch_matches(event_key)
        print(f"  - Fetched {len(matches)} matches for event: {event_key}")
        return {event_key: matches}

    return list(map(get_event_data, event_keys))

def save_year_matches_to_file(year, matches_by_event, output_dir="elliot/data/match_based_data"):
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, f"{year}_matches.json")
    
    combined = {}
    for event_data in matches_by_event:
        combined.update(event_data)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(combined, f, indent=2)
    
    print(f"Saved {year} matches to {output_path}")

def main(api_key, start_year=2002, end_year=2025):
    headers = make_headers(api_key)
    for year in range(start_year, end_year + 1):
        year_data = fetch_year_matches(year, headers)
        save_year_matches_to_file(year, year_data)
        time.sleep(0.5)  # Sleep to avoid rate limiting

if __name__ == "__main__":
    API_KEY = "z7hA9jVvr9Tus7NFl9kC3mwV8w6pLkeKcSgYWY9TiLOtuREwIdpGARvLPzrJwXX3"  # Replace with your actual TBA API key
    main(API_KEY)
