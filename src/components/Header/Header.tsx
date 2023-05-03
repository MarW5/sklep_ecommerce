import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useRouter } from "next/router";
import { NavLink } from './NavLinks';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Cart } from '../Cart/Cart';
const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Products', href: '/products', current: false },
    { name: 'About', href: '/about', current: false },
  ]

export const Header = ()=> {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter();
    
  return (
      <header className={router.pathname == "/" ? "absolute inset-x-0 top-0 z-50" : "relative"} >
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
           <Logo />
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item, index) => (
              <NavLink key={`${item}_${index}`} href={item.href} name= {item.name} classes={'text-sm font-semibold leading-6 text-gray-900'}/>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Cart />
          </div>
        </nav>
        <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} linksArray= {navigation}/>
      </header>
  )
}



