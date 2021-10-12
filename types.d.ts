declare module AboutPageData {

    export interface Timeline {
        id: number;
        title: string;
        content: string;
    }

    export interface Thumbnail {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Large {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Medium {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Small {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Formats {
        thumbnail: Thumbnail;
        large: Large;
        medium: Medium;
        small: Small;
    }

    export interface DesktopImage {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: Formats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        created_at: Date;
        updated_at: Date;
    }

    export interface Thumbnail2 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Large2 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Medium2 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Small2 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Formats2 {
        thumbnail: Thumbnail2;
        large: Large2;
        medium: Medium2;
        small: Small2;
    }

    export interface MobileImage {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: Formats2;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        created_at: Date;
        updated_at: Date;
    }

    export interface RootObject {
        id: number;
        content: string;
        published_at: Date;
        created_at: Date;
        updated_at: Date;
        timeline: Timeline[];
        desktop_image: DesktopImage;
        mobile_image: MobileImage;
    }

}

declare module Blogs {

    export interface Thumbnail2 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Formats {
        thumbnail: Thumbnail2;
    }

    export interface Thumbnail {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: Formats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        created_at: Date;
        updated_at: Date;
    }

    export interface Thumbnail3 {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Large {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Medium {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Small {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        width: number;
        height: number;
        size: number;
        path?: any;
        url: string;
    }

    export interface Formats2 {
        thumbnail: Thumbnail3;
        large: Large;
        medium: Medium;
        small: Small;
    }

    export interface Cover {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: Formats2;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        created_at: Date;
        updated_at: Date;
    }

    export interface Tag {
        id: number;
        title: string;
        published_at?: Date;
        created_at?: Date;
        updated_at?: Date;
    }

    export interface RootObject {
        id: number;
        count: string;
        title: string;
        short_title: string;
        short_description: string;
        content: string;
        repository?: any;
        live?: any;
        published_at: Date;
        created_at: Date;
        updated_at: Date;
        thumbnail: Thumbnail;
        cover: Cover;
        tags: Tag[];
    }

}


declare module Presentation {

    export interface Image {
        id: number;
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats?: any;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl?: any;
        provider: string;
        provider_metadata?: any;
        created_at: Date;
        updated_at: Date;
    }

    export interface RootObject {
        id: number;
        description: string;
        name: string;
        published_at: Date;
        created_at: Date;
        updated_at: Date;
        image: Image;
    }

}

