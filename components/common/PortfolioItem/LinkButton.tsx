import { FC } from "react"

type LinkButtonProps = {
    title: string,
    icon: React.ReactNode,
    link: string,
}
export const LinkButton:FC<LinkButtonProps> = (props) => {
    return (
        <a href={props.link} target="_blank" rel="noreferrer"
        className="w-[65px] h-[65px] text-secondary transition duration-300 text-center hover:bg-secondary rounded-full hover:text-primary hover:border border-primary">
            <div className="flex flex-col items-center justify-center">
                <div className="w-[30px] h-[30px]">
                    {props.icon}
                </div>
                <div className="">{props.title}</div>
            </div>
        </a>
    )
}