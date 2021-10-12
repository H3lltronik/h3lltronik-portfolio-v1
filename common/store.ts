import create from "zustand";

type StoreState = {
    tags: Blogs.Tag[];
    mobileMenu: boolean;
    searchString: string;
    contactCowSay: string;
    filterTags: Blogs.Tag[];
    selectedTags: Blogs.Tag[];
    posts: Blogs.RootObject[];
    headerFixedScroll: boolean;
    setContactCowSay: (text: string) => any;
    setHeaderFixedScroll: (headerFixedScroll: boolean) => any;
    setMobileMenu: (isOpen: boolean) => any;
    setTags: (tags: Blogs.Tag[]) => any;
    setPosts: (posts: Blogs.RootObject[]) => any;
    getFilteredPosts: () => Blogs.RootObject[];
    addTagFilter: (tag: Blogs.Tag) => any;
    setFiltersTags: (filterTags: Blogs.Tag[]) => any;
    removeTagFilter: (tag: Blogs.Tag) => any;
    setSearchString: (search: string) => any;
};

export const useStore = create<StoreState>((set, get) => ({
    tags: [],
    filterTags: [],
    posts: [],
    selectedTags: [],
    searchString: "",
    contactCowSay: "What are you waiting for? Send him a message!",
    mobileMenu: false,
    headerFixedScroll: false,
    setHeaderFixedScroll: (headerFixedScroll: boolean) =>
        set((state: StoreState) => {
            return { headerFixedScroll };
        }),
    setContactCowSay: (text: string) =>
        set((state: StoreState) => {
            return { contactCowSay: text };
        }),
    setMobileMenu: (isOpen: boolean) =>
        set((state: StoreState) => {
            return { mobileMenu: isOpen };
        }),
    setTags: (tags: Blogs.Tag[]) =>
        set((state: StoreState) => {
            return { tags };
        }),
    setPosts: (posts: Blogs.RootObject[]) =>
        set((state: StoreState) => {
            return { posts };
        }),
    setFiltersTags: (filterTags: Blogs.Tag[]) =>
        set((state: StoreState) => {
            return { filterTags };
        }),
    getFilteredPosts: () => {
        const posts = get().posts;
        const filterTags = get().filterTags;
        const searchLower = get().searchString.toLowerCase();
        const searchFilter = posts.filter(
            (p) =>
                p.title.toLowerCase().includes(searchLower) ||
                p.content.toLowerCase().includes(searchLower) ||
                p.short_title.toLowerCase().includes(searchLower) ||
                p.short_description.toLowerCase().includes(searchLower)
        );
        const tagsFilter = [...searchFilter];
        let res = tagsFilter.filter(post => {
            return post.tags.some(pTag => filterTags.some(fTag => {
                // console.log("searching for", pTag.id, " but current ", fTag)
                return fTag.id === pTag.id
            }));
        })

        if (filterTags.length <= 0)
            res = [...searchFilter];

        return res;
    },
    addTagFilter: (tag: Blogs.Tag) =>
        set((state: StoreState) => {
            const filterTags = { ...state.filterTags };
            filterTags.push(tag);

            return { filterTags };
        }),
    removeTagFilter: (tag: Blogs.Tag) =>
        set((state: StoreState) => {
            const filterTags = { ...state.filterTags };
            filterTags.filter((tag) => tag.id != tag.id);

            return { filterTags };
        }),
    setSearchString: (search: string) =>
        set((state: StoreState) => {
            return { searchString: search };
        }),
}));
