import Image from "next/image";
import React, { FC } from "react";
import { scrollToPx } from "../../../common/utils";

type FooterProps = {
    className?: string;
};
export const Footer: FC<FooterProps> = (props) => {
    const goUp = () => {
        scrollToPx(0);
    };

    return (
        <div className="border-t mt-10 border-placeholder">
            <div
                className={`container mx-auto flex flex-col lg:flex-row justify-between items-center lg:h-[80px] relative gap-10 lg:gap-0
                    py-10 ${props.className}`}>
                <p className="order-3 lg:order-1 text-secondary text-sm font-light">
                    <i>No cows were harmed in this website</i>
                </p>

                <button
                    onClick={goUp}
                    className="order-1 lg:order-2 w-[40px] h-[40px] lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 28 28">
                        <path
                            fill="#fff"
                            d="m.667 14 2.35 2.35 9.316-9.3v20.283h3.333V7.05l9.3 9.317L27.334 14 14 .667.667 14Z"
                        />
                    </svg>
                </button>

                <div className="order-2 lg:order-3">
                    <Image src="/full-logo.svg" width={150} height={45}></Image>
                </div>
            </div>
        </div>
    );
};
