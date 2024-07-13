# Yet Another Spotify Client (YASC)

(Desktop) Spotify client with a minimal feature set. Build with [SvelteKit](https://kit.svelte.dev/) using Spotify's [Web API](https://developer.spotify.com/documentation/web-api) & [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk).

## Getting Started

### Prerequisites

1. Create a new app at [developer.spotify.com](https://developer.spotify.com/) to generate your Client ID + Client Secret. When the app is created add `http://localhost:5173/auth` to the redirect uris in the app settings.

2. Add an `.env` file to the root of the project with the following variables:

```env
SPOTIFY_CLIENT_ID=<Your Spotify Client ID>
SPOTIFY_CLIENT_SECRET=<Your Spotify Client Secret>
SPOTIFY_REDIRECT_URI=http://localhost:5173/auth
```

### Installation

```bash
pnpm install
# yarn install
# npm install
```

### Development

```bash
pnpm dev
# yarn dev
# npm run dev
```

at this point the client should be running at [localhost:5173](http://localhost:5173).

With the default development API credentials it will only be possible to login with your own credentials.

## Features

- [X] Authentication
- [X] Playback
- [X] Albums/Artists/Playlists Page
- [X] Library Pages
- [X] Browse/Category Page
- [X] Volume Control
- [X] Progress Bar
- [X] Play/Pause/Next/Previous
- [X] Queue Shuffle
- [X] Queue/Track Repeat
- [X] Search
- [X] Track Likes
- [ ] Track Relinking
- [X] Album Likes
- [X] Artist Likes
- [X] Radio/Recommendations
- [X] Add Track to Playlist
- [X] Remove Track from Playlist
- [X] Create new Playlist
- [X] Follow/Unfollow Playlist
- [X] Delete Playlist
- [ ] Better Search
- [ ] Playback Devices
- [ ] Better Error handling
