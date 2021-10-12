import React, { FC } from 'react'
import { Header } from './Header/Header'

type LayoutProps = {
    outside?: React.ReactNode,
    className?: string
}
export const Layout: FC<LayoutProps> = (props) => {
    return (
        <div className={`relative`}>
            <Header/>
            <div className={`layout`}>
                <main className={`container mx-auto ${props.className}`}>
                    {props.children}
                </main>
                {props.outside? props.outside:null}
            </div>
        </div>
    )
}
