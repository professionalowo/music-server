import { useRequestContext } from "hono/jsx-renderer"

export function Audio({
    src,
    type,
    ...props
}: Hono.AudioHTMLAttributes) {
    const { req } = useRequestContext();
    const headers = req.header("User-Agent")?.split(" ")
    if (headers && headers.find(h => h.toLowerCase().includes("firefox"))) {
        return <p>Firefox is currently not supported</p>
    }

    return <audio {...props} controlslist="nodownload">
        <source src={src} type={type}></source>
        Your browser doesn't support the audio tag
    </audio>
}