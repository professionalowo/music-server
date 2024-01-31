import { Link } from "@p/Components/Link"

export const Navbar = () => {
    return <ol class="bg-slate-700 shadow shadow-md w-full flex gap-3 p-3 justify-center">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/music">Available</Link></li>
        <li><Link href="/library">Library</Link></li>
        <li><Link href="/admin">Admin</Link></li>
    </ol>
}