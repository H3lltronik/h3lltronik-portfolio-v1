import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useStore } from "../../../common/store";
import { CowsayEffect } from "../../common/CowsayEffect";
import { ContactForm } from "../ContactForm";
import { SocialNetworks } from "./SocialNetworks";

export const ContactMe = () => {
    const contactCowSay = useStore(state => state.contactCowSay);
    const setContactCowSay = useStore(state => state.setContactCowSay);
    
    const [ref, inView] = useInView({
        rootMargin: "0px 0px 0px 0px",
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <div id="contact" ref={ref} 
            className="contact-screen lg:h-screen w-full inline-flex relative mt-48 lg:mt-0">
            <div className="hidden lg:block h-full w-full bg-primary"></div>
            <div className="hidden lg:block h-full w-full bg-secondary"></div>

            <div
                className="lg:absolute container mx-auto h-full flex items-center justify-center text-white
            top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 font-secondary flex-col lg:flex-row">
                <div className="lg:h-full w-full lg:w-1/2 flex flex-col">
                    <div className="mx-auto mb-28 mt-24 lg:mt-auto px-5 lg:px-10">
                        {inView && 
                        <motion.div animate={{opacity: 1}} initial={{opacity: 0}}>
                            <CowsayEffect text={contactCowSay}/>
                        </motion.div>
                        }
                    </div>

                    {inView && <motion.div animate={{opacity: 1}} initial={{opacity: 0}}
                    className="mt-auto">
                        <SocialNetworks />
                    </motion.div>}
                </div>
                <div
                    className="lg:h-full w-full lg:w-1/2 pt-10 lg:pt-40 px-10 text-primary bg-secondary
                    pb-16 lg:pb-36 relative">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};
