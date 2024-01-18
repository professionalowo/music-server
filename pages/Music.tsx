export const Music = ({ availableSongs }: { availableSongs: string[] }) => {
    return <ul class="flex flex-col gap-4">
        {availableSongs.map(song => <li><a href={`/music/${song}`}>{song}</a></li>)}
    </ul>

}