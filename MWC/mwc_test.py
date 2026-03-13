import requests
import json

# ─────────────────────────────────────────────
# CONFIG — update these as needed
# ─────────────────────────────────────────────

# Paste a fresh JWT token here if the one below has expired
JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2IiwianRpIjoiNmM2YjYyZDhjYmZlMDZjNWMwN2E0ODRhZDA2MTIxYzQyYjUwZTQ5MDVhMjZkZWNmMGVhM2RjZjZhYWFmYjFhMDFlYjJjNTJjNjU2MGQ0ZWMiLCJpYXQiOjE3NzI4NDIxNzUuNzUxMTc4LCJuYmYiOjE3NzI4NDIxNzUuNzUxMTgxLCJleHAiOjE3NzI4ODUzNzUuNzQyNjMsInN1YiI6IjExODkxODEiLCJzY29wZXMiOltdfQ.m4dE6Zd8fBVV3PE6R_ThMkx0FGorT0oLkPNj0NIPTJ8BXDbf90h9NzvvKpvFBpqO3yW0U34ptMZuK-7GtXZ_IrWSpju2i3VpQsw_EXNMqjjK6XdRlTeT-fU7pAbkrO82Z8wJ-5S_E9ufb0DpY7TJtEeVisxewpHYHzs6NpHBHuoAfWmrlGDTlrOI0bLWyIVx6W3Zly-unE8sB8xMTQEVSVSZ4no-7KsNiUkFPeNjHj7LGKf7y3P2loNi0lR3ztnPhbtbg41XBygRgzM8FMuGXMKuNAKjEfYYy2X7bJTs9fFgxOO_1l3N-5pyJb3DgbfxXMVEXScyGzYEw6jngrG0yUGP0w4ncpcTPsTBUZ_0DzKFUYZdTmBV-UXcoIHAhmQDLC2F-_7xGzTi0hMj89YID2vJdhmBsVeePHUgSkApnd-mREPdggwPLQniAUX1q9n0-FTsvvf0v5vTWO4XRCWraANVsECkPot29yx_M_LLMZE9alc3lx4IBy_VHYQWwrlrVEitDvFmXbnvvWw-JT5ZkRpTolR95846CfogfwwCw-fie_VwPOBwqCgRfeRO9j2Mj25m-J6_9ez9YdX6cMdj8nWpS0U6j6kiwTz-8rl5v3fXUdAA5VsGuc1rV5xhrz0R5wO0VCo6yoB90SLzL-ec5FR6W4cjwcPI9Nx-WdUU3g"

URL = "https://bonacms-api.firabarcelona.com/profile/v1/gsmawebteam/28/search"

HEADERS = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "device-id": "generic_device",
    "jemex-authorization": JWT_TOKEN,
    "origin": "https://www.mwcbarcelona.com",
    "referer": "https://www.mwcbarcelona.com/mymwc/search",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36",
}

# ─────────────────────────────────────────────
# TEST: Fetch a single page (page 1)
# ─────────────────────────────────────────────

payload = {
    "random": False,
    "keyword": "",
    "page": 1,
    "filterExclusiveInterests": ["843"],
    "filterEventRegister": [28]
}

print("=" * 60)
print("MWC Barcelona API — Test Request")
print("=" * 60)
print(f"URL    : {URL}")
print(f"Payload: {json.dumps(payload, indent=2)}")
print()

try:
    response = requests.post(URL, headers=HEADERS, json=payload, timeout=15)

    print(f"Status Code : {response.status_code}")
    print(f"Response Size: {len(response.content)} bytes")
    print()

    if response.status_code == 200:
        data = response.json()
        print(f"success    : {data.get('success')}")
        print(f"elements   : {data.get('elements')}  ← total people matching filter")
        print(f"timestamp  : {data.get('timestamp')}")

        results = data.get("responseData", {}).get("result", [])
        print(f"Records on this page: {len(results)}")
        print()

        if results:
            print("─" * 60)
            print("FIRST PERSON (sample):")
            print("─" * 60)
            first = results[0]
            print(json.dumps(first, indent=2))

            print()
            print("─" * 60)
            print(f"ALL {len(results)} PEOPLE — quick summary:")
            print("─" * 60)
            for p in results:
                name = f"{p.get('firstName', '')} {p.get('lastName', '')}".strip()
                title = p.get('jobTitle', 'N/A')
                company = p.get('companyName', 'N/A')
                town = p.get('town', 'N/A')
                print(f"  • {name:<30} | {title:<35} | {company:<30} | {town}")

    elif response.status_code == 401:
        print("❌ 401 Unauthorized — JWT token has likely expired.")
        print("   You need to log in and get a fresh token.")
        print(f"   Raw response: {response.text[:500]}")
    else:
        print(f"❌ Unexpected status: {response.status_code}")
        print(f"   Raw response: {response.text[:500]}")

except requests.exceptions.ConnectionError:
    print("❌ Connection error — check your internet connection.")
except requests.exceptions.Timeout:
    print("❌ Request timed out.")
except Exception as e:
    print(f"❌ Error: {e}")