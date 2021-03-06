import { Post } from "./post";

type Edit = Omit<Post, "deleted_at"|"created_at"|"updated_at"|"published_at"|"relatedPosts"|"slug"> & {
    relatedPosts: string[],
    slug?: Post["slug"]
}