import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Pace, WindupChildren } from "windups";
import { CowsayEffect } from "../../../common/CowsayEffect";
import { textBlock } from "./anim";

export const WorkLove = () => {
    const [text, setText] = useState("Yep, he does love to code");
    const [isShowing, setIsShowing] = useState(false);

    const controls = useAnimation();
    const [text2Delay, setText2Delay] = useState(false);
    const [ref, inView] = useInView({
        rootMargin: "0px 0px 0px 0px",
        triggerOnce: true,
        threshold: 0.4,
    });

    useEffect(() => {
        if (inView) {
            doSequence()
        }
    }, [controls, inView]);

    function doSequence () {
        controls.start("show");

        setTimeout(() => {
            setText2Delay(true);
        }, 1500);

        setTimeout(() => {
            setIsShowing(true)
        }, 3000);
    }

    return (
        <div ref={ref}
            className="container content-container mx-auto h-screen work-love-screen mt-40 lg:mt-0
            flex flex-col lg:flex-row justify-start lg:justify-between items-center text-white font-console">

            <div className="font-primary text-center xl:w-[640px]">
                <div className="uppercase overflow-hidden">
                    {inView && <WindupChildren>
                        <Pace getPace={() => 100}>
                        <div className="text-title-3 xl:text-title-2 tracking-wider">{"I love my"}</div>
                        </Pace>
                    </WindupChildren>}
                    <motion.div variants={textBlock} animate={controls} initial="hidden"
                        className="text-title-2 lg:text-title-1 tracking-widest -mt-7 lg:-mt-14 pl-5">
                        <b>work</b>
                    </motion.div>
                </div>

                <div className=" text-headline-2 xl:text-title-3 text-light mt-5 overflow-hidden mb-10">
                    <motion.div variants={textBlock} animate={controls} initial="hidden"
                    className="tracking-wide leading-tight">
                        <div className="">Therefore I dont have to</div>
                        <div className="">work a single day  of my</div>
                        <div className="text-title-">life</div>
                    </motion.div>
                </div>

                <div className="h-[66px]">
                    {inView && <WindupChildren>
                        {text2Delay && <Pace getPace={() => 20}>
                            <div className="text-light text-body-1 xl:text-headline-2">
                                <div className="">{"But do not trust me right away!"}</div>
                                <div className="">{"Trust what the cow says..."}</div>
                            </div>
                        </Pace>}
                    </WindupChildren>}
                </div>
            </div>

            {inView && isShowing && <motion.div animate={{opacity: 1}} initial={{opacity: 0}}
            className="ml-0 lg:px-5 xl:ml-24 mt-14 lg:mt-0  xl:w-[640px]" >
                <CowsayEffect text={text}/>
                
                <div className="text-right pr-9 mt-10">
                    <div className="">- Cow of Wisdom</div>
                    <div className="text-xs">(89 A.C - Today)</div>
                </div>
            </motion.div>}

        </div>
    );
};
