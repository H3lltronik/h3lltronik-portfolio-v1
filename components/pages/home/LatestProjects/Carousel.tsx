import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { FC } from 'react';
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from '../../../common/Button';
import { PortfolioItem } from '../../../common/PortfolioItem/PortfolioItem';

type CarouselProps = {
    items: Blogs.RootObject[];
};
export const Carousel:FC<CarouselProps> = (props) => {
    return (
        <>
            <motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{duration: 1.5}}
            className="flex flex-col justify-between w-full mt-10 md:mt-10 xl:mt-32 xxl:mt-44 relative px-8 lg:px-0">
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={3}
                    draggable={true}
                    loop={true}
                    navigation={{
                        prevEl: "#projects_prev",
                        nextEl: "#projects_next",
                    }}
                    pagination={{
                        clickable: true,
                        el: ".projects_pagination",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1
                        },
                        900: {
                            slidesPerView: 2
                        },
                        1300: {
                            slidesPerView: 3
                        },
                    }}
                    className="relative w-full">
                        {
                            (props.items.length > 0) &&
                            props.items.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <PortfolioItem data={item} className="mx-auto" />
                                    </SwiperSlide>
                                );
                            })
                        }
                </Swiper>

                <div className="flex flex-col mx-auto justify-center items-center mt-16 lg:mt-24">
                    <div className="flex items-center">
                        <button
                            id="projects_prev"
                            className="w-[30px] h-[30px] p-2 flex-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16"><path fill="#fff" d="M9.262 2.263 7.5.5 0 8l7.5 7.5 1.762-1.762L3.537 8l5.725-5.737Z"/></svg>
                        </button>

                        <div className="projects_pagination flex gap-4 mx-5 md:mx-10"></div>

                        <button 
                            id="projects_next" 
                            className="w-[30px] h-[30px] p-2 flex-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16"><path fill="#fff" d="M2.5.5.737 2.263 6.462 8 .737 13.738 2.5 15.5 10 8 2.5.5Z"/></svg>
                        </button>
                    </div>

                    <Link href="/works" passHref={true}>
                        <div className="">
                            <Button className="mt-10">
                                <span className="">SEE ALL</span>
                            </Button>
                        </div>
                    </Link>
                </div>
            </motion.div>
        </>
    )
}
