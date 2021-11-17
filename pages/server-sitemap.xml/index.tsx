import { GetServerSideProps, GetStaticProps } from "next";
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { portfolioItemUrl } from "../../common/utils";
import { SEO_SITE_URL_BASE, SERVER_URL } from "../../constants";


export const getServerSideProps: GetServerSideProps = async ctx => {
    const posts: Blogs.RootObject[] = await fetch(
        `${SERVER_URL}/posts`
    ).then((res) => res.json());

    const fields: ISitemapField[] = posts.map(post => {
        return {
            loc: SEO_SITE_URL_BASE + portfolioItemUrl(post.id, post.title),
            lastmod: new Date().toISOString(),
        }
    });

    return getServerSideSitemap(ctx, fields);
}

export default function Site() { }