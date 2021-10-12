import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Router from "next/router";
import React, { useEffect, useState } from "react";

export const LoadingIndicator = () => {
    const [loading, setLoading] = useState(false);
    const control = useAnimation();

    Router.events.on("routeChangeStart", () => {
        setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
        setLoading(false);
    });
    Router.events.on("routeChangeError", () => {
        setLoading(false);
    });

    useEffect(() => {
        if (!loading) control.start({ opacity: 0 });
        else if (loading) control.start({ opacity: 1 });
    }, [loading]);

    return (
        <>
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed top-0 left-0 z-[100] w-screen h-screen bg-primary bg-opacity-80">
                        <div className="w-full h-full flex flex-col items-center justify-center text-4xl text-secondary">
                            <div className="animate-bounce">
                                <span className="">
                                    <span className="animate-pulse">Loading</span>
                                    <span className="animate-ping">...</span>
                                </span>
                            </div>
                            {/* <div className="">
                            <span className="">|#####     |</span>
                        </div> */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
