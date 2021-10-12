import { motion, useAnimation } from "framer-motion";
import React, { FC, useEffect } from "react";
import { useWindowSize } from "../../../common/hooks";
import { useStore } from "../../../common/store";
import { scrollToPx } from "../../../common/utils";

export const MobileMenu = () => {
    return (
        <div className="">
            <MenuButton/>
        </div>
    );
};

type MenuButtonProps = {
    onClick?: (isOpen: boolean) => any;
}
const MenuButton:FC<MenuButtonProps> = (props) => {
    const setIsOpen = useStore(state => state.setMobileMenu);
    const headerFixedScroll = useStore(state => state.headerFixedScroll);
    const windowSize = useWindowSize();
    const isOpen = useStore(state => state.mobileMenu);
    const bar1Anim = useAnimation();
    const bar2Anim = useAnimation();
    const bar3Anim = useAnimation();

    useEffect(() => {
        const currScrollPos = document.documentElement.scrollTop;
        if (isOpen) {
            openAnimation();

            if (headerFixedScroll)
                if (windowSize.width < 1024 && currScrollPos < windowSize.height) {
                    scrollToPx(windowSize.height)
                }
        }
        else closeAnimation();
    }, [isOpen])

    async function openAnimation() {
        bar2Anim.start({ opacity: 0, x: '100%' });
        bar1Anim.start({ top: "50%", left: "50%", x: '-50%', y: '-50%', rotate: 45 });
        bar3Anim.start({ top: "50%", left: "50%", x: '-50%', y: '-50%', rotate: -45 });
    }

    async function closeAnimation() {
        bar2Anim.start({ opacity: 1, x: '0%' });
        bar1Anim.start({ top: "0", left: "0", x: '0%', y: '0%', rotate: 0 });
        bar3Anim.start({ top: "100%", left: "0", x: '0%', y: '-50%', rotate: 0 });
    }

    function toggleMenuAnim() {
        if (isOpen) closeAnimation();
        else openAnimation();
        
        setIsOpen(!isOpen);
        if (props.onClick) props.onClick(isOpen)
    }

    return (
        <button
            className="text-white w-[30px] h-[20px] flex items-center justify-center relative"
            onClick={toggleMenuAnim}>
            <div className="">
                <motion.div
                    className="h-[2px] w-[30px] bg-secondary transform absolute top-0 left-0"
                    animate={bar1Anim}
                />
                <motion.div
                    className="h-[2px] w-[30px] bg-secondary"
                    animate={bar2Anim}
                />
                <motion.div
                    className="h-[2px] w-[30px] bg-secondary transform absolute top-full left-0 -translate-y-1/2"
                    animate={bar3Anim}
                />
            </div>
        </button>
    );
};
