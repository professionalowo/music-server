export default function PrefetchList() {
    return <>
        <Prefetch href="/static/js/player.js" as="script" />
        <Prefetch href="/static/img/repeat-1.svg" as="image" />
        <Prefetch href="/static/img/repeat.svg" as="image" />
    </>
}

function Prefetch(props: { href: string, as?: "script" | "style" | "image" }) {
    return <link {...props} rel="prefetch" />
}

function Prerender(props: { hrefs: string[] }) {
    const conf = String.raw`{
        "prerender":[
            {
                "source":"list",
                "urls": [${props.hrefs.map(p => `"${p}"`)}]
            }
        ]
    }`
    return <script type="speculationrules" dangerouslySetInnerHTML={{ __html: conf }}>
    </script >
}