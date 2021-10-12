import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useStore } from "../../common/store";
import { Header } from "../../components/common/Header/Header";
import { Footer } from "../../components/pages/home/Footer";
import { WorksPage } from "../../components/pages/works/WorksPage";
import { SERVER_URL } from "../../constants";

type WorkPageProps = {
    posts: Blogs.RootObject[],
    tags: Blogs.Tag[];
};

const Works: NextPage<WorkPageProps> = (props) => {
    const setPosts = useStore(state => state.setPosts);
    const setTags = useStore(state => state.setTags);
    
    useEffect(() => {
        setPosts(props.posts)
        setTags(props.tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="top" className={`relative`}>
            <Head>
                <title>Works | H3lltronik Developer</title>
            </Head>

            <Header className="" />

            <WorksPage posts={props.posts} tags={props.tags}/>

            <Footer className=""/>
        </div>
    );
};

export default Works;

export const getStaticProps: GetStaticProps<WorkPageProps> =
    async function getStaticProps(context) {
        
        const posts: Blogs.RootObject[] = await fetch(
            `${SERVER_URL}/posts`
        ).then((res) => res.json());

        const tags: Blogs.Tag[] = await fetch(
            `${SERVER_URL}/tags`
        ).then((res) => res.json());

        return {
            props: {
                posts,
                tags,
            },
        };
    };
