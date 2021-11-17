import { motion, useAnimation } from "framer-motion";
import React, { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Pace, WindupChildren } from "windups";
import { textBlock } from "./anim";
import { Carousel } from "./Carousel";


type LatestProjectsProps = {
    latestPosts: Blogs.RootObject[];
};
export const LatestProjects:FC<LatestProjectsProps> = (props) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        rootMargin: "0px 0px 0px 0px",
        triggerOnce: true,
        threshold: 0.4,
    });

    useEffect(() => {
        if (inView) {
            doSequence();
        }
    }, [controls, inView]);

    function doSequence() {
        controls.start("show");
    }

    return (
        <div
            ref={ref}
            className="container mx-auto min-h-screen latest-projects-screen mt-0 lg:mt-40 xl:mt-0 overflow-x-hidden
            flex flex-col justify-start lg:justify-center items-center text-white font-console mb-0 lg:mb-40">
            <div className="uppercase text-center font-primary">
                {inView && (
                    <WindupChildren>
                        <Pace getPace={() => 80}>
                            <div className="text-4xl md:text-4xl xl:text-headline-1 xxl:text-title-3 tracking-wider text-light">
                                {"Latest"}
                            </div>
                        </Pace>
                    </WindupChildren>
                )}
                <div className="overflow-hidden">
                    <motion.div
                        variants={textBlock}
                        animate={controls}
                        initial="hidden"
                        className="text-5xl md:text-6xl xl:text-title-2 xxl:text-title-1 tracking-wider md:-mt-1 xxl:mt-2">
                        <strong>projects</strong>
                    </motion.div>
                </div>
            </div>

            {inView && <Carousel items={props.latestPosts}/>}
        </div>
    );
};
