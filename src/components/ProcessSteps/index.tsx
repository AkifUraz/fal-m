import styles from "./ProcessSteps.module.css";

const steps = [
    {
        step: "01",
        icon: "📞",
        title: "Bizi Arayın",
        desc: "Ücretsiz ön görüşme için bize ulaşın. Durumunuzu kısaca anlatın, gerisini biz halledelim.",
    },
    {
        step: "02",
        icon: "🤝",
        title: "Sizi Dinleyelim",
        desc: "Yüz yüze veya online görüşmede durumunuzu detaylı anlayalım, haklarınızı açıklayalım.",
    },
    {
        step: "03",
        icon: "✅",
        title: "Birlikte Çözelim",
        desc: "Size özel hukuki strateji belirleyelim ve haklarınız için birlikte mücadele edelim.",
    },
];

export default function ProcessSteps() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Nasıl Çalışıyoruz?</h2>
                <p className={styles.subtitle}>
                    Hukuki süreciniz boyunca her adımda yanınızda oluyoruz
                </p>
                <div className={styles.grid}>
                    {steps.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.stepNumber}>{item.step}</div>
                            <div className={styles.icon}>{item.icon}</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.desc}</p>
                            {index < steps.length - 1 && (
                                <div className={styles.connector} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
