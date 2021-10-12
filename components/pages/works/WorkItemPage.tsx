import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useWindowSize } from "../../../common/hooks";
import { computerIcon, githubIcon, leftChevronIcon } from "../../../common/icons";
import { Urlize } from "../../../common/utils";
import { PortfolioItem } from "../../../components/common/PortfolioItem/PortfolioItem";
import { Tag } from "../../../components/common/PortfolioItem/Tag";
import { SearchInput } from "../../../components/pages/works/SearchInput";
import { IMAGES_SERVER_URL } from "../../../constants";
import { LinkButton } from "../../common/PortfolioItem/LinkButton";

type WorkItemPageProps = {
    post: Blogs.RootObject;
    presentation: Presentation.RootObject;
    posts: Blogs.RootObject[];
};
export const WorkItemPage: FC<WorkItemPageProps> = (props) => {
    const [marqueeSpeed, setMarqueeSpeed] = useState(0);
    const windowsSize = useWindowSize();

    useEffect(() => {
        const tagsContainerWidth =
            document.querySelector<HTMLElement>("#tagsContainer")?.offsetWidth;
        const tagsMarqueeWidth =
            document.querySelector<HTMLElement>("#tagsMarquee")?.offsetWidth;

        if (tagsContainerWidth && tagsMarqueeWidth)
            if (tagsContainerWidth < tagsMarqueeWidth) {
                setMarqueeSpeed(10);
            } else {
                setMarqueeSpeed(0);
            }
    }, [windowsSize]);

    function doSearch (value: string) {
        const url = `${window.location.origin}/works?search=${Urlize(value)}`
        window.location.href = url;
    }

    if (!props.post) {
        return <div className=""></div>
    }

    return (
        <div
            className="text-white container mt-5 lg:mt-16 mx-auto content-container font-secondary text-md relative
            pb-0 lg:pb-40 px-4 md:px-10 lg:pl-10 lg:pr-16">

            <button className="hover:bg-secondary active:bg-light hover:text-primary
            rounded-xl pr-2 mb-5">
                <Link href="/works" passHref={true}>
                    <div className="flex items-center">
                        <div className="w-[30px] h-[30px]">
                            {leftChevronIcon}
                        </div>
                        <span className="">Go back</span>
                    </div>
                </Link>
            </button>
            <div className="mb-7 block lg:hidden">
                <SearchInput className="w-full max-w-[350px]" onSubmit={doSearch} enableSearchButton={true}/>
            </div>

            <div className="flex flex-col lg:flex-row lg:gap-16">
                <div className="w-full lg:w-8/12">
                    <div id="tagsContainer" className="w-full">
                        <div className="mb-5">
                            <Marquee
                                className=""
                                gradient={false}
                                pauseOnHover={true}
                                speed={marqueeSpeed}>
                                <div id="tagsMarquee" className="flex">
                                    {
                                        props.post.tags.map((tag) => {
                                            return (
                                                <Tag
                                                    className="mr-2"
                                                    tag={{id: tag.id, name: tag.title}}
                                                    key={tag.id}
                                                />
                                            );
                                        })
                                    }
                                </div>
                            </Marquee>
                        </div>
                    </div>
                    <div className="border-2 rounded-xl border-light overflow-hidden">
                        <div className="h-[400px] relative overflow-hidden">
                            <div className="">
                                <Image
                                    src={
                                        IMAGES_SERVER_URL + props.post.cover.url
                                    }
                                    width={983}
                                    height={436}
                                    className="object-cover w-full h-full"
                                    alt={`${props.post.title} banner`}
                                />
                            </div>

                            <div className="reverse-gradient-bg absolute bottom-0 left-0 w-full pt-7 pb-3 px-5">
                                <span className="text-3xl lg:text-4xl font-secondary tracking-wide">
                                    {props.post.title}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-20 mt-10">
                            {props.post.live && <LinkButton link={props.post.live} title="Live" icon={computerIcon}/>}
                            {props.post.repository && <LinkButton link={props.post.repository} title="Repo" icon={githubIcon}/>}
                        </div>
                        <div className="mt-1 pb-10 pt-10 px-10 lg:px-16">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]} 
                                remarkPlugins={[remarkGfm]}
                                className="text-justify prose">
                                {props.post.content}
                            </ReactMarkdown>
                            <hr className="mt-5" />

                            <div className="flex flex-col sm:flex-row gap-5 mt-10 items-center sm:items-start">
                                <div className="w-[80px] h-[80px]">
                                    <Image
                                        src={
                                            IMAGES_SERVER_URL +
                                            props.presentation.image.url
                                        }
                                        width={80}
                                        height={80}
                                        alt="Picture of me"
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <div className="mt-1 w-full">
                                    <div className="text-light font-primary tracking-wider">
                                        WRITTEN BY
                                    </div>
                                    <div className="text-2xl font-console capitalize font-bold">
                                        {props.presentation.name}
                                    </div>
                                    <div className="font-console">
                                        {props.presentation.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-4/12 mt-10 mt:lg-0">
                    <div className="mb-7 hidden lg:block">
                        <SearchInput className="w-full" enableSearchButton={false} onSubmit={doSearch}/>
                    </div>
                    <div className="text-4xl lg:text-3xl font-primary mb-4">
                        Related Posts
                    </div>
                    <div className="flex flex-col gap-10 items-center">
                        {props.posts.map((item) => {
                            return <PortfolioItem data={item} key={item.id} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
