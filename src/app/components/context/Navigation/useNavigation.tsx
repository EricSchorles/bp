"use client"
import React, { ReactNode } from 'react';
import Switchable from '../Theme/Switchable';

type NavigationProviderProps = { children?: ReactNode }

type NavigationContextProps = {}

export const NavigationContext = React.createContext<NavigationContextProps>({});
export const NavigationProvider = ({ children }: NavigationProviderProps
) => {


    return (
        <NavigationContext.Provider value={{}}>
            <div className='h-screen w-screen grid grid-cols-12 grid-rows-navigation-context'>
                <div className='col-span-2 row-span-navigation-menu h-full w-full bg-gray-600' />
                <div className='col-span-10 row-span-4 h-full w-full bg-gray-200 p-5'>
                    <p className='text-xl w-full place-content-between flex'>Dashboard
                        <Switchable></Switchable>
                    </p>
                </div>
                <div className='col-span-10 row-span-children h-full w-full bg-gray-100'>
                    {children}
                </div>
            </div>
        </NavigationContext.Provider>
    );
};
