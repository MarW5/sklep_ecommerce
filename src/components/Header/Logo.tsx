import Image from "next/image";
import logoImg from '../../styles/assets/logo1.png'
import Link from "next/link";
export const Logo = () => {
    const logoUrl = './../styles/assets/logo1.png'
    return (
        <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
                <Image
                    src={logoImg}
                    alt="logo"
                    className="rounded-full h-12 w-auto"
                    width={200}
                    height={200}
                />
        </Link>
    )
}