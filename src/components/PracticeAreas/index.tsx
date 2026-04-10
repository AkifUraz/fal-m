import Link from "next/link";
import styles from "./PracticeAreas.module.css";

const areas = [
    {
        icon: "👨‍👩‍👧‍👦",
        title: "Aile & Boşanma",
        slug: "aile-hukuku",
        desc: "Boşanma sürecinde haklarınızı koruyoruz. Velayet, nafaka ve mal paylaşımı konularında yanınızdayız.",
    },
    {
        icon: "💼",
        title: "İş Hukuku",
        slug: "is-hukuku",
        desc: "İşten çıkarılma, tazminat alacakları ve işe iade davalarınızda mücadele ediyoruz.",
    },
    {
        icon: "📋",
        title: "Borç & Alacak",
        slug: "icra-iflas-hukuku",
        desc: "Borç yapılandırma, alacak tahsili ve icra takibi süreçlerinde çözüm üretiyoruz.",
    },
    {
        icon: "⚖️",
        title: "Ceza Hukuku",
        slug: "ceza-hukuku",
        desc: "Soruşturma ve kovuşturma süreçlerinde hukuki haklarınızı en etkin şekilde savunuyoruz.",
    },
    {
        icon: "🏛️",
        title: "İdare Hukuku",
        slug: "idare-hukuku",
        desc: "İdari işlemlerin iptali, tam yargı davaları ve kamulaştırma süreçlerinde temsil ediyoruz.",
    },
    {
        icon: "🏠",
        title: "Gayrimenkul",
        slug: "gayrimenkul-hukuku",
        desc: "Tapu uyuşmazlıkları, kira sorunları ve inşaat sözleşmelerinde haklarınızı arıyoruz.",
    },
];

export default function PracticeAreas() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Nasıl Yardımcı Oluruz?</h2>
                <p className={styles.subtitle}>
                    Her soruna özel, size özel çözümler üretiyoruz
                </p>
                <div className={styles.grid}>
                    {areas.map((area, index) => (
                        <Link
                            key={index}
                            href={`/calisma-alanlari/${area.slug}`}
                            className={styles.card}
                        >
                            <div className={styles.icon}>{area.icon}</div>
                            <h3 className={styles.cardTitle}>{area.title}</h3>
                            <p className={styles.cardDesc}>{area.desc}</p>
                            <span className={styles.cardLink}>Detaylı Bilgi →</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
