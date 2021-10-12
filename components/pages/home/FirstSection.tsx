import React, { FC, useEffect, useState } from "react";
import { Pace, WindupChildren } from "windups";
import { SKIP_INITIAL_SEQUENCE } from "../../../constants";

type FirstSectionProps = {
    onFinishedAnims?: () => any
}
export const FirstSection: FC<FirstSectionProps>= (props) => {
    const [firstBlink, setFirstBlink] = useState(false);
    const [secondBlink, setSecondBlink] = useState(false);
    const [h3lltronik, setH3lltronik] = useState(false);

    useEffect(() => {
        const skipInitialSequence = sessionStorage.getItem(SKIP_INITIAL_SEQUENCE);
        entryAnimation(!!skipInitialSequence);
    }, []);

    function entryAnimation (skip: boolean) {
        if (skip) {
            setFirstBlink(false);
            setSecondBlink(false);
            setH3lltronik(true);
            if (props.onFinishedAnims) props.onFinishedAnims()
        }else {
            setTimeout(() => setFirstBlink(true), 140);
            setTimeout(() => setSecondBlink(true), 2000);
            setTimeout(() => {
                setFirstBlink(false);
                setSecondBlink(false);
            }, 4500);
            setTimeout(() => {
                setH3lltronik(true);
                if (props.onFinishedAnims) props.onFinishedAnims()
                sessionStorage.setItem(SKIP_INITIAL_SEQUENCE, "1");
            }, 4600);
        }
    }

    return (
        <div className={`bg-primary`}>
            <div
                className="container mx-auto first-screen flex justify-center text-white font-console">
                <div className="text-left w-full px-5 flex flex-col items-start justify-center
                md:w-[400px] lg:w-[600px] xl:w-auto">
                    <p className="text-2xl lg:text-5xl ">
                        <span className="">H:\&gt;</span>
                        <WindupChildren>
                            <Pace getPace={() => 40}>
                                <span className="text-console-highlight">
                                    {" man "}
                                </span>
                                <span className="">
                                    <span className="">{"h3lltronik"}</span>
                                </span>
                            </Pace>
                        </WindupChildren>
                        {firstBlink && !secondBlink ? (
                            <span className={`animate-hard-pulse`}>_</span>
                        ) : null}
                    </p>
                    {secondBlink && (
                        <p className="text-2xl lg:text-5xl animate-hard-pulse">
                            <span className="">_</span>
                        </p>
                    )}

                    {h3lltronik && (
                        <>
                            <div className="mt-10 mx-auto">
                                <H3lltronikAscii />
                            </div>
                            <WindupChildren>
                                <Pace getPace={() => 60}>
                                    <div className="text-2xl lg:text-5xl text-center mt-5 mx-auto">
                                        <div className="">I am H3lltronik</div>
                                        <div className="">
                                            <span>Sofware Engineer</span>
                                            <span className="animate-hard-pulse">_</span>
                                        </div>
                                    </div>
                                </Pace>
                            </WindupChildren>
                        </>
                    )}

                    {/* <Mouse className="w-5 absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/> */}
                </div>
            </div>
        </div>
    );
};

const H3lltronikAscii = () => {
    return (
        <pre className="text-xs sm:text-sm md:text-xl lg:text-xl 2xl:text-3xl cow-pre">
            <code className="whitespace-pre font-console lg:tracking-wide">{`
 _   _ _____ _ _ _                   _ _
| | | |___ /| | | |_ _ __ ___  _ __ (_) | __
| |_| | |_ \\| | | __| '__/ _ \\| '_ \\| | |/ /
|  _  |___) | | | |_| | | (_) | | | | |   <
|_| |_|____/|_|_|\\__|_|  \\___/|_| |_|_|_|\\_\\
            `}</code>
        </pre>
    );
};
