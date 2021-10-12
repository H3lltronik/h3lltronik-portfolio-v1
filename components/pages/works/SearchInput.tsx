import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { personIcon } from '../../../common/icons';
import { Button } from '../../common/Button';
import { Input } from '../../common/Form/Input';

type SearchInputProps = {
    className?: string,
    onChange?: (event: React.ChangeEvent) => any;
    onSubmit?: (value: string) => any;
    value?: string;
    enableSearchButton?: boolean;
}
export const SearchInput:FC<SearchInputProps> = (props) => {
    const { control } = useForm({mode: 'onBlur'});
    const [value, setValue] = useState("");

    useEffect(() => {
        if (props.value) setValue(props.value);
    }, [props.value])

    function handleSubmit(event: React.KeyboardEvent) {
        console.log(event.code)
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            doSubmit();
        }
    }

    function doSubmit () {
        if (props.onSubmit) {
            console.log("wtf")
            props.onSubmit(value);
        } else {
            console.log("????????")
        }
    }

    function handleOnChange (event: ChangeEvent<HTMLInputElement>) {
        if (props.onChange) props.onChange(event)

        setValue(event.target.value)
    }

    return (
        <div className={`${props.className} flex flex-col justify-start`}>
            <div className="text-secondary font-primary text-2xl">Search</div>

            <div className="relative">
                <Input rules={{required: false}} name="searchParam" control={control} icon={personIcon} placeholder="Search..."
                className="" onKeyDown={handleSubmit} onChange={handleOnChange}
                containerClassName={`rounded-3xl bg-secondary text-primary`} value={value}
                inputClassName={`placeholder-primary text-primary placeholder-primary`}/>
                {
                    props.enableSearchButton &&
                    <Button onClick={doSubmit}
                    className="h-[32px] w-[100px] text-xs absolute right-0 top-1/2 transform -translate-y-1/2 border-r-0 border-none
                    -mr-1 rounded-l-none">
                        <span className="">SEARCH</span>
                    </Button>
                }
            </div>
        </div>
    )
}
