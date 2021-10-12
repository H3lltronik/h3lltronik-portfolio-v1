import React, { FC, useEffect, useRef, useState } from "react";
import ReactTags, {
    SuggestionComponentProps,
    Tag,
    TagComponentProps
} from "react-tag-autocomplete";
import { useStore } from "../../../common/store";
import { Tag as TagComponent } from "../../common/PortfolioItem/Tag";

export const TagsFilter = () => {
    const ref = useRef<any>(null);
    const tags = useStore((state) => state.tags);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const setFiltersTags = useStore((state) => state.setFiltersTags);

    function onDelete(index: any) {
        if (index < 0) return
        selectedTags.splice(index, 1);
        setSelectedTags([...selectedTags]);
    }
    function onAddition(tag: any) {
        setSelectedTags([...selectedTags, tag]);
    }

    function onValidate(tag: any) {
        return selectedTags.find((t) => t.id == tag.id) == null;
    }

    function handleClose() {
        ref.current?.clearInput()
        ref.current?.onBlur()
    }

    useEffect(() => {
        setFiltersTags(selectedTags.map((t) => ({ id: Number(t.id), title: t.name })));
    }, [selectedTags]);

    return (
        <div className="text-secondary">
            <div className=" font-primary text-2xl">Filter by tags</div>
            <ReactTags
                ref={ref}
                tags={selectedTags}
                maxSuggestionsLength={10}
                suggestions={tags.map((t) => ({ id: t.id, name: t.title }))}
                onDelete={onDelete}
                onAddition={onAddition}
                autoresize={false}
                minQueryLength={0}
                allowNew={false}
                allowBackspace={true}
                placeholderText="Filter by tags..."
                onValidate={onValidate}
                tagComponent={FilterableTag}
                suggestionComponent={SuggestionComponent}
                noSuggestionsText=" [Nothing found]"
                removeButtonText="Click to remove"
                inputAttributes={
                    {
                        onKeyUp: (e: KeyboardEvent) => { if(e.code == 'Escape') handleClose(); },
                    }
                }
                classNames={{
                    root: "relative flex flex-col md:flex-row rounded-2xl bg-secondary items-start lg:items-center pl-1",
                    rootFocused: "",
                    selected: `flex max-w-[300px] flex-wrap gap-2 ${selectedTags.length > 0 && 'py-1'}`,
                    selectedTag: "",
                    selectedTagName: "",
                    search: "",
                    searchInput:
                        "rounded-2xl text-primary px-5 h-[32px] focus:outline-none placeholder-primary tracking-wide text-body-3 sm:text-body-2",
                    suggestions:
                        "bg-primary border border-secondary w-full flex gap-y-10 absolute z-[100] left-0 top-full transform translate-y-2 rounded-xl overflow-hidden",
                    suggestionActive:
                        "text-primary bg-secondary transition duration-300",
                    suggestionDisabled: "6",
                }}
            />
        </div>
    );
};

const FilterableTag: FC<TagComponentProps> = ({
    tag,
    removeButtonText,
    onDelete,
}) => {
    return (
        <button type="button" title={removeButtonText} onClick={onDelete}>
            <TagComponent className="transform hover:bg-red-500" tag={tag} />
        </button>
    );
};

const SuggestionComponent: FC<SuggestionComponentProps> = ({ item, query }) => {
    return (
        <div
            id={item.id + 'xd'}
            className={
                item.name === query
                    ? "match"
                    : "no-match" +
                      "cursor-pointer " +
                      "text-secondary hover:text-primary hover:bg-secondary transition duration-300 px-2 " +
                      " cursor-pointer w-[500px]"
            }>
            <span className="uppercase text-xl font-console ">{item.name}</span>
        </div>
    );
};
{
    /* <TagComponent className="mx-3 my-2 max-w-full" tag={{name: item.name, id: item.id}}/> */
}
