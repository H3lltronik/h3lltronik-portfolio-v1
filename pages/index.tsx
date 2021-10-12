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
import { SERVER_URL } from "../constants";


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
      </Head>

      <FirstSection onFinishedAnims={onFirstSectionFinish}/>
      <Header className="sticky" enableAnim={true} enableFadeIn={true}/>
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
