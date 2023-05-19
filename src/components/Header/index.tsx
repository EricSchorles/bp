'use client';

import {
    useCallback,
    useEffect,
    useState
} from 'react';

import { Bell } from 'phosphor-react';
import Dropdown from '@components/Dropdown';
import Link from 'next/link';
import Toggle from '@components/Toggle';
import cx from 'classnames';

export const Header = () => {

    const [open, setIsOpen] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                // if scroll down hide the navbar
                setIsOpen(false);
            } else {
                // if scroll up show the navbar
                setIsOpen(true);
            }
            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [controlNavbar]);

    return (
        open ?
            <header className={cx(
                "w-screen flex flex-row justify-between px-10 items-center py-3 z-10 fixed ",
                open && "backdrop-blur-md shadow-xl animate-[slideTop_0.2s_ease-in-out]",
                lastScrollY <= 5 && "shadow-none"
            )
            }>
                < Link href="/">
                    <span className="text-tertiary text-2xl font-bold">
                        <span className="text-tertiary">{"<"}</span>
                        {" "}
                        <span className="text-tertiary">{"L"}</span>
                        <span className="text-tertiary">{"o"}</span>
                        <span className="text-tertiary">{"g"}</span>
                        <span className="text-tertiary">{"o"}</span>
                        <span className="text-tertiary">{"/>"}</span>
                    </span>
                </Link >
                <div className=" flex flex-row items-center text-primary">
                    <Dropdown />
                    <div className='mx-5'>
                        <Bell size={32} weight="bold" />
                    </div>
                    <div className="mx-5">
                        <Toggle />
                    </div>
                </div>
            </header >
            : null
    );
};

