import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { Header } from "../components/common/Header/Header";
import { AboutPage } from "../components/pages/about/AboutPage";
import { Footer } from "../components/pages/home/Footer";
import { SERVER_URL } from "../constants";

type AboutPageProps = {
    content: AboutPageData.RootObject;
};

const Home: NextPage<AboutPageProps> = (props) => {
    useEffect(() => {}, []);

    return (
        <div className={`relative`}>
            <Head>
                <title>About | H3lltronik Developer</title>
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
