import { PrimaryButton } from "@components/Buttons/PrimaryButton";
import { IconProps } from "@utils/types/icon.type";
import { ReactNode, FunctionComponent, useState, useRef, ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface MenuButonProps {
    showText?: boolean
    buttons: ButtonProps[]
}

export interface ButtonProps extends
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { text: ReactNode, Icon: JSX.Element }


export const ButtonMenu = ({ buttons, showText }: MenuButonProps) => {
    return <>
        {buttons.map((button) => {
            return (
                <PrimaryButton key={button.text?.toString()} className={`items-center flex self-center transition-all max-h-16 p-4 w-full group gap-2 m-0`}>
                    <a>
                        {button.Icon}
                    </a>
                    <div className={`duration-700 grow-0 truncate break-all transition-[width && scale && height] font-normal text-sm  ${showText ? 'flex scale-x-100 w-auto opacity-100' : ' h-0 w-0 opacity-0'}`}>
                        <p className={`text-black-50 text-start font-poppins group-hover:text-white ${showText ? "h-full" : "h-0"}`}>
                            {button.text}
                        </p>
                    </div>
                </PrimaryButton>
            )
        })}
    </>



}