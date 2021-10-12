import React, { FC } from 'react';
import { useWindupString } from "windups";
import { Cowsay } from './Cowsay';

// Unnecessary wrapper due to fucking React behavior to be able to show the cow based on a condition
type CowsayEffectProps = {
    text: string
}
export const CowsayEffect: FC<CowsayEffectProps>= (props) => {
    const [text] = useWindupString(
        props.text,
    );

    return (
        <div>
            <Cowsay text={text} />
        </div>
    )
}
