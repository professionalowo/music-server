export function Audio({
    src,
    type,
    ...props
}: Hono.AudioHTMLAttributes) {
    return <audio {...props} controlslist="nodownload">
        <source src={src} type={type}></source>
        Your browser doesn't support the audio tag
    </audio>
}