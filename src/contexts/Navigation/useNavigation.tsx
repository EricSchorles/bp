"use client"

import Toggle from '@components/Toggle';
import Link from 'next/link';
import React, { ReactNode, useContext, useMemo, useRef, useState } from 'react';
import CategoryIcon from '../../assets/icons/light/Category';
import { ButtonMenu, ButtonProps } from './ButtonMenu';

type NavigationProviderProps = {
    setShowHeader?: React.Dispatch<React.SetStateAction<boolean>>
    setShowAppBar?: React.Dispatch<React.SetStateAction<boolean>>
    children?: ReactNode
}

interface useNavigationProps {
    setShowHeader: React.Dispatch<React.SetStateAction<boolean>>
    setShowAppBar: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavigationContext = React.createContext<useNavigationProps | undefined>(undefined);
export const useNavigation = useContext(NavigationContext)

export const NavigationProvider = (props: NavigationProviderProps) => {
    return <Navigation {...props} />
};

export const Navigation = ({ children }: NavigationProviderProps) => {
    const [showAppBar, setShowAppBar] = useState(true);
    const [showHeader, setShowHeader] = useState(true);
    return (<NavigationContext.Provider value={{ setShowHeader, setShowAppBar }} >
        <div className='min-h-screen min-w-full flex'>
            {showAppBar &&
                <AppBar />}
            <div className='h-full w-11/12'>
                {showHeader &&
                    <div className='h-16 box-border w-full p-5'>
                        {/* Header */}
                        <Toggle />
                    </div>}
                <div className={`h-fit box-border flex w-full bg-gray-children`}>
                    {children}
                </div>
            </div>
        </div>
    </NavigationContext.Provider >)

}


export interface AppBarProps {
    buttons?: ButtonProps[]
}

const AppBar = ({ buttons }: AppBarProps) => {
    const appBarRef = useRef<HTMLDivElement>(null)
    const [expandedBar, setExpandedBar] = useState<boolean>(false);

    const MenuButtonSections = useMemo<ButtonProps[]>(() => {

        let buttonsSection: ButtonProps[] = [
            {
                text: 'Dashboard',
                Icon: <CategoryIcon />,
                onClick: () => undefined
            },
        ]
        if (buttons) {
            buttonsSection.push(...buttons)
        }
        return (buttonsSection)
    }, [buttons]);



    const handleMouseEnter = () => {
        setTimeout(
            () => {
                setExpandedBar(true)
            }, 500
        )
    }

    const handleMouseLeave = () => {
        setTimeout(
            () => {
                setExpandedBar(false)
            }, 700
        )
    }


    return (
        <div
            ref={appBarRef}
            onMouseOver={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ direction: 'rtl' }}
            className={`transition-all duration-700 max-h-screen overflow-y-auto max-w-[240px] flex flex-col ${expandedBar ? 'px-8 w-full' : 'w-28 px-4'}`}>
            <Logo active={expandedBar} />
            <div className='self-center mt-6 relative z-10 w-full' style={{ direction: 'ltr' }}>
                <ButtonMenu showText={expandedBar} buttons={MenuButtonSections} />
            </div>
        </div>)
}

interface MenuLogo { active: boolean }
const Logo = ({ active }: MenuLogo) => <div style={{ direction: 'ltr' }} className={`sticky top-0 z-20 bg-white flex py-4 transition-all duration-75 `}><Link href="/">
    <span className={`text-tertiary w-full font-bold transition-all duration-700 ${active ? 'text-2xl' : 'text-xs '}`}>
        <span className="text-tertiary">{"<"}</span>
        {" "}
        <span className="text-tertiary">{"L"}</span>
        <span className="text-tertiary">{"o"}</span>
        <span className="text-tertiary">{"g"}</span>
        <span className="text-tertiary">{"o"}</span>
        <span className="text-tertiary">{"/>"}</span>
    </span>
</Link></div>