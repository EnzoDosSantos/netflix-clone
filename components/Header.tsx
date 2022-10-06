import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SearchIcon, BellIcon } from '@heroicons/react/solid'

function Header() {
    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScroll(true)
            } else {
                setIsScroll(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className={`${isScroll && "bg-[#141414]"}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/logo.svg"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    alt="Netflix Logo"
                />

                <ul className="hidden space-x-4 md:flex">
                    <li className="headerLink">Home</li>
                    <li className="headerLink">TV Show</li>
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & popular</li>
                    <li className="headerLink">My list</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 text-sm font-light">
                <SearchIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
                {/* <p className="hidden lg:inline">Kids</p> */}
                <BellIcon className="cursor-pointer h-6 w-6" />
                <Link href="/account">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/avatar.png"
                        width={100}
                        height={100}
                        className="cursor-pointer rounded h-6 w-6"
                        alt="Profile Logo"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header