import threading
import time

import requests

from app.core.config import settings

BASE_URL = "https://api.themoviedb.org/3"

HEADERS = {
    "Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}",
    "accept": "application/json",
}

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


class _TMDBCache:
    def __init__(self, ttl_seconds: int = 300):
        self.ttl_seconds = ttl_seconds
        self._entries = {}
        self._lock = threading.Lock()

    def get(self, key):
        now = time.time()
        with self._lock:
            entry = self._entries.get(key)
            if not entry:
                return None

            if now - entry["timestamp"] > self.ttl_seconds:
                self._entries.pop(key, None)
                return None

            return entry["value"]

    def set(self, key, value):
        with self._lock:
            self._entries[key] = {"value": value, "timestamp": time.time()}


TMDB_CACHE = _TMDBCache()


def _normalize_params(params):
    if not params:
        return ()

    if isinstance(params, dict):
        return tuple(sorted(params.items()))

    return tuple(params.items()) if hasattr(params, "items") else tuple(params)


def tmdb_get(endpoint: str, params=None):
    cache_key = (endpoint, _normalize_params(params))
    cached = TMDB_CACHE.get(cache_key)
    if cached is not None:
        return cached

    url = f"{BASE_URL}/{endpoint}"

    response = SESSION.get(url, params=params, timeout=10)
    response.raise_for_status()

    payload = response.json()
    TMDB_CACHE.set(cache_key, payload)
    return payload