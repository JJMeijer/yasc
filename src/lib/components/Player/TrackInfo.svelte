<script lang="ts">
    import { pageTitleStore, playerStateStore } from "$lib/stores";
    import { getImageBySize, resolveSpotifyUri } from "$lib/utility";
    import Icon from "../Icon.svelte";

    $: trackId = $playerStateStore?.track_window.current_track.id;
    $: trackName = $playerStateStore?.track_window.current_track.name;
    $: artists = $playerStateStore?.track_window.current_track.artists || [];
    $: albumImage = getImageBySize($playerStateStore?.track_window.current_track.album.images || [], 150);
    $: albumLink = resolveSpotifyUri($playerStateStore?.track_window.current_track.album.uri);

    let isLiked = false;
    let iconOnClickClass = "";

    const checkLike = async () => {
        const res = await fetch(`/api/likes?ids=${trackId}`);

        const data = (await res.json()) as boolean[];

        if (typeof data[0] === "boolean") {
            isLiked = data[0];
        }
    };
    $: trackId && checkLike();

    const likeClickAnimation = () => {
        iconOnClickClass = "scale-125"
        setTimeout(() => {
            iconOnClickClass = "";
        }, 200);
    }

    const onLikeClick = async () => {
        likeClickAnimation();
        const res = await fetch(`/api/likes?ids=${trackId}`, {
            method: isLiked ? "DELETE" : "PUT",
        });

        if (res.ok) {
            isLiked = !isLiked;
        }
    };

    $: if (trackName) {
        $pageTitleStore = `YASC - ${trackName} - ${artists.map((a) => a.name).join(", ")}`;
    }
</script>

<div class="contents">
    <a href={albumLink} class="h-full {!albumImage && 'border border-gray-700/50'}">
        {#if albumImage}
            <img src={albumImage} alt="album cover" class="h-full object-cover" />
        {/if}
    </a>
    <div class="flex flex-col">
        <p class="select-none">{trackName || ""}</p>
        <div class="inline">
            {#each artists as artist, index}
                <a
                    href={resolveSpotifyUri(artist.uri)}
                    class="text-sm text-gray-500 hover:text-gray-400 hover:underline underline-offset-2">{artist.name}</a
                >
                {#if index < artists.length - 1}
                    <span class="text-sm text-gray-500 -ml-1">,&nbsp;</span>
                {/if}
            {/each}
        </div>
    </div>
    {#if trackId}
        <Icon
            onClick={onLikeClick}
            name="like"
            class="w-6 h-6 {iconOnClickClass} transition-transform ease-in-out duration-200 {isLiked ? 'text-primary/90 fill-current' : 'text-gray-400 hover:text-primary/90'}"
        />
    {/if}
</div>
