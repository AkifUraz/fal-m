import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import PracticeAreas from "@/components/PracticeAreas";
import Hero from "@/components/Hero/Hero";
import ProcessSteps from "@/components/ProcessSteps";
import FAQAccordion from "@/components/FAQAccordion";
import ContactSection from "@/components/ContactSection";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Interface for Post
interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: any;
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
        publishedAt,
        mainImage
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
                  {post.mainImage && (
                    <div className={styles.articleImageWrap}>
                      <Image
                        src={urlFor(post.mainImage).width(400).height(220).url()}
                        alt={post.title}
                        width={400}
                        height={220}
                        className={styles.articleImage}
                      />
                    </div>
                  )}
                  <div className={styles.articleContent}>
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
                  </div>
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
