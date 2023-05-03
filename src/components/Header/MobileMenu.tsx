import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';
import { NavLink } from './NavLinks';

interface MobileMenuTypes {
    mobileMenuOpen: boolean,
    setMobileMenuOpen: any,
    linksArray: Array<object>
}

export const MobileMenu = ({mobileMenuOpen, setMobileMenuOpen, linksArray}:MobileMenuTypes) =>{
    return (
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {linksArray.map((item) => (
                    <NavLink key={item.name} href={item.href} name={item.name} classes={"-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"}/>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
    )
}