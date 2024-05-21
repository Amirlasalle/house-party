from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause', PauseSong.as_view()),
    path('play', PlaySong.as_view()),
    path('prev', PrevSong.as_view()),
    path('skip', SkipSong.as_view()),
    path('queue', GetUserQueue.as_view()),
    path('current-artist', CurrentArtist.as_view()),
    path('play-queued-song', PlayQueuedSong.as_view()),
    path('play-searched-song', PlaySearchedSong.as_view()),
    path('search', SearchSong.as_view()),
    path('followed-artists', FollowedArtists.as_view()),
]