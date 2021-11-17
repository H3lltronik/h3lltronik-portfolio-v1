import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import slugify from "slugify";
import { Header } from "../../../components/common/Header/Header";
import { Footer } from "../../../components/pages/home/Footer";
import { WorkItemPage } from "../../../components/pages/works/WorkItemPage";
import { SEO_SITE_URL_BASE, SERVER_URL } from "../../../constants";

type WorkEntryProps = {
    post: Blogs.RootObject;
    presentation: Presentation.RootObject;
    posts: Blogs.RootObject[];
};

const WorkEntry: NextPage<WorkEntryProps> = (props) => {

    return (
        <div id="top" className={`relative`}>
            <Head>
                <title>Works | H3lltronik Developer</title>

                <meta property="description" content={props.post.short_description} />
                <meta property="og:title" content={props.post.short_title} />
                <meta property="og:site_name" content="H3lltronik Developer | Personal Portfolio" />
                <meta property="og:description" content={props.post.short_description} />
                <meta property="og:image" content={props.post.thumbnail.url} />
                <meta property="og:url" content={`${SEO_SITE_URL_BASE}/works/${props.post.id}/${slugify(props.post.title.toLocaleLowerCase())}`} />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content="en_US" />
            </Head>

            <Header className="" />

            <WorkItemPage
                post={props.post}
                presentation={props.presentation}
                posts={props.posts}
            />

            <Footer className="" />
        </div>
    );
};

export default WorkEntry;

export const getStaticPaths: GetStaticPaths = async () => {
    const posts: Blogs.RootObject[] = await fetch(
        `${SERVER_URL}/posts`
    ).then((res) => res.json());

    const paths = posts.map((post) => {
        return {
            params: {
                id: post.id.toString(),
                slug: slugify(post.title.toLocaleLowerCase()),
            },
        };
    });

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps<WorkEntryProps> =
    async function getStaticProps(context) {
        const id = context.params?.id;
        const slug = context.params?.slug;

        const post: Blogs.RootObject = await fetch(
            `${SERVER_URL}/posts/${id}`
        ).then((res) => res.json());

        const presentation: Presentation.RootObject = await fetch(
            `${SERVER_URL}/presentation`
        ).then((res) => res.json());

        const posts: Blogs.RootObject[] = await fetch(
            `${SERVER_URL}/posts?_limit=4`
        ).then((res) => res.json());

        return {
            props: {
                post,
                presentation,
                posts,
            },
        };
    };
