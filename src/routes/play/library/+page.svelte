<script>
    import { GeneralPage, ObjectList, ObjectListItem } from "$lib/components";
</script>

<GeneralPage>
    <ObjectList title="Library">
        <ObjectListItem uri="/play/library/playlists" label="Playlists" imageSrc="/img/playlist.png" />
        <ObjectListItem uri="/play/library/tracks" label="Liked Tracks" imageSrc="/img/liked-songs-cover.jpg" />
        <ObjectListItem uri="/play/library/artists" label="Artists" imageSrc="" />
        <ObjectListItem uri="/play/library/albums" label="Albums" imageSrc="" />
    </ObjectList>
</GeneralPage>
