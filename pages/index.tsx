import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useStore } from "../common/store";
import { Header } from "../components/common/Header/Header";
import { ContactMe } from "../components/pages/home/ContactMe";
import { FirstSection } from "../components/pages/home/FirstSection";
import { Footer } from "../components/pages/home/Footer";
import { LatestProjects } from "../components/pages/home/LatestProjects/LatestProjects";
import { WhatWillItBe } from "../components/pages/home/WhatWillItBe/WhatWillItBe";
import { WorkLove } from "../components/pages/home/WorkLove/WorkLove";
import { SEO_SITE_URL_BASE, SERVER_URL } from "../constants";


type HomePageProps = {
  latestPosts: Blogs.RootObject[]
}
const Home: NextPage<HomePageProps> = (props) => {
  const [firstSection, setFirstSection] = useState(false);
  const setHeaderFixedScroll = useStore(state => state.setHeaderFixedScroll);

  useEffect(() => {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize')); // Swiper thingies
    }, 1000);

    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }

    setHeaderFixedScroll(true);
    return () => {
      setHeaderFixedScroll(false);
    }
  }, [])


  function onFirstSectionFinish () {
    setFirstSection(true);
  }

  return (
    <div id="top" className={`relative ${!firstSection && 'overflow-hidden h-screen'}`}>
      <Head>
        <title>H3lltronik Developer</title>

        <meta property="og:title" content="H3lltronik Developer | Personal Portfolio"/>
        <meta property="og:site_name" content="H3lltronik Developer | Personal Portfolio"/>
        <meta property="og:description" content="I am H3lltronik, software engineer and frontend developer and this is my personal portfolio. I am a freelance coder with a lot of experience on frontend web development and React based application but I am also a FullStack developer, I can help you to build your next successful system."/>
        <meta property="og:image" content="/screenshot.png"/>
        <meta property="og:url" content={SEO_SITE_URL_BASE}/>
        <meta property="og:type" content="website"/>
        <meta property="og:locale" content="en_US"/>
      </Head>

      <FirstSection onFinishedAnims={onFirstSectionFinish}/>
      <Header className="sticky" enableAnim={false} enableFadeIn={true}/>
      <WorkLove />
      <WhatWillItBe />
      
      <LatestProjects latestPosts={props.latestPosts}/>
      <ContactMe />
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> =
    async function getStaticProps(context) {
        const latestPosts: Blogs.RootObject[] = await fetch(
            `${SERVER_URL}/posts?_sort=id:DESC&_limit=6&show_in_latest=true`
        ).then((res) => res.json());

        return {
            props: {
                latestPosts,
            },
        };
    };
