import { motion, useAnimation } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import slugify from 'slugify';
import { computerIcon, githubIcon } from '../../../common/icons';
import { IMAGES_SERVER_URL } from '../../../constants';
import { Button } from '../Button';
import { previewVariants, projectDescVariants, projectIdVariants, projectTitleVariants } from './anim';
import { LinkButton } from "./LinkButton";
import { Tag } from './Tag';

type PortfolioItemProps = {
    className?: string;
    data: Blogs.RootObject
};
export const PortfolioItem: FC<PortfolioItemProps> = (props) => {
    const previewAnim = useAnimation();
    const descAnim = useAnimation();
    const titleAnim = useAnimation();
    const idAnim = useAnimation();
    const fadeIcons = useAnimation();

    useEffect(() => {
        fadeIcons.set({opacity: 0, display: 'none'})
    }, [])

    async function handleOnMouseEnter () {
        previewAnim.start("show");
        descAnim.start("show");
        titleAnim.start("show");
        idAnim.start("show");
        
        fadeIcons.set({display: 'block'})
        fadeIcons.start({
            opacity: 1,
        })
    }
    
    async function handleOnMouseLeave () {
        previewAnim.start("hidden");
        descAnim.start("hidden");
        titleAnim.start("hidden");
        idAnim.start("hidden");

        await fadeIcons.start({opacity: 0})
        fadeIcons.set({display: 'none'})
    }

    return (
        <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}
            className={`portfolio-item border-4 border-secondary ${props.className}
            max-w-[400px] xxl:max-w-[450px] md:w-[350px] md:h-[350px] xl:w-[400px] xl:h-[400px] xxl:w-[450px] xxl:h-[450px]`}>
            <div className="portfolio-item_id flex-center flex-col border-b-4 border-r-4 relative border-secondary">
                <div className="text-xl font-light leading-5 text-center">
                    <div className="">#</div>
                    {props.data.count.toString().padStart(2, "0").split("").map((number,index) => {
                        return <div className="" key={index}>{number}</div>
                    })}
                </div>

                <motion.div variants={projectIdVariants} animate={idAnim}
                className="bg-secondary z-20 h-full absolute right-0 bottom-0 mix-blend-difference"></motion.div>
            </div>
            <div className="portfolio-item_title text-headline-2 flex-center text-center border-secondary border-b-4 xxl:px-10 relative">
                <div className="my-auto leading-none">{props.data.short_title}</div>

                <motion.div variants={projectTitleVariants} animate={titleAnim}
                className="bg-secondary z-20 w-full absolute left-0 bottom-0 mix-blend-difference"></motion.div>
            </div>
            <div className="portfolio-item_description relative text-center flex-center px-3 text-body-3 border-secondary border-l-4 border-b-4">
                <div className="">
                    {props.data.short_description}
                </div>
                <motion.div variants={projectDescVariants} animate={descAnim}
                className="bg-secondary z-20 h-full absolute left-0 top-0 mix-blend-difference"></motion.div>
            </div>
            <div className="portfolio-item_tags flex gap-5 items-center border-secondary border-b-4 overflow-hidden py-2">
                <Marquee className="" gradient={false} pauseOnHover={true}>
                    {
                        (props.data) &&
                        props.data.tags.map((tag, index) => {
                            return <Tag className="mr-2" tag={{id: tag.id, name: tag.title}} key={index} />;
                        })
                    }
                </Marquee>
            </div>
            <div className="portfolio-item_preview relative">
                <Image 
                className="object-cover"
                src={`${IMAGES_SERVER_URL}${props.data.thumbnail.url}`} layout="fill" alt={`${props.data.short_title} image`}/>

                <motion.div variants={previewVariants} animate={previewAnim}
                className="bg-primary bg-opacity-80 w-full absolute left-0 top-0">
                </motion.div>

                <motion.div className="absolute w-full h-full left-0 top-0 z-10" animate={fadeIcons}>
                    <div className="w-full h-full flex flex-col gap-y-16 justify-center items-center">
                        <div className="flex gap-20">
                            {props.data.live && <LinkButton link={props.data.live} title="Live" icon={computerIcon}/>}
                            {props.data.repository && <LinkButton link={props.data.repository} title="Repo" icon={githubIcon}/>}
                        </div>

                        <Link href={`/works/${props.data.id}/${slugify(props.data.title.toLocaleLowerCase())}`} passHref={true}>
                            <div className="">
                                <Button>See entry</Button>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};