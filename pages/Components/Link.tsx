export function Link(props: Hono.AnchorHTMLAttributes) {
    return <a {...props} onmouseover="onhover(this)" touchstart="onhover(this)"></a>
}

