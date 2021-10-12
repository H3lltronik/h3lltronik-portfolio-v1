import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";
import { useStore } from "../../../common/store";

export const MobileMenuBody = () => {
    const isOpen = useStore((state) => state.mobileMenu);
    const setIsOpen = useStore(state => state.setMobileMenu);
    const menuAnim = useAnimation();

    useEffect(() => {
        menuAnim.set({ x: "100%", y: "100%" });
    }, [])

    useEffect(() => {
        if (isOpen) openAnimation();
        else closeAnimation();
    }, [isOpen])

    async function openAnimation() {
        menuAnim.start({ x: "0%", y: "0%", opacity: 1 });
    }
    
    async function closeAnimation() {
        await menuAnim.start({ opacity: 0 });
        menuAnim.start({ x: 0, y: '100%' });
    }

    async function closeMenu () {
        closeAnimation();
        setIsOpen(false);
    }

    return (
        <motion.div
            animate={menuAnim}
            className="top-0 left-0 w-screen h-screen fixed bg-primary z-10 md:hidden">
            <div className="w-full h-full flex items-center justify-center">
                <nav className="text-secondary text-3xl text-center flex flex-col gap-10">
                    <Link href="/" passHref={true}>
                        <motion.div className="group px-5 relative overflow-hidden cursor-pointer" onClick={closeMenu}>
                            <span className="">Home</span>
                            <div
                                className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                    transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                        </motion.div>
                    </Link>

                    <Link href="/about" passHref={true}>
                        <motion.div className="group px-5 relative overflow-hidden cursor-pointer" onClick={closeMenu}>
                            <span className="">About</span>
                            <div
                                className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                    transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                        </motion.div>
                    </Link>

                    <Link href="/#contact" passHref={true}>
                        <motion.div className="group px-5 relative overflow-hidden cursor-pointer" onClick={closeMenu}>
                            <span className="">Contact</span>
                            <div
                                className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                    transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                        </motion.div>
                    </Link>

                    <Link href="/works" passHref={true}>
                        <motion.div className="group px-5 relative overflow-hidden cursor-pointer" onClick={closeMenu}>
                            <span className="">Works</span>
                            <div
                                className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                    transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                        </motion.div>
                    </Link>
                </nav>
            </div>
        </motion.div>
    );
};
