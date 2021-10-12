const smoothCurve = [0.6, 0.01, -0.05, 0.95];

export const headerContainerVariants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            ease: smoothCurve,
            duration: 1,
        },
    },
};

export const headerVariants = {
    opened: {
        height: 70,
        transition: {
            ease: smoothCurve,
            duration: 0.3,
        },
    },
    closed: {
        height: 50,
        transition: {
            ease: smoothCurve,
            duration: 0.3,
        },
    },
};

export const h3Variants = {
    hidden: {
        opacity: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.2,
        },
    },
    closed: {
        opacity: 1,
        transition: {
            ease: smoothCurve,
            duration: 0.2,
        },
    },
};

export const navItemsVariants = {
    normal: {
        scale: 1,
        transition: {
            ease: smoothCurve,
            duration: 0.4,
        },
    },
    shrink: {
        y: -10,
        scale: 0.5,
        transition: {
            ease: smoothCurve,
            duration: 0.4,
        },
    },
}

export const logoTextVariants = {
    normal: {
        y: 0,
        transition: {
            ease: smoothCurve,
            duration: 0.2,
        },
    },
    shrink: {
        y: -10,
        transition: {
            ease: smoothCurve,
            duration: 0.2,
        },
    },
}

export const initScrollAnim = function (
    onAbove: () => Promise<any>,
    onBelow: () => Promise<any>
) {
    let prevY = window.pageYOffset;
    let animGoing = false;
    const checkScroll = async function (e: any) {
        if (animGoing) return;

        let currY = window.pageYOffset || document.documentElement.scrollTop;
        if (prevY > currY) {
            animGoing = true
            await onBelow();
        } else {
            animGoing = true
            await onAbove();
        }
        animGoing = false;
        prevY = currY;
    };
    window.addEventListener("scroll", checkScroll);
};

export const initStickyCheck = function (
    element: any,
    callback: (entries: any) => any
) {
    const observer = new IntersectionObserver(callback, {
        rootMargin: "-1px 0px 0px 0px",
        threshold: [1],
    });

    observer.observe(element);
};

export const initSmoothScroll = () => {
    document.querySelectorAll('.scrollTo')?.forEach(element => {
        const href = element.getAttribute('href');
        if(!href) return;
        document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
        });
    })
}
