import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { personIcon } from "../../common/icons";
import { useStore } from "../../common/store";
import { Button } from "../common/Button";
import { Input } from "../common/Form/Input";

export const ContactForm = () => {
    const { handleSubmit, control, formState } = useForm({mode: 'onBlur'});
    const [formSent, setFormSent] = useState(false);
    const setContactCowSay = useStore(state => state.setContactCowSay);

    async function onSubmit(data: any) {
        setTimeout(() => {
            setContactCowSay("Your message is being sent,   Thank you! <3")
        }, 500);
        setFormSent(true);

        const result = await fetch("/api/contact", {
            method: 'POST',
            body: JSON.stringify(data),
        });
        console.log("Contact info", result.body)
    };

    function doSubmit () {
        handleSubmit(onSubmit)();
    }

    useEffect(() => {
        const errorKeys = Object.keys(formState.errors)
        if(errorKeys.length >= 3) {
            setContactCowSay("Yes, this form is validated,  stop playing around, I mean   Muuuu ~~")
        } else if (errorKeys[0] == 'email') {
            setContactCowSay("That does not look like a real email, are you trying to fool me?(`ー´)")
        } else if (errorKeys[0] == 'message') {
            setContactCowSay("Come on, say something, a     simple 'Nice website!' will   make his day waaay happier")
        } 
        // else if (errorKeys.length <= 0 && !formSent) {
        //     setContactCowSay("You are good to go, hit the   submit button!")
        // }
    }, [formState, JSON.stringify(formState), setContactCowSay])
    
    return (
        <div>
            <div className="text-title-3 sm:text-headline-1">Contact Me</div>

            <div className="">
                <div className="text-body-2 sm:text-body-1">Let’s build something</div>
                <div className="text-body-1 sm:text-headline-2">
                    <strong>together (u‿u *)</strong>
                </div>
            </div>

            <div className="">
                <Input rules={{ required: true }} control={control} name="fullName" icon={personIcon} inputClassName={`text-secondary placeholder-light`}
                iconClassName={`text-secondary`} containerClassName={`py-2`}
                label="*Your Name" placeholder="Enter your full name" className="mt-10 z-[1]"/>
                <Input rules={{ required: true, pattern: /^\S+@\S+$/i }} control={control} name="email" icon={personIcon} inputClassName={`text-secondary placeholder-light`}
                iconClassName={`text-secondary`} containerClassName={`py-2`}
                label="*Your Email" placeholder="Enter your email" className="mt-16 z-[1]"/>
                <Input rules={{ required: true }} control={control} name="message" icon={personIcon} inputClassName={`text-secondary placeholder-light`}
                iconClassName={`text-secondary`} containerClassName={`py-2`}
                label="*Your Message" placeholder="Enter your message" className="mt-16 z-[1]"/>

                <div className="flex flex-col mt-16">
                    <small>* Fields are required</small>
                    <Button onClick={doSubmit} disabled={formSent}
                    className={`mt-5 bg-black text-secondary border-primary 
                    ${!formSent && 'hover:bg-secondary group hover:border-primary'}`}>
                        <span className="group-hover:text-primary duration-300">SUBMIT</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
