import { useRouter } from 'next/router'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const { asPath } = useRouter()
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="relative flex items-center justify-between py-10">
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`p-1 font-medium sm:p-4 dark:hover:text-gray-100 hover:text-gray-900 ${
                    asPath === link.href
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'dark:text-gray-400 text-gray-500'
                  }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <MobileNav />
          </div>
          <ThemeSwitch />
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
