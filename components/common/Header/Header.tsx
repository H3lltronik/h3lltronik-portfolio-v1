import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from 'next/link';
import React, { FC, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../common/hooks";
import { useStore } from "../../../common/store";
import { SKIP_INITIAL_SEQUENCE } from "../../../constants";
import {
    h3Variants,
    headerContainerVariants,
    headerVariants,
    initScrollAnim,
    initStickyCheck,
    logoTextVariants,
    navItemsVariants
} from "./anim";
import { MobileMenu } from "./MobileMenu";
import { MobileMenuBody } from "./MobileMenuBody";

type HeaderProps = {
    className?: string;
    enableAnim?: boolean,
    enableFadeIn?: boolean,
};
export const Header: FC<HeaderProps> = (props) => {
    const headerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [isUpwards, setIsUpwards] = useState(false);
    const [enableAnim, setEnableAnim] = useState(false);
    const [enableFadeIn, setEnableFadeIn] = useState(false);
    const isOpenMobile = useStore((state) => state.mobileMenu);
    const windowsSize = useWindowSize();
    
    const h3Anim = useAnimation();
    const headerContAnim = useAnimation();
    const headerAnim = useAnimation();
    const navItemsAnim = useAnimation();
    const logoTextAnim = useAnimation();

    useEffect(() => {
        if (!headerRef.current) return;
        initStickyCheck(headerRef.current, checkSticky);
        let timeToFade = 7000;
        const skipInitialSequence = sessionStorage.getItem(SKIP_INITIAL_SEQUENCE);
        if (skipInitialSequence) timeToFade = 500;

        if (enableFadeIn) {
            headerContAnim.set("hidden")
            setTimeout(() => { headerContAnim.start("show"); }, timeToFade);
        }

        return () => {
        }
    }, [headerRef, enableFadeIn, headerContAnim]);

    useEffect(() => {
        if (!enableAnim) return
        initScrollAnim(shrink, expand);
    }, [isSticky, enableAnim]);

    useEffect(() => {
        setEnableAnim(!!props.enableAnim)
        setEnableFadeIn(!!props.enableFadeIn)
        return () => {
        }
    }, [])

    useEffect(() => {
        if (!enableAnim) return;

        if (windowsSize.width <= 768) {
            setEnableAnim(false);
        } else if (windowsSize.width > 768) {
            setEnableAnim(true);
        }
    }, [windowsSize, enableAnim])

    function checkSticky(entries: any) {
        const [entry] = entries;
        const isIt = !entry.isIntersecting;
        setIsSticky(isIt);
    }

    async function shrink() {
        if (!enableAnim) return;
        if (!isSticky) return;
        setIsUpwards(false);
        headerAnim.start("closed");
        navItemsAnim.start("shrink");
        logoTextAnim.start("shrink");
        await h3Anim.start("hidden");
    }
    
    async function expand() {
        if (!enableAnim) return;
        setIsUpwards(true);
        headerAnim.start("opened");
        navItemsAnim.start("normal");
        logoTextAnim.start("normal");
        await h3Anim.start("closed");
    }

    return (
        <AnimatePresence>
            <motion.header
                ref={headerRef}
                variants={headerContainerVariants}
                animate={headerContAnim}
                className={`left-0 top-0 w-full z-50 ${props.className} ${isOpenMobile && 'fixed'}`}>
                <motion.div
                    id="header"
                    variants={headerVariants}
                    animate={headerAnim}
                    className="pt-5 gradient-bg px-5 sm:px-10 xl:px-0">
                    <div className={`container content-container mx-auto h-full`}>
                        <div className="relative flex items-center justify-between h-full">
                            <Link href="/" passHref={true} >
                                <div className="flex items-center cursor-pointer">
                                    <div className="w-[40px] md:w-[60px] ">
                                        <motion.svg
                                            variants={h3Variants}
                                            animate={h3Anim}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 689 749">
                                            <path fill="#fff" d="M383.867 447V37.385h-30.428v189.593H91.285V37.385H60.858V447h30.428V255.066H353.44V447h30.428Z"/>
                                            <path fill="#fff" d="M598.42 255.058 457.395 417.734l7.607 16.97h22.237c18.335 0 35.305 1.95 50.909 5.851s29.063 9.753 40.376 17.555c11.313 7.412 20.091 16.775 26.333 28.088 6.631 10.923 9.947 23.602 9.947 38.036 0 13.654-2.73 26.137-8.192 37.45-5.461 10.923-12.874 20.481-22.236 28.673-8.973 7.802-19.701 14.044-32.184 18.725-12.094 4.292-24.967 6.437-38.621 6.437-26.917 0-50.909-5.656-71.975-16.969-20.676-11.314-39.206-27.503-55.591-48.569l-23.406 19.31c16.775 21.846 37.645 39.596 62.612 53.25 24.967 13.654 54.226 20.481 87.775 20.481 17.555 0 34.329-2.731 50.324-8.192 16.385-5.852 30.624-14.044 42.717-24.577 12.483-10.533 22.236-23.212 29.258-38.036 7.412-14.824 11.118-31.209 11.118-49.154 0-18.725-3.901-35.109-11.703-49.153-7.802-14.044-18.335-25.748-31.599-35.11-13.264-9.753-28.673-17.165-46.228-22.236-17.555-5.462-36.085-8.778-55.59-9.948l138.683-158.58v-21.651H383.665v28.673H598.42Z"/>
                                        </motion.svg>
                                    </div>
                                    <motion.div variants={logoTextVariants} animate={logoTextAnim}
                                    className="w-[80px] md:w-[110px] ml-[15px] -mt-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 939 312">
                                            <path fill="#fff" d="M47.976 128h4.896V79.472h68.976V128h4.896V27.2h-4.896v47.808H52.872V27.2h-4.896V128Zm158.671 1.728c17.568 0 32.688-11.664 32.688-28.368v-.288c0-18.864-15.984-27.648-38.592-28.08l37.008-42.336V27.2h-62.208v4.608h55.584l-37.44 42.768 1.44 2.88h4.176c20.592 0 35.136 7.344 35.136 23.76v.288c0 13.968-12.672 23.76-27.648 23.76-13.968 0-25.2-6.624-32.832-16.704l-3.744 3.168c7.92 10.512 20.448 18 36.432 18ZM286.482 128h4.752V22.88h-4.752V128Zm57.808 0h4.752V22.88h-4.752V128Zm80.128 1.296c4.032 0 7.776-.72 11.376-2.448v-4.464c-3.744 1.728-7.344 2.592-10.944 2.592-9.504 0-15.12-5.328-15.12-15.984V59.6h26.352v-4.176H409.73V31.088h-4.608v24.336h-11.088V59.6h11.088v49.824c0 13.104 7.632 19.872 19.296 19.872ZM480.979 128h4.608V93.584c0-17.856 12.528-34.848 30.096-34.848h.72v-4.752c-15.408-.432-26.496 11.232-30.816 23.616V55.424h-4.608V128Zm105.256 1.728c22.32 0 37.584-17.712 37.584-38.016v-.288c0-20.304-15.264-37.728-37.44-37.728-22.32 0-37.728 17.712-37.728 38.016V92c0 20.304 15.408 37.728 37.584 37.728Zm.144-4.32c-18.864 0-32.688-15.264-32.688-33.552v-.288c0-18.288 13.248-33.552 32.4-33.552 18.864 0 32.832 15.264 32.832 33.552v.288c0 18.288-13.392 33.552-32.544 33.552ZM669.861 128h4.608V87.104c0-16.56 12.096-29.088 27.36-29.088 16.848 0 25.92 11.376 25.92 28.224V128h4.608V85.52c0-18.864-10.8-31.824-29.952-31.824-15.552 0-24.624 10.368-27.936 19.008v-17.28h-4.608V128Zm112.515-92.592h6.192v-8.784h-6.192v8.784Zm.72 92.592h4.752V55.424h-4.752V128Zm56.944 0h4.608v-20.16l17.856-17.136L895.048 128h5.76l-35.136-40.464 33.408-32.112h-6.192l-48.24 46.944V22.88h-4.608V128ZM104.112 233.456c0-7.104-1.296-13.728-3.888-19.872-2.592-6.144-6.288-11.472-11.088-15.984-4.704-4.512-10.368-8.016-16.992-10.512-6.528-2.592-13.728-3.888-21.6-3.888H12.96V284h37.584c7.872 0 15.072-1.296 21.6-3.888 6.624-2.592 12.288-6.144 16.992-10.656 4.8-4.512 8.496-9.84 11.088-15.984 2.592-6.24 3.888-12.912 3.888-20.016Zm-18.576.288c0 4.992-.864 9.6-2.592 13.824-1.632 4.128-3.984 7.728-7.056 10.8-2.976 2.976-6.624 5.328-10.944 7.056-4.32 1.632-9.12 2.448-14.4 2.448H30.672v-68.544h19.872c5.28 0 10.08.864 14.4 2.592 4.32 1.728 7.968 4.128 10.944 7.2 3.072 3.072 5.424 6.72 7.056 10.944 1.728 4.128 2.592 8.688 2.592 13.68Zm75.777 18.432h55.872c.096-.864.144-1.68.144-2.448.096-.768.144-1.536.144-2.304 0-5.472-.768-10.704-2.304-15.696-1.536-4.992-3.84-9.36-6.912-13.104-2.976-3.744-6.768-6.72-11.376-8.928-4.512-2.208-9.792-3.312-15.84-3.312-5.472 0-10.464 1.056-14.976 3.168a37.529 37.529 0 0 0-11.808 8.64c-3.264 3.552-5.808 7.728-7.632 12.528-1.824 4.8-2.736 9.936-2.736 15.408 0 5.952 1.008 11.376 3.024 16.272 2.016 4.8 4.752 8.928 8.208 12.384 3.552 3.456 7.68 6.144 12.384 8.064 4.8 1.92 9.936 2.88 15.408 2.88 7.008 0 13.008-1.296 18-3.888 5.088-2.592 9.456-6.048 13.104-10.368l-10.224-9.072c-3.072 2.976-6.192 5.232-9.36 6.768-3.168 1.536-6.912 2.304-11.232 2.304-5.664 0-10.464-1.632-14.4-4.896-3.936-3.36-6.432-8.16-7.488-14.4Zm-.144-11.52c.768-5.952 2.88-10.752 6.336-14.4 3.552-3.744 8.016-5.616 13.392-5.616 2.88 0 5.424.528 7.632 1.584 2.304 1.056 4.272 2.496 5.904 4.32 1.632 1.728 2.928 3.84 3.888 6.336.96 2.4 1.584 4.992 1.872 7.776h-39.024Zm126.594 23.184-20.448-55.872h-18.72l31.248 76.608h15.696l31.104-76.608h-18.288l-20.592 55.872Zm87.041-11.664h55.872c.096-.864.144-1.68.144-2.448.096-.768.144-1.536.144-2.304 0-5.472-.768-10.704-2.304-15.696-1.536-4.992-3.84-9.36-6.912-13.104-2.976-3.744-6.768-6.72-11.376-8.928-4.512-2.208-9.792-3.312-15.84-3.312-5.472 0-10.464 1.056-14.976 3.168a37.529 37.529 0 0 0-11.808 8.64c-3.264 3.552-5.808 7.728-7.632 12.528-1.824 4.8-2.736 9.936-2.736 15.408 0 5.952 1.008 11.376 3.024 16.272 2.016 4.8 4.752 8.928 8.208 12.384 3.552 3.456 7.68 6.144 12.384 8.064 4.8 1.92 9.936 2.88 15.408 2.88 7.008 0 13.008-1.296 18-3.888 5.088-2.592 9.456-6.048 13.104-10.368l-10.224-9.072c-3.072 2.976-6.192 5.232-9.36 6.768-3.168 1.536-6.912 2.304-11.232 2.304-5.664 0-10.464-1.632-14.4-4.896-3.936-3.36-6.432-8.16-7.488-14.4Zm-.144-11.52c.768-5.952 2.88-10.752 6.336-14.4 3.552-3.744 8.016-5.616 13.392-5.616 2.88 0 5.424.528 7.632 1.584 2.304 1.056 4.272 2.496 5.904 4.32 1.632 1.728 2.928 3.84 3.888 6.336.96 2.4 1.584 4.992 1.872 7.776H374.66ZM491.374 284V178.88H473.95V284h17.424Zm124.147-38.016c0-5.472-1.008-10.608-3.024-15.408-2.016-4.8-4.848-8.976-8.496-12.528-3.552-3.648-7.824-6.48-12.816-8.496-4.896-2.112-10.272-3.168-16.128-3.168s-11.28 1.056-16.272 3.168c-4.896 2.112-9.168 4.992-12.816 8.64-3.552 3.552-6.384 7.776-8.496 12.672-2.016 4.8-3.024 9.936-3.024 15.408 0 5.472 1.008 10.608 3.024 15.408a40.895 40.895 0 0 0 8.352 12.528c3.648 3.552 7.92 6.384 12.816 8.496 4.992 2.016 10.368 3.024 16.128 3.024 5.856 0 11.28-1.056 16.272-3.168 4.992-2.112 9.264-4.944 12.816-8.496 3.648-3.648 6.48-7.872 8.496-12.672 2.112-4.8 3.168-9.936 3.168-15.408Zm-17.424.288c0 3.36-.528 6.528-1.584 9.504-1.056 2.88-2.592 5.424-4.608 7.632-2.016 2.208-4.464 3.984-7.344 5.328-2.784 1.248-5.952 1.872-9.504 1.872-3.36 0-6.48-.624-9.36-1.872a25.289 25.289 0 0 1-7.344-5.328c-2.016-2.208-3.6-4.8-4.752-7.776-1.152-3.072-1.728-6.288-1.728-9.648 0-3.36.528-6.48 1.584-9.36 1.056-2.976 2.592-5.568 4.608-7.776 2.016-2.208 4.416-3.936 7.2-5.184 2.88-1.344 6.048-2.016 9.504-2.016 3.456 0 6.576.672 9.36 2.016 2.88 1.248 5.328 3.024 7.344 5.328 2.112 2.208 3.744 4.8 4.896 7.776 1.152 2.976 1.728 6.144 1.728 9.504Zm138.273-.288c0-6.336-1.008-11.952-3.024-16.848-2.016-4.896-4.704-9.024-8.064-12.384-3.264-3.456-7.008-6.048-11.232-7.776-4.224-1.728-8.592-2.592-13.104-2.592-6.144 0-11.28 1.392-15.408 4.176a37.03 37.03 0 0 0-10.368 10.08v-12.672h-17.424v99.072h17.424v-34.848c2.688 3.552 6.096 6.672 10.224 9.36 4.128 2.688 9.312 4.032 15.552 4.032 4.512 0 8.88-.864 13.104-2.592a32.549 32.549 0 0 0 11.376-7.632c3.36-3.456 6-7.632 7.92-12.528 2.016-4.896 3.024-10.512 3.024-16.848Zm-17.712 0c0 3.744-.576 7.152-1.728 10.224-1.152 2.976-2.736 5.52-4.752 7.632-1.92 2.112-4.224 3.744-6.912 4.896-2.592 1.152-5.376 1.728-8.352 1.728s-5.808-.576-8.496-1.728a21.2 21.2 0 0 1-7.056-4.896c-2.016-2.208-3.648-4.8-4.896-7.776-1.152-2.976-1.728-6.336-1.728-10.08 0-3.744.576-7.104 1.728-10.08 1.248-2.976 2.88-5.52 4.896-7.632 2.016-2.208 4.368-3.888 7.056-5.04a21.343 21.343 0 0 1 8.496-1.728c2.976 0 5.76.576 8.352 1.728 2.688 1.152 4.992 2.784 6.912 4.896 2.016 2.112 3.6 4.704 4.752 7.776 1.152 2.976 1.728 6.336 1.728 10.08Zm73.285 6.192h55.872c.096-.864.144-1.68.144-2.448.096-.768.144-1.536.144-2.304 0-5.472-.768-10.704-2.304-15.696-1.536-4.992-3.84-9.36-6.912-13.104-2.976-3.744-6.768-6.72-11.376-8.928-4.512-2.208-9.792-3.312-15.84-3.312-5.472 0-10.464 1.056-14.976 3.168a37.529 37.529 0 0 0-11.808 8.64c-3.264 3.552-5.808 7.728-7.632 12.528-1.824 4.8-2.736 9.936-2.736 15.408 0 5.952 1.008 11.376 3.024 16.272 2.016 4.8 4.752 8.928 8.208 12.384 3.552 3.456 7.68 6.144 12.384 8.064 4.8 1.92 9.936 2.88 15.408 2.88 7.008 0 13.008-1.296 18-3.888 5.088-2.592 9.456-6.048 13.104-10.368l-10.224-9.072c-3.072 2.976-6.192 5.232-9.36 6.768-3.168 1.536-6.912 2.304-11.232 2.304-5.664 0-10.464-1.632-14.4-4.896-3.936-3.36-6.432-8.16-7.488-14.4Zm-.144-11.52c.768-5.952 2.88-10.752 6.336-14.4 3.552-3.744 8.016-5.616 13.392-5.616 2.88 0 5.424.528 7.632 1.584 2.304 1.056 4.272 2.496 5.904 4.32 1.632 1.728 2.928 3.84 3.888 6.336.96 2.4 1.584 4.992 1.872 7.776h-39.024Zm115.706 14.4c0-4.992.624-9.36 1.872-13.104 1.248-3.84 3.024-7.008 5.328-9.504a22.006 22.006 0 0 1 8.208-5.616c3.168-1.248 6.672-1.872 10.512-1.872h1.008v-18.432c-6.72-.288-12.288 1.296-16.704 4.752-4.416 3.456-7.824 8.064-10.224 13.824v-17.136h-17.424V284h17.424v-28.944Z"/>
                                        </svg>
                                    </motion.div>
                                </div>
                            </Link>

                            <nav className="hidden md:block text-white font-secondary text-2xl font-thin">
                                <div className={`flex items-center transition duration-300 gap-10`}> 

                                    <Link href="/" passHref={true}>
                                        <motion.div variants={navItemsVariants} animate={navItemsAnim}
                                        className="group px-5 relative overflow-hidden cursor-pointer">
                                            <span className="">Home</span>
                                            <div className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                            transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                                        </motion.div>
                                    </Link>

                                    <Link href="/about" passHref={true}>
                                        <motion.div variants={navItemsVariants} animate={navItemsAnim}
                                        className="group px-5 relative overflow-hidden cursor-pointer">
                                            <span className="">About</span>
                                            <div className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                            transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                                        </motion.div>
                                    </Link>
                                    
                                    <Link href="/#contact" passHref={true}>
                                        <motion.div variants={navItemsVariants} animate={navItemsAnim}
                                        className="group px-5 relative overflow-hidden cursor-pointer">
                                            <span className="">Contact</span>
                                            <div className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                            transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                                        </motion.div>
                                    </Link>

                                    
                                    <Link href="/works" passHref={true}>
                                        <motion.div variants={navItemsVariants} animate={navItemsAnim}
                                        className="group px-5 relative overflow-hidden cursor-pointer">
                                            <span className="">Works</span>
                                            <div className="bg-secondary w-full h-full absolute -right-1 bottom-0 mix-blend-difference
                                            transform translate-x-full group-hover:translate-x-0 transition duration-300"></div>
                                        </motion.div>
                                    </Link>
                                    
                                </div>
                            </nav>

                            <div className="md:hidden -mt-3">
                                <MobileMenu/>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.header>

            <MobileMenuBody key={'MobileMenuBody'}/>
        </AnimatePresence>
    );
};
