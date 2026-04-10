import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./page.module.css";

// Revalidate every 60 seconds
export const revalidate = 60;

interface Post {
    title: string;
    excerpt: string;
    publishedAt: string;
    mainImage: any;
    body: any;
    slug: { current: string };
}

export async function generateMetadata(
    props: {
        params: Promise<{ slug: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    const post = await client.fetch<Post>(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt
    }
  `, { slug: params.slug });

    if (!post) {
        return {
            title: "Makale Bulunamadı",
        };
    }

    return {
        title: `${post.title} | Aslanhan Hukuk Bürosu`,
        description: post.excerpt,
    };
}

export default async function PostPage(
    props: {
        params: Promise<{ slug: string }>;
    }
) {
    const params = await props.params;
    const post = await client.fetch<Post>(`
    *[_type == "post" && slug.current == $slug][0] {
      title,
      excerpt,
      publishedAt,
      mainImage,
      body
    }
  `, { slug: params.slug });

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.article}>
            <header className={styles.header}>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.meta}>
                    {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })
                        : ''}
                </p>
            </header>

            {post.mainImage && (
                <div className={styles.imageWrapper}>
                    <Image
                        src={urlFor(post.mainImage).width(800).height(400).url()}
                        alt={post.title}
                        width={800}
                        height={400}
                        className={styles.image}
                        priority
                    />
                </div>
            )}

            <div className={styles.content}>
                <div className={styles.excerpt}>{post.excerpt}</div>
                {post.body && <PortableText value={post.body} />}
            </div>
        </article>
    );
}
