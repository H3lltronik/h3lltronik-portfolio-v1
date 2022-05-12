import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { scrollToElement } from "../../../common/utils";
import { IMAGES_SERVER_URL } from "../../../constants";
import { Button } from "../../common/Button";
import remarkGfm from 'remark-gfm'

type AboutPageProps = {
    content: AboutPageData.RootObject;
};
export const AboutPage: FC<AboutPageProps> = (props) => {

    return (
        <div
            className="text-white container mt-10 lg:mt-16 mx-auto content-container font-secondary text-md tracking-tighter relative
            pb-20 lg:pb-40
            ">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-4/12">
                    <div className="hidden lg:block">
                        <Image
                            alt="about me image"
                            width={400}
                            height={800}
                            className="object-contain"
                            src={IMAGES_SERVER_URL + props.content.desktop_image.url}
                        />
                    </div>
                    <div className="inline-block lg:hidden w-screen h-[200px] relative">
                        <Image
                            alt="about me image"
                            width={800}
                            height={200}
                            layout="fill"
                            className="object-cover w-full min-h-[200px]"
                            src={IMAGES_SERVER_URL + props.content.mobile_image.url}
                        />
                    </div>
                </div>
                <div className="mx-auto w-full lg:w-8/12 px-10 flex flex-col">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className="text-justify prose mx-auto">
                        {props.content.content}
                    </ReactMarkdown>

                    <div className="mt-auto">
                        <a href="/Carlos Esau.pdf" target="_blank">
                            <Button className="mt-10 w-[250px]">
                                <span className="">DOWNLOAD CV</span>
                            </Button>
                        </a>
                    </div>
                </div>
            </div>


            <div className="mt-32 lg:pl-10 2xl:pl-0">
                <div className="text-center uppercase font-secondary text-4xl lg:text-5xl mb-16 lg:mb-24 tracking-wider">
                    <span>- Timeline -</span>
                </div>
                <div className="flex flex-col lg:flex-row ">
                    <Timeline timeline={props.content.timeline}/>
                    <div className="flex flex-col gap-36">
                        {
                            props.content.timeline.map((item, index) => {
                                return (
                                    <div id={`timeline-${item.id}`} className="observable mx-auto w-full px-10 lg:pl-24" key={index}
                                    style={{scrollMarginTop: '100px'}}>
                                        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} className="text-justify prose mx-auto">
                                            {item.content}
                                        </ReactMarkdown>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

type TimelineProps = {
    timeline: AboutPageData.Timeline[],
}
const Timeline:FC<TimelineProps> = (props ) => {
    const [observing, setObserving] = useState<any>(null);
    
    useEffect(() => {
        const items = document.querySelectorAll(".observable");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    setObserving(entry.target.id)
                
            });
        }, {
            rootMargin: "0px",
            threshold: 0
        })

        items.forEach(element => {
            observer.observe(element);
        });
        
        return () => {
            items.forEach(element => {
                observer.unobserve(element);
            });
        }
    }, [])

    return (
        <div className="w-full lg:w-[350px] mb-5 lg:mb-0 px-10 lg:px-0 sticky top-0 left-0 gradient-bg pt-2 z-50">
            <div className="w-full h-[75px] lg:h-[350px] max-h-screen sticky top-5 left-0 flex
            lg:flex-col lg:items-center justify-between
            flex-row lg:overflow-visible items-start
            ">
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-full h-[2px] lg:h-full lg:w-[2px] bg-secondary
                mt-[14px] lg:mt-0
                z-[-1]"></div>
                    
                {
                    props.timeline.map((item, index, array) => {
                        return (
                            <button className="flex relative group text-left" key={index} 
                                onClick={() => {scrollToElement(`#timeline-${item.id}`)}}>
                                <div className={`w-[30px] h-[30px] rounded-full border-2 border-secondary bg-primary
                                    group-hover:bg-secondary transition duration-300
                                    ${observing == `timeline-${item.id}` && 'bg-secondary'}`}>
                                </div>

                                <div className={`absolute w-[50px] lg:w-[80px] mt-10 lg:mt-0 text-xs lg:text-sm
                                    top-1/2 -translate-y-1/2 left-1/2 lg:right-0 transform -translate-x-1/2 lg:translate-x-[50px]`}>
                                        {item.title}
                                </div>
                            </button>
                        )
                    })
                }


            </div>
        </div>
    );
}