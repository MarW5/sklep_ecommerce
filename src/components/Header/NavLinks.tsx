import Link from 'next/link';
export interface NavLinkTypes {
    href: string,
    name:string,
    classes: string
}
export const NavLink = ({href, name, classes}:NavLinkTypes)=>{
    return (
        <Link className={classes} href={href}>{name}</Link>
    )
}