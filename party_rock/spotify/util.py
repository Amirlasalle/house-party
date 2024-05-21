from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get


BASE_URL = "https://api.spotify.com/v1/"


def get_user_tokens(session_id):
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    tokens = get_user_tokens(session_id)
    if tokens:
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True

    return False


def refresh_spotify_token(session_id):
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)


# def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False, data=None):
#     tokens = get_user_tokens(session_id)
#     headers = {
#         'Content-Type': 'application/json',
#         'Authorization': "Bearer " + tokens.access_token
#     }

#     if post_:
#         response = post(BASE_URL + endpoint, headers=headers, json=data)
#     elif put_:
#         response = put(BASE_URL + endpoint, headers=headers, json=data)
#     else:
#         response = get(BASE_URL + endpoint, headers=headers)

#     try:
#         return response.json()
#     except ValueError:
#         return {'Error': 'Issue with request'}

def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False, get_=True, data=None):
    tokens = get_user_tokens(session_id)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + tokens.access_token
    }

    if post_:
        response = post(BASE_URL + endpoint, headers=headers, json=data)
    elif put_:
        response = put(BASE_URL + endpoint, headers=headers, json=data)
    elif get_:
        response = get(BASE_URL + endpoint, headers=headers)
    else:
        response = get(BASE_URL + endpoint, headers=headers)

    try:
        return response.json()
    except ValueError:
        return {'Error': 'Issue with request'}


def play_song(session_id):
    return execute_spotify_api_request(session_id, "me/player/play", put_=True)


def pause_song(session_id):
    return execute_spotify_api_request(session_id, "me/player/pause", put_=True)

def prev_song(session_id):
    return execute_spotify_api_request(session_id, "me/player/previous", post_=True)

def skip_song(session_id):
    return execute_spotify_api_request(session_id, "me/player/next", post_=True)

def user_queue(session_id):
    return execute_spotify_api_request(session_id, "me/player/queue", get_=True)


def play_queued_song(session_id, song_id):
    tokens = get_user_tokens(session_id)
    if not tokens:
        return {"error": "No tokens found."}

    endpoint_play = "me/player/play"

    playback_info = execute_spotify_api_request(session_id, "me/player/currently-playing")
    if 'context' in playback_info and playback_info['context']:
        context_uri = playback_info['context']['uri']
        current_queue = execute_spotify_api_request(session_id, "me/player/queue").get('queue', [])
        song_uris = [song['uri'] for song in current_queue]

        if f"spotify:track:{song_id}" in song_uris:
            offset = {'uri': f"spotify:track:{song_id}"}
        else:
            return {"error": "Song not found in the current queue context."}
    else:
        return {"error": "No active context found."}

    play_data = {
        "context_uri": context_uri,
        "offset": offset
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + tokens.access_token
    }

    response = put(BASE_URL + endpoint_play, headers=headers, json=play_data)

    if response.status_code == 204:
        return {"message": "Song is now playing."}
    else:
        return {"error": "Failed to play the song."}


def play_searched_song(session_id, song_id):
    tokens = get_user_tokens(session_id)
    if not tokens:
        return {"error": "No tokens found."}

    endpoint_play = "me/player/play"
    play_data = {
        "uris": [f"spotify:track:{song_id}"]
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + tokens.access_token
    }

    response = put(BASE_URL + endpoint_play, headers=headers, json=play_data)

    if response.status_code == 204:
        return {"message": "Song is now playing."}
    else:
        return {"error": "Failed to play the song."}

