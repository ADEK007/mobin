export type BlogCategory = {
    id: string;
    title: string;
    slug: string;
    description?: string;
    thumbnail_url?: string;
    created_at?: string;
};

export type Blog = {
    id: number;
    category_id: string;
    title: string;
    slug: string;
    content: string;
    cover_image?: string;
    created_at?: string;
    status?: string;
    published_at?: string;
    read_time?: string;
};
