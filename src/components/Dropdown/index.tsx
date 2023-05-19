'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { CaretDown, CaretUp, Stack } from 'phosphor-react';

import React from 'react';

const Dropdown = () => {

    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild
                onAuxClick={(e) => {
                    e.preventDefault();
                    setOpen((prevOpen) => !prevOpen);
                }
                }
            >
                <button
                    className="flex items-center mx-5"
                    aria-label="Customise options"
                >
                    <Stack size={24} />
                    Channel
                    {
                        open ?
                            <CaretUp size={24} />
                            :
                            <CaretDown size={24} />
                    }
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal >
                <DropdownMenu.Content className="bg-primary z-30 rounded-md shadow-xl p-2" sideOffset={5}>
                    <DropdownMenu.Item className="p-1">
                        <div className='flex justify-around' onClick={() => setOpen((prevOpen) => !prevOpen)}>
                            <Stack size={24} className='mr-5' />  New Tab
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-1">
                        <div className='flex justify-around'>
                            <Stack size={24} className='mr-5' /> New Tab
                        </div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="p-1">
                        <div className='flex justify-around'>
                            <Stack size={24} className='mr-5' /> New Tab
                        </div>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default Dropdown;