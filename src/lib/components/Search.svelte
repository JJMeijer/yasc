<script lang="ts">
    import SearchResultList from "./SearchResultList.svelte";
    import SearchResultListItem from "./SearchResultListItem.svelte";

    let query = "";
    let timeout: NodeJS.Timeout;
    let focused = false;

    let results: SpotifyApi.SearchResponse;
    $: tracks = results?.tracks?.items || [];
    $: artists = results?.artists?.items || [];
    $: albums = results?.albums?.items || [];
    $: playlists = results?.playlists?.items || [];

    const handleQuery = (query: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            results = (await response.json()) as SpotifyApi.SearchResponse;

            console.log(results);
        }, 500);
    };

    $: query && handleQuery(query);
</script>

<input
    on:focus={() => (focused = true)}
    on:blur={() => (focused = false)}
    bind:value={query}
    class="w-64 rounded-full border-2 border-gray-800 bg-gray-950 px-3 py-1.5 text-gray-400 outline-none placeholder:text-gray-700 focus:bg-gray-900 focus:placeholder:text-gray-500"
    type="text"
    placeholder="Search"
/>

{#if results && focused}
    <div
        class="bg-transparant absolute left-0 top-14 z-20 flex h-[calc(100%-3.5rem)] w-full justify-end px-4 py-1 backdrop-blur-sm"
    >
        <div
            class="custom-scrollbar flex h-full w-1/2 flex-col gap-8 overflow-y-auto rounded-lg border-2 border-gray-800 bg-gray-900 p-4"
        >
            <div class="flex flex-row gap-4">
                <SearchResultList title="Tracks">
                    {#each tracks.slice(0, 4) as track}
                        <SearchResultListItem
                            images={track.album.images}
                            label={track.name}
                            subLabel={track.artists.map((a) => a.name).join(",")}
                        />
                    {/each}
                </SearchResultList>

                <SearchResultList title="Artists">
                    {#each artists.slice(0, 4) as artist}
                        <SearchResultListItem images={artist.images} label={artist.name} />
                    {/each}
                </SearchResultList>
            </div>

            <div class="flex flex-row gap-4">
                <SearchResultList title="Albums">
                    {#each albums.slice(0, 4) as album}
                        <SearchResultListItem
                            images={album.images}
                            label={album.name}
                            subLabel={album.artists.map((a) => a.name).join(",")}
                        />
                    {/each}
                </SearchResultList>

                <SearchResultList title="Playlists">
                    {#each playlists.slice(0, 4) as playlist}
                        <SearchResultListItem images={playlist.images} label={playlist.name} />
                    {/each}
                </SearchResultList>
            </div>
        </div>
    </div>
{/if}
