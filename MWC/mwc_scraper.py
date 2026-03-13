import requests
import json
import csv
import time
import random
from datetime import datetime

# ─────────────────────────────────────────────
# CONFIG — only edit these values
# ─────────────────────────────────────────────

LOGIN_URL    = "https://mwc-login-api.firabarcelona.com/user/v1/gsmawebteam/28/login"
SEARCH_URL   = "https://bonacms-api.firabarcelona.com/profile/v1/gsmawebteam/28/search"
INTEREST_FILE = "interest.json"  # local file — no HTTP request needed

CREDENTIALS = {
    "type": "UP",
    "user": "al@cellsat.one",
    "password": "Weolcanert9-",
    "deviceMetadata": {
        "bonaEventId": 28,
        "deviceId": "generic_device",
        "deviceType": "Browser"
    }
}

BASE_HEADERS = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "device-id": "generic_device",
    "origin": "https://www.mwcbarcelona.com",
    "referer": "https://www.mwcbarcelona.com/mymwc/search",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
}

SEARCH_PAYLOAD_TEMPLATE = {"random":False,"keyword":"b","filterExclusiveInterests":[],"filterEventRegister":[28]}

# ── UPDATE THESE EACH RUN ────────────────────
START_PAGE     = 100   # ← update this manually each run (249, 349, 449, ...)
MAX_PAGES      = 100   # pages to fetch per run — do not change
# ────────────────────────────────────────────

OUTPUT_CSV      = "mwc_attendees.csv"
OUTPUT_JSON     = "mwc_attendees.json"   # existing data to append to
CHECKPOINT_FILE = "mwc_checkpoint.json"

# ── Rate limit: be very conservative ────────
PAGE_DELAY_MIN  = 4.0   # minimum seconds between pages
PAGE_DELAY_MAX  = 7.0   # maximum seconds between pages (random in this range)
BURST_EVERY     = 20    # pause every N pages
BURST_PAUSE_MIN = 60    # minimum burst pause seconds
BURST_PAUSE_MAX = 90    # maximum burst pause seconds
RETRY_DELAYS    = [90, 180]  # wait on 429 before retrying


# ─────────────────────────────────────────────
# STEP 1: LOGIN
# ─────────────────────────────────────────────

def login():
    print("🔐 Logging in...")
    resp = requests.post(LOGIN_URL, headers={
        "content-type": "application/json",
        "origin": "https://www.mwcbarcelona.com",
        "referer": "https://www.mwcbarcelona.com/mymwc?next=https%3A%2F%2Fwww.mwcbarcelona.com%2Fmymwc%2Fhome",
        "user-agent": BASE_HEADERS["user-agent"],
    }, json=CREDENTIALS, timeout=15)

    if resp.status_code != 200:
        print(f"❌ Login failed: {resp.status_code} — {resp.text[:300]}")
        raise SystemExit(1)

    token = resp.json()["responseData"]["tokenAuth"]["access_token"]
    print(f"✅ Logged in. Token acquired ({len(token)} chars)")
    return token


# ─────────────────────────────────────────────
# STEP 2: FETCH ONE PAGE (with retry)
# ─────────────────────────────────────────────

def fetch_page(token, page_number):
    headers = {**BASE_HEADERS, "jemex-authorization": token}
    payload = {**SEARCH_PAYLOAD_TEMPLATE, "page": page_number}

    for i, wait in enumerate([0] + RETRY_DELAYS):
        if wait > 0:
            print(f"   ⏳ Rate limited — waiting {wait}s before retry {i}/{len(RETRY_DELAYS)}...")
            time.sleep(wait)

        try:
            resp = requests.post(SEARCH_URL, headers=headers, json=payload, timeout=20)
        except requests.exceptions.RequestException as e:
            print(f"   ⚠️  Network error: {e} — waiting 15s...")
            time.sleep(15)
            continue

        if resp.status_code == 200:
            data = resp.json()
            return data.get("responseData", {}).get("result", []), data.get("elements", 0)

        if resp.status_code == 401:
            print("❌ 401 — token expired.")
            raise SystemExit(1)

        if resp.status_code == 429:
            body = resp.text
            if "temporarily blocked" in body or "permanently" in body.lower():
                print(f"🚨 ACCOUNT BLOCKED — stopping immediately. Body: {body}")
                raise SystemExit(1)
            if i < len(RETRY_DELAYS):
                continue
            print(f"   ❌ Rate limited after all retries. Stopping to protect account.")
            return None, 0

        print(f"❌ Unexpected {resp.status_code} on page {page_number}: {resp.text[:150]}")
        return None, 0

    return None, 0


# ─────────────────────────────────────────────
# STEP 3: LOAD EXISTING DATA
# ─────────────────────────────────────────────

def load_existing():
    if START_PAGE == 1:
        return []
    try:
        with open(OUTPUT_JSON, "r", encoding="utf-8") as f:
            data = json.load(f)
        print(f"📂 Loaded {len(data)} existing records from {OUTPUT_JSON}")
        return data
    except FileNotFoundError:
        print(f"⚠️  {OUTPUT_JSON} not found — starting fresh.")
        return []


# ─────────────────────────────────────────────
# STEP 4: SCRAPE UP TO MAX_PAGES
# ─────────────────────────────────────────────

def scrape(token):
    all_people      = load_existing()
    end_page        = START_PAGE + MAX_PAGES - 1
    pages_fetched   = 0

    print(f"\n📡 This run: pages {START_PAGE} → {end_page} (max {MAX_PAGES} pages)")
    print(f"   Delay: {PAGE_DELAY_MIN}–{PAGE_DELAY_MAX}s per page")
    print(f"   Burst pause: {BURST_PAUSE_MIN}–{BURST_PAUSE_MAX}s every {BURST_EVERY} pages\n")

    for page in range(START_PAGE, end_page + 1):

        # Burst pause every BURST_EVERY pages (not on first page)
        if pages_fetched > 0 and pages_fetched % BURST_EVERY == 0:
            pause = random.uniform(BURST_PAUSE_MIN, BURST_PAUSE_MAX)
            print(f"\n   😴 Burst pause — resting {pause:.0f}s after {pages_fetched} pages...\n")
            time.sleep(pause)

        results, _ = fetch_page(token, page)

        if results is None:
            print(f"\n⛔ Stopping at page {page} to protect account.")
            print(f"   Next run: set START_PAGE = {page}")
            break

        if len(results) == 0:
            print(f"   Page {page} — empty. No more data.")
            print(f"   ✅ All attendees have been collected!")
            break

        all_people.extend(results)
        pages_fetched += 1
        print(f"   Page {page} ✅ ({len(results)} records) — total: {len(all_people)}  [{pages_fetched}/{MAX_PAGES} this run]")

        # Save checkpoint
        with open(CHECKPOINT_FILE, "w") as f:
            json.dump({"last_completed_page": page, "next_start_page": page + 1, "total_collected": len(all_people)}, f, indent=2)

        if len(results) < 20:
            print(f"   Last page reached (partial). All done!")
            break

        if pages_fetched >= MAX_PAGES:
            next_page = page + 1
            print(f"\n🛑 Reached {MAX_PAGES} page limit for this run.")
            print(f"   ➡️  Next run: set START_PAGE = {next_page}")
            break

        # Random delay between pages
        delay = random.uniform(PAGE_DELAY_MIN, PAGE_DELAY_MAX)
        time.sleep(delay)

    return all_people


# ─────────────────────────────────────────────
# STEP 5: LOAD INTEREST NAMES FROM LOCAL FILE
# ─────────────────────────────────────────────

def fetch_interest_map(all_people=None):
    """Load interest ID → name map from local interest.json (no HTTP requests)."""
    try:
        with open(INTEREST_FILE, "r", encoding="utf-8") as f:
            raw = json.load(f)
        # Format: { "843": { "id": 843, "name": "5G / 6G", ... }, ... }
        interest_map = {str(k): v["name"].title() for k, v in raw.items()}
        print(f"\n🏷️  Loaded {len(interest_map)} interest names from {INTEREST_FILE}")
        return interest_map
    except FileNotFoundError:
        print(f"⚠️  {INTEREST_FILE} not found — interest IDs will be used as-is.")
        return {}
    except Exception as e:
        print(f"⚠️  Failed to load interest file: {e} — IDs will be used as-is.")
        return {}


# ─────────────────────────────────────────────
# STEP 6: FLATTEN FOR CSV
# ─────────────────────────────────────────────

def flatten_person(p, interest_map):
    interests_str = " | ".join(
        interest_map.get(str(i.get("relatedId", "")), str(i.get("relatedId", "")))
        for i in p.get("interests", [])
        if i.get("relatedId")
    )
    flag_events = ", ".join(f.get("eventName", "") for f in p.get("flagAttendances", []))

    return {
        "id":                p.get("id"),
        "userId":            p.get("userId"),
        "firstName":         p.get("firstName", ""),
        "lastName":          p.get("lastName", ""),
        "fullName":          f"{p.get('firstName','')} {p.get('lastName','')}".strip(),
        "gender":            p.get("gender", ""),
        "emailAddress":      p.get("emailAddress", ""),
        "jobTitle":          p.get("jobTitle", ""),
        "companyName":       p.get("companyName", ""),
        "companyWebsite":    p.get("companyWebsite", ""),
        "town":              p.get("town", ""),
        "countryId":         p.get("countryId", ""),
        "biography":         p.get("biography", ""),
        "twitter":           p.get("twitter", ""),
        "photoUrl":          p.get("photoUrl", ""),
        "profileUrl":        p.get("profileUrl", ""),
        "followers":         p.get("followers", 0),
        "networkingEnabled": p.get("networkingEnabled", False),
        "recommendable":     p.get("recommendable", False),
        "interests":         interests_str,
        "flagAttendances":   flag_events,
        "createdDate":       datetime.fromtimestamp(p["createdDate"] / 1000).strftime("%Y-%m-%d") if p.get("createdDate") else "",
        "modifiedDate":      datetime.fromtimestamp(p["modifiedDate"] / 1000).strftime("%Y-%m-%d") if p.get("modifiedDate") else "",
    }


# ─────────────────────────────────────────────
# STEP 7: EXPORT
# ─────────────────────────────────────────────

def export_csv(people, interest_map, filename):
    if not people:
        return
    flat = [flatten_person(p, interest_map) for p in people]
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(flat[0].keys()))
        writer.writeheader()
        writer.writerows(flat)
    print(f"💾 CSV  saved → {filename}  ({len(flat)} rows)")

def export_json(people, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(people, f, indent=2, ensure_ascii=False)
    print(f"💾 JSON saved → {filename}  ({len(people)} records)")


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────

if __name__ == "__main__":
    print(f"{'='*55}")
    print(f"  MWC Scraper — Run starting at page {START_PAGE}")
    print(f"  Will fetch up to {MAX_PAGES} pages then stop.")
    print(f"{'='*55}\n")

    token  = login()
    people = scrape(token)

    if people:
        interest_map = fetch_interest_map(people)
        export_csv(people,  interest_map, OUTPUT_CSV)
        export_json(people, OUTPUT_JSON)
        print(f"\n✅ Run complete. {len(people)} total records saved.")
    else:
        print("\n❌ No data collected.")