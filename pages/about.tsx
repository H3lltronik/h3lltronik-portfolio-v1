import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { Header } from "../components/common/Header/Header";
import { AboutPage } from "../components/pages/about/AboutPage";
import { Footer } from "../components/pages/home/Footer";
import { SEO_SITE_URL_BASE, SERVER_URL } from "../constants";

type AboutPageProps = {
    content: AboutPageData.RootObject;
};

const Home: NextPage<AboutPageProps> = (props) => {
    useEffect(() => { }, []);

    return (
        <div className={`relative`}>
            <Head>
                <title>About Me | H3lltronik Developer</title>

                <meta name="description" content="My name is Esau Gonzalez but on the wide world of the internet I present myself as 'H3lltronik' since that is the nickname I use in videogames and other websites. I am a software engineer and a frontend developer."/>

                <meta property="og:title" content="About Me | H3lltronik Developer" />
                <meta property="og:site_name" content="H3lltronik Developer | Personal Portfolio" />
                <meta property="og:description" content="My name is Esau Gonzalez but on the wide world of the internet I present myself as 'H3lltronik' since that is the nickname I use in videogames and other websites. I am a software engineer and a frontend developer." />
                <meta property="og:image" content="/cow1.png" />
                <meta property="og:url" content={SEO_SITE_URL_BASE} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
            </Head>

            <Header className="" />

            <AboutPage content={props.content} />

            <Footer className="" />
        </div>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<AboutPageProps> =
    async function getStaticProps(context) {
        const result: AboutPageData.RootObject = await fetch(
            `${SERVER_URL}/about-page`
        ).then((res) => res.json());

        return {
            props: {
                content: result,
            },
            revalidate: 1814400, // 3 weeks
        };
    };
