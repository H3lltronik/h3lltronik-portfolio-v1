export const scrollToPx = (px: number) => {
    window.scrollTo({
        top: px,
        behavior: "smooth",
    });
};

export const scrollToElement = (query: string) => {
    document.querySelector(query)?.scrollIntoView({
        behavior: "smooth",
    });
};

export const Urlize = (value: string) => {
    return encodeURIComponent(value.toLocaleLowerCase());
}