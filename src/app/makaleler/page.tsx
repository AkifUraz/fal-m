import Link from "next/link";
import { client } from "@/sanity/lib/client";
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
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function BlogIndexPage() {
    // Fetch posts from Sanity
    // Note: Ensure NEXT_PUBLIC_SANITY_PROJECT_ID and DATASET are set in .env.local
    const posts = await client.fetch<Post[]>(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt
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
                            <h2 className={styles.postTitle}>
                                <Link href={`/makaleler/${post.slug.current}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p className={styles.postMeta}>
                                {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' })
                                    : ''}
                            </p>
                            <p className={styles.postExcerpt}>{post.excerpt}</p>
                            <Link href={`/makaleler/${post.slug.current}`} className={styles.readMore}>
                                Devamını Oku →
                            </Link>
                        </article>
                    ))
                ) : (
                    <p className={styles.empty}>Henüz yayınlanmış bir makale bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
}
