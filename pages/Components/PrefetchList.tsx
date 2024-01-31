export default function PrefetchList() {
    return <>
        <Prefetch href="/static/js/player.js" />
        <Prefetch href="/static/img/repeat-1.svg" />
        <Prefetch href="/static/img/repeat.svg" />
    </>
}

function Prefetch(props: { href: string }) {
    return <link {...props} rel="prefetch" />
}

function Prerender(props: { hrefs: string[] }) {
    const conf = String.raw`{
        "prerender":[
            {
                "source":"list",
                "urls": [${props.hrefs.map(p=>`"${p}"`)}]
            }
        ]
    }`
    return <script type="speculationrules" dangerouslySetInnerHTML={{ __html: conf }}>
    </script >
}