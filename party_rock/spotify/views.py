from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import *
from api.models import Room
from .models import Vote


# Create your views here.
class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()


    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:')

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)
    
class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        host = room.host
        endpoint = "me/player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)
        
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)

        item = response.get('item')
        duration = item.get('duration_ms')
        progress = response.get('progress_ms')
        album_cover = item.get('album').get('images')[0].get('url')
        artist_playlist = item.get('playlist')
        full_album = item.get('album')
        is_playing = response.get('is_playing')
        song_id = item.get('id')


        artist_string = ""

        for i, artist in enumerate(item.get('artists')):
            if i > 0:
                artist_string += ", "
            name = artist.get('name')
            artist_string += name
        
        votes = len(Vote.objects.filter(room=room, song_id=song_id))

        song = {
            'title': item.get('name'),
            'artist': artist_string,
            'duration': duration,
            'time': progress,
            'image_url': album_cover,
            'is_playing': is_playing,
            'playlist': artist_playlist,
            'album': full_album,
            'votes': votes,
            'votes_required': room.votes_to_skip,
            'id': song_id
        }

        self.update_room_song(room, song_id)

        return Response(song, status=status.HTTP_200_OK)
    

    def update_room_song(self, room, song_id):
        current_song = room.current_song

        if current_song != song_id:
            room.current_song = song_id
            room.save(update_fields=['current_song'])
            votes = Vote.objects.filter(room=room).delete()


class PauseSong(APIView):
    def put(self, response, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        if self.request.session.session_key == room.host or room.guest_can_pause:
            pause_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({}, status=status.HTTP_403_FORBIDDEN)
    

class PlaySong(APIView):
    def put(self, response, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        if self.request.session.session_key == room.host or room.guest_can_pause:
            play_song(room.host)
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        return Response({}, status=status.HTTP_403_FORBIDDEN)
    
class PrevSong(APIView):
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        votes = Vote.objects.filter(room=room, song_id=room.current_song)
        votes_needed = room.votes_to_skip



        if self.request.session.session_key == room.host or len(votes) + 1 >= votes_needed:
            votes.delete()
            prev_song(room.host)
        else:
            vote = Vote(user=self.request.session.session_key, room=room, song_id=room.current_song)
            vote.save()

        
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class SkipSong(APIView):
    def post(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)[0]
        votes = Vote.objects.filter(room=room, song_id=room.current_song)
        votes_needed = room.votes_to_skip



        if self.request.session.session_key == room.host or len(votes) + 1 >= votes_needed:
            votes.delete()
            skip_song(room.host)
        else:
            vote = Vote(user=self.request.session.session_key, room=room, song_id=room.current_song)
            vote.save()

        
        return Response({}, status=status.HTTP_204_NO_CONTENT)
    

class GetUserQueue(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code).first()
        
        if not room:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
        
        host = room.host
        endpoint = "me/player/queue"
        response = execute_spotify_api_request(host, endpoint)
        
        if 'error' in response or 'queue' not in response:
            return Response({'error': 'Failed to fetch queue'}, status=status.HTTP_204_NO_CONTENT)
        
        currently_playing = response.get('currently_playing')
        queue = response.get('queue')

        if currently_playing:
          
            pass

        if queue:
         
            queue_data = []
            for item in queue:
             
                name = item.get('name')
                artist_string = ", ".join(artist.get('name') for artist in item.get('artists'))
                duration = item.get('duration_ms')
                album_cover = item.get('album').get('images')[0].get('url')
                is_playing = item.get('is_playing')
                song_id = item.get('id')
                votes = Vote.objects.filter(room=room, song_id=song_id).count()
                
             
                queue_data.append({
                    'name': name,
                    'artist': artist_string,
                    'duration': duration,
                    'image_url': album_cover,
                    'is_playing': is_playing,
                    'votes': votes,
                    'id': song_id
                })

            return Response(queue_data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Queue is empty'}, status=status.HTTP_204_NO_CONTENT)
        

class CurrentArtist(APIView):
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code).first()
        
        if not room:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
        
        host = room.host
        endpoint = "me/player/currently-playing"
        response = execute_spotify_api_request(host, endpoint)
        
        if 'error' in response or 'item' not in response:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        
        artist_info = []
        for artist in response['item']['artists']:
            artist_id = artist['id']
            artist_endpoint = f"artists/{artist_id}"
            artist_response = execute_spotify_api_request(host, artist_endpoint)
            if 'error' not in artist_response:
                artist_data = {
                    'name': artist_response['name'],
                    'followers': artist_response['followers']['total'],
                    'popularity': artist_response['popularity'], 
                    'type': artist_response['type'],  
                    'uri': artist_response['uri'],
                    'href': f"https://api.spotify.com/v1/artists/{artist_id}" 
                }
         
                if artist_response['images']:
                  
                    image_url = artist_response['images'][0]['url']
                    artist_data['image_url'] = image_url
                else:
                    artist_data['image_url'] = None  
                artist_info.append(artist_data)
        
        return Response(artist_info, status=status.HTTP_200_OK)
    
class SearchSong(APIView):
    def get(self, request, format=None):
        query = request.GET.get('query')
        if not query:
            return Response({'error': 'No query parameter provided'}, status=status.HTTP_400_BAD_REQUEST)
        

        room_code = request.session.get('room_code')
        room = Room.objects.filter(code=room_code).first()

        if not room:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)
  
        host = room.host

        endpoint = f"search?q={query}&type=track"

        response = execute_spotify_api_request(host, endpoint)

        if 'error' in response:
            return Response({'error': 'Failed to search for songs'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
     
        search_results = []
        tracks = response.get('tracks', {}).get('items', [])
        for track in tracks:
            name = track.get('name')
            artists = ", ".join(artist.get('name') for artist in track.get('artists', []))
            duration = track.get('duration_ms')
            album_cover = track.get('album', {}).get('images', [{}])[0].get('url')
            song_id = track.get('id')
            search_results.append({
                'name': name,
                'artist': artists,
                'duration': duration,
                'image_url': album_cover,
                'id': song_id
            })

        return Response({'songs': search_results}, status=status.HTTP_200_OK)


