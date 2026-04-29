import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
    title: "Makaleler | Aslanhan Hukuk Bürosu",
    description: "Hukuki makaleler, yargı kararları ve güncel değerlendirmeler.",
};

// Interface for Post
interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt: string;
    publishedAt: string;
    mainImage?: any;
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function BlogIndexPage() {
    // Fetch posts from Sanity
    const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      mainImage
    }
  `);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Makaleler</h1>
                <p className={styles.subtitle}>Hukuki değerlendirmeler ve güncel yargı kararları.</p>
            </header>

            <div className={styles.postList}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post._id} className={styles.postItem}>
                            {post.mainImage && (
                                <Link href={`/makaleler/${post.slug.current}`} className={styles.imageLink}>
                                    <Image
                                        src={urlFor(post.mainImage).width(800).height(400).url()}
                                        alt={post.title}
                                        width={800}
                                        height={400}
                                        className={styles.postImage}
                                    />
                                </Link>
                            )}
                            <div className={styles.postContent}>
                                <p className={styles.postMeta}>
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })
                                        : ''}
                                </p>
                                <h2 className={styles.postTitle}>
                                    <Link href={`/makaleler/${post.slug.current}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className={styles.postExcerpt}>{post.excerpt}</p>
                                <Link href={`/makaleler/${post.slug.current}`} className={styles.readMore}>
                                    Devamını Oku →
                                </Link>
                            </div>
                        </article>
                    ))
                ) : (
                    <p className={styles.empty}>Henüz yayınlanmış bir makale bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
}

