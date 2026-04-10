"use client";

import { useState } from "react";
import styles from "./FAQAccordion.module.css";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "İlk görüşme gerçekten ücretsiz mi?",
        answer:
            "Evet. İlk ön görüşmede durumunuzu değerlendiriyor, haklarınızı ve izlenecek yolu sizinle paylaşıyoruz. Bu görüşme için herhangi bir ücret talep etmiyoruz.",
    },
    {
        question: "Boşanırsam çocuklarımı kaybeder miyim?",
        answer:
            "Hayır. Türk hukukunda velayet kararı çocuğun üstün yararına göre verilir. Mahkeme; çocuğun yaşı, ebeveynlerin yaşam koşulları ve çocuğun tercihi gibi kriterleri değerlendirir. Her durumda çocuğunuzla ilişkinizi korumak için mücadele ediyoruz.",
    },
    {
        question: "İşten çıkarıldım, ne yapmalıyım?",
        answer:
            "Öncelikle sakin olun ve hiçbir belge imzalamayın. İşe iade davası açmak için 1 aylık süreniz var. Kıdem ve ihbar tazminatı haklarınız konusunda sizi detaylı bilgilendiriyoruz.",
    },
    {
        question: "Avukatlık ücreti ne kadar?",
        answer:
            "Ücretlendirme, davanın türüne ve karmaşıklığına göre değişir. İlk görüşmede durumunuzu anladıktan sonra size şeffaf bir ücret bilgisi sunuyoruz. Taksitlendirme imkanı da mevcuttur.",
    },
    {
        question: "Dava süreci ne kadar sürer?",
        answer:
            "Süre davanın türüne göre değişir. Anlaşmalı boşanma 1-3 ay sürerken, çekişmeli davalar 6 ay ile 2 yıl arasında sürebilir. Her aşamada sizi bilgilendiriyor, süreci şeffaf şekilde yönetiyoruz.",
    },
    {
        question: "Borcum var ve evime haciz gelecek diye korkuyorum. Ne yapabilirim?",
        answer:
            "Kanun, temel yaşam ihtiyaçlarınız için gerekli eşyaların haczedilemeyeceğini güvence altına alır. Ayrıca borç yapılandırma, menfi tespit davası veya itiraz gibi yasal yollarla süreci lehinize çevirebiliriz. Panik yapmadan önce mutlaka bir avukata danışın.",
    },
    {
        question: "Satın aldığım evde/arsada tapu sorunu çıktı, ne yapmalıyım?",
        answer:
            "Tapu iptal-tescil davaları, imar sorunları veya kamulaştırma gibi konularda hukuki haklarınız mevcuttur. Mülkünüzle ilgili tüm belgeleri toplayarak bize başvurmanız yeterli; durumu analiz edip en uygun hukuki yolu sizinle birlikte belirleyelim.",
    },
    {
        question: "Hakkımda ceza soruşturması başlatılmış, tutuklanır mıyım?",
        answer:
            "Her soruşturma tutuklamayla sonuçlanmaz. Tutuklama için somut delil ve kaçma ya da delil karartma şüphesi gerekir. Soruşturma aşamasında avukat desteği almak, haklarınızı korumak açısından kritik öneme sahiptir. Hemen profesyonel destek alın.",
    },
    {
        question: "Aldığım ürün kusurlu çıktı ama mağaza iade almıyor. Haklarım neler?",
        answer:
            "Tüketici Hakları Kanunu size değişim, onarım, iade veya indirim hakkı tanır. Mağaza kabul etmezse Tüketici Hakem Heyeti'ne başvurabilir veya tüketici mahkemesinde dava açabilirsiniz. Belirli tutarın altındaki uyuşmazlıklarda hakem heyeti kararı bağlayıcıdır.",
    },
    {
        question: "Trafik kazası geçirdim, tazminat alabilir miyim?",
        answer:
            "Evet. Maddi ve manevi tazminat haklarınız bulunmaktadır. Tedavi giderleri, iş gücü kaybı ve araç hasarı gibi kalemler için karşı tarafın sigortasına veya doğrudan sorumluya dava açılabilir. Kaza tespit tutanağını ve hastane raporlarını muhafaza etmeniz önemlidir.",
    },
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.title}>Sık Sorulan Sorular</h2>
                <p className={styles.subtitle}>
                    Aklınızdaki soruları yanıtlıyoruz
                </p>
                <div className={styles.accordion}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${openIndex === index ? styles.open : ""}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggle(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>
                                <span className={styles.icon}>
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>
                            <div
                                className={styles.answer}
                                style={{
                                    maxHeight: openIndex === index ? "300px" : "0",
                                }}
                            >
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
