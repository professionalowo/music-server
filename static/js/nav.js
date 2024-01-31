const prerendered = []

function onhover(anchor) {
    const { href } = anchor
    if (!prerendered.includes(href)) {
        const link = document.createElement("link");
        link.setAttribute("href",href);
        link.setAttribute("rel","preload")
        document.head.appendChild(link)
        prerendered.push(href)
    }
}