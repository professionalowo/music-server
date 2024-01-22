export function Audio({ src, type, ...props }: Hono.AudioHTMLAttributes) {
    return <audio {...props}>
        <source src={src} type={type}></source>
    </audio>
}