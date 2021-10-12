import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Pace, WindupChildren } from "windups";
import { textBlock } from "./anim";
import Image from 'next/image';

export const WhatWillItBe = () => {
    const controls = useAnimation();
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
    }

    return (
        <div ref={ref}
            className="container mx-auto h-screen content-container what-will-it-be-screen mt-40 lg:mt-0
            flex flex-col lg:flex-row justify-start lg:justify-between items-center text-white font-console">
            <div className="font-primary text-center lg:w-[640px]">
                <div className="uppercase">
                    <WindupChildren>
                        {inView && <Pace getPace={() => 60}>
                            <div className="text-headline-2 sm:text-title-3 lg:text-title-2 tracking-wider leading-none">
                                <div className="">{"What will"} </div>
                                <div className="">{"it be"}</div>
                            </div>
                        </Pace>}
                    </WindupChildren>

                    <div className="text-headline-1 sm:text-title-2 lg:text-title-1 tracking-wider -mt-2 sm:-mt-4 lg:-mt-10 pl-5 overflow-hidden">
                        <motion.div variants={textBlock} animate={controls} initial="hidden">
                            <strong>today?</strong>
                        </motion.div>
                    </div>
                </div>

                <div className="text-body-1 sm:text-headline-2 lg:text-title-3 text-light overflow-hidden">
                    <motion.div variants={textBlock} animate={controls} initial="hidden"
                    className="tracking-wide">
                        <div className="">From simple applications</div>
                        <div className="">To Full-Stack solutions</div>
                    </motion.div>
                </div>
            </div>

            <div className="w-[300px] sm:w-[500px] mt-28 md:mt-52 lg:mt-0 rotate-90 lg:rotate-0">
                <Roulette />
            </div>
        </div>
    );
};

const Roulette = () => {
    return (
        <div
            id="roulette"
            className="w-[200px] h-[300px] sm:h-[400px] overflow-hidden relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[600px] w-[600px]">
                <div className="animate-spin-slow">
                    <Image src={"/logos.png"} width={600} height={600}/>
                </div>

                <div className=""></div>
            </div>
        </div>
    );
};
