import React, { FC, useEffect, useState } from "react";

type CowsayProps = {
    className?: string;
    text: string;
    eyes?: [string, string];
    tongue?: string;
};

const MAX_CHARACTERS_PER_ROW = 30;
export const Cowsay: FC<CowsayProps> = (props) => {
    const [finalString, setFinalString] = useState("");

    useEffect(() => {
        calculateStrings();
    }, [props])

    function calculateStrings () {
        const chunks = Math.ceil(props.text.length / MAX_CHARACTERS_PER_ROW);
        const result = [];
        for (let i = 0; i < chunks; i++) {
            let leftDivisor = "/";
            let rightDivisor = "\\";

            let idxStart = i * MAX_CHARACTERS_PER_ROW;
            let idxEnd = (i + 1) * MAX_CHARACTERS_PER_ROW;
            let pad = props.text.length;

            if (idxEnd > props.text.length) {
                idxEnd = props.text.length;
            }

            if (pad >= MAX_CHARACTERS_PER_ROW) pad = MAX_CHARACTERS_PER_ROW

            let substring = props.text.substring( idxStart, idxEnd);
            substring = substring.padEnd(pad, " ")

            if (i > 0 && i < chunks-1) {
                leftDivisor = "|";
                rightDivisor = "|";
            } else if (i == chunks-1) {
                leftDivisor = "\\";
                rightDivisor = "/";
            }

            if (chunks == 1) {
                leftDivisor = "<";
                rightDivisor = ">";
            }


            substring = `${leftDivisor} ${substring} ${rightDivisor}`;
            result.push(substring)
        }
        
        const [upperDivisor, lowerDivisor] = calculateVerticalDivisors();

        setFinalString(` ${upperDivisor}${result.map(s => `<div>${s}</div>`).join('')} ${lowerDivisor}`);
    }

    function calculateVerticalDivisors () {
        let upperDivisor = "";
        let lowerDivisor = "";
        let forCond = 0;
        if (props.text.length > MAX_CHARACTERS_PER_ROW) {
            forCond = MAX_CHARACTERS_PER_ROW + 2;
        } else  {
            forCond = props.text.length+2;
        }
        for (let i = 0; i < forCond; i++) {
            upperDivisor += "_";
            lowerDivisor += "-"
        }

        return [upperDivisor, lowerDivisor]
    }

    return (
        <>
            {
                finalString.length > 0 &&
                <pre className="text-sm md:text-xl lg:text-xl 2xl:text-3xl leading-tight">
                    <code className="whitespace-pre font-console lg:tracking-wide" dangerouslySetInnerHTML={{__html: finalString}}/>
                </pre>
            }
            <pre className="-mt-3 text-lg md:text-xl lg:text-xl 2xl:text-3xl cow-pre">
                <code className="whitespace-pre font-console lg:tracking-wide" >{`
        \\   ^__^
         \\  (òó)\_______
            (__)\       )\\/\\
                ||----w |
                ||     ||
            `}</code>
            </pre>
        </>
    );
};
