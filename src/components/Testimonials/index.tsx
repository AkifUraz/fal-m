import styles from "./Testimonials.module.css";

const testimonials = [
    {
        text: "Boşanma sürecinde çok zorlandım. Aslanhan Hukuk ekibi her adımda yanımda oldu, haklarımı korudu. Şimdi çocuklarımla huzurlu bir hayat sürdürüyorum.",
        initials: "A.K.",
        area: "Aile Hukuku",
    },
    {
        text: "İşten haksız yere çıkarıldığımda ne yapacağımı bilmiyordum. Avukatım sayesinde hem tazminatımı aldım hem de işe iade edildim.",
        initials: "M.Y.",
        area: "İş Hukuku",
    },
    {
        text: "Alacak davamı hızlı ve profesyonel bir şekilde sonuçlandırdılar. Her aşamada bilgilendirildim, hiç tedirgin olmadım.",
        initials: "S.D.",
        area: "İcra Hukuku",
    },
];

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Müvekkillerimiz Ne Diyor?</h2>
                <p className={styles.subtitle}>
                    Güvenle hizmet verdiğimiz vatandaşların deneyimleri
                </p>
                <div className={styles.grid}>
                    {testimonials.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.quoteIcon}>&ldquo;</div>
                            <p className={styles.text}>{item.text}</p>
                            <div className={styles.author}>
                                <div className={styles.avatar}>{item.initials}</div>
                                <div>
                                    <span className={styles.name}>{item.initials}</span>
                                    <span className={styles.area}>{item.area}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
