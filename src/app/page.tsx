import Link from "next/link";
import styles from "./page.module.css";
import PracticeAreas from "@/components/PracticeAreas";
import Hero from "@/components/Hero/Hero";
import ProcessSteps from "@/components/ProcessSteps";
import FAQAccordion from "@/components/FAQAccordion";
import ContactSection from "@/components/ContactSection";
import { client } from "@/sanity/lib/client";

// Interface for Post
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  let posts: Post[] = [];
  try {
    posts = await client.fetch<Post[]>(`
      *[_type == "post"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt
      }
    `);
  } catch (error) {
    console.warn("Failed to fetch posts:", error);
  }

  return (
    <>
      <Hero />
      <PracticeAreas />
      <ProcessSteps />

      {/* Articles Section */}
      {posts.length > 0 && (
        <section className={styles.articlesSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Haklarınızı Bilin</h2>
            <p className={styles.sectionSubtitle}>
              Hukuki süreçler hakkında bilgilendirici makalelerimiz
            </p>
            <div className={styles.articlesList}>
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/makaleler/${post.slug.current}`}
                  className={styles.articleCard}
                >
                  <span className={styles.articleDate}>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString(
                        "tr-TR",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                      : "Tarih Yok"}
                  </span>
                  <h3 className={styles.articleTitle}>{post.title}</h3>
                  <span className={styles.readMore}>Devamını Oku →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQAccordion />
      <ContactSection />
    </>
  );
}
