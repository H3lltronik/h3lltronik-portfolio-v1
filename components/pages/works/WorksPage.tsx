import React, { FC, useEffect, useMemo } from "react";
import { useStore } from "../../../common/store";
import { PortfolioItem } from "../../common/PortfolioItem/PortfolioItem";
import { SearchInput } from "./SearchInput";
import { TagsFilter } from "./TagsFilter";

type WorkPageProps = {
    posts: Blogs.RootObject[];
    tags: Blogs.Tag[];
};
export const WorksPage: FC<WorkPageProps> = (props) => {
    const getFilteredPosts = useStore(state => state.getFilteredPosts);
    const setSearchString = useStore(state => state.setSearchString);
    const searchString = useStore(state => state.searchString);
    const posts = useStore(state => state.posts);
    const filterTags = useStore(state => state.filterTags);

    const filteredPosts = useMemo(() => {
        return getFilteredPosts();
    }, [searchString, posts, getFilteredPosts, filterTags]);

    useEffect(() => {
        const search = (new URL(window.location.href)).searchParams.get('search') ?? '';
        setSearchString(search);
    }, [])

    return (
        <div
            className="text-white container mt-10 lg:mt-16 mx-auto content-container font-secondary text-md tracking-tighter relative
            pb-20 lg:pb-40
        ">
            <div className="flex flex-col lg:flex-row w-full justify-center gap-5 lg:gap-10 mx-auto mb-16 lg:mb-24
            max-w-[300px] lg:max-w-full">
                <SearchInput value={searchString} className="hidden lg:block" onChange={(e: any) => {setSearchString(e.target.value)} } enableSearchButton={false}/>
                <SearchInput value={searchString} className="block lg:hidden" onChange={(e: any) => {setSearchString(e.target.value)} } enableSearchButton={true}/>
                <TagsFilter/>
            </div>

            <div className="flex w-full flex-wrap gap-y-16 px-5">
                {
                    filteredPosts.length <= 0?
                    <div className="text-3xl mx-auto ">
                        No entries found 🤔
                    </div>
                    :
                    filteredPosts.map((item, index) => {
                        return (
                            <PortfolioItem
                                className="mx-auto"
                                key={index}
                                data={item}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
