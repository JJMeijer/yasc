<script lang="ts">
    import { player } from "$lib/stores";
    import { onMount } from "svelte";

    onMount(() => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            player.set(new Spotify.Player({
                name: "YASC",
                getOAuthToken: cb => cb("test"),
                volume: 0.5
            }))
            console.log("ready");
        };

        if (!document.getElementById("spotify-player")) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.id = "spotify-player";
            script.async = true;
            document.body.appendChild(script);
        }
    });
</script>

<div class="min-h-[4.5rem] border-primary border-t-2">{$player?.getCurrentState()}</div>
