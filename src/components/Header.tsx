import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () =>{
    const router = useRouter();
    return (
        <nav className="w-full bg-green-300 flex justify-center">
            <div className="w-4/5 flex justify-evenly p-4 text-2xl">
                <Link href='/' className={router.pathname == "/" ? "border-b-2 border-solid border-green-100" : "hover:bg-green-100"}>
                Home
                </Link>
                <Link href='/products' className={router.pathname == "/products" ? "border-b-2 border-solid border-green-100" : "hover:bg-green-100"}>
                    Produkty
                </Link>
                <Link href='/items/page/1' className={router.pathname == "/items/page/1" ? "border-b-2 border-solid border-green-100" : "hover:bg-green-100"}>
                    Items
                </Link>
                <Link href='/about' className={router.pathname == "/about" ? "border-b-2 border-solid border-green-100" : "hover:bg-green-100"}>
                    O nas
                </Link>
            </div>
        </nav>
    )
}