const siteUrl = "https://h3lltronik-portfolio-v1.vercel.app/";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/server-sitemap.xml`,
        ]
    },
}