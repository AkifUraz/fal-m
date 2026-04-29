"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";
import { CheckCircle, MapPin, Phone, Envelope, Lock } from "@phosphor-icons/react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        topic: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError("");
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                setSubmitError(data.error || "Beklenmeyen bir hata oluştu.");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitError("Bağlantı hatası. Lütfen internetinizi kontrol edip tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className={styles.section} id="iletisim">
            <div className="container">
                <h2 className={styles.title}>Size Nasıl Yardımcı Olabiliriz?</h2>
                <p className={styles.subtitle}>
                    Formu doldurun, en kısa sürede sizi arayalım
                </p>

                <div className={styles.grid}>
                    {/* Contact Form */}
                    <div className={styles.formWrapper}>
                        {submitted ? (
                            <div className={styles.successMessage}>
                                <div className={styles.successIcon}><CheckCircle size={48} weight="light" color="var(--primary-color)" /></div>
                                <h3>Mesajınız Alındı!</h3>
                                <p>
                                    En kısa sürede sizinle iletişime geçeceğiz. Acil durumlar
                                    için bizi arayabilirsiniz.
                                </p>
                                <a href="tel:+903121234567" className={styles.callLink}>
                                    <Phone size={20} weight="regular" style={{marginRight: '8px', verticalAlign: 'middle'}}/> +90 (312) 123 45 67
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.field}>
                                    <label htmlFor="name">Adınız Soyadınız</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Adınızı yazın"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="contact">Telefon veya E-posta</label>
                                    <input
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        required
                                        placeholder="Size ulaşabileceğimiz numara veya e-posta"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="topic">Konunuz ne hakkında?</label>
                                    <select
                                        id="topic"
                                        name="topic"
                                        value={formData.topic}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Konu seçin...</option>
                                        <option value="aile">Aile & Boşanma</option>
                                        <option value="is">İş Hukuku</option>
                                        <option value="icra">Borç & Alacak</option>
                                        <option value="ceza">Ceza Hukuku</option>
                                        <option value="gayrimenkul">Gayrimenkul</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="message">
                                        Kısaca anlatın{" "}
                                        <span className={styles.optional}>(isteğe bağlı)</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Durumunuzu birkaç cümleyle özetleyin..."
                                    />
                                </div>

                                <div className={styles.privacy} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Lock size={16} weight="regular" /> Bilgileriniz avukat-müvekkil gizliliği kapsamında
                                    korunur.
                                </div>

                                {submitError && (
                                    <div style={{ color: "#E07A5F", fontSize: "0.95rem", textAlign: "center", marginTop: "0.5rem" }}>
                                        {submitError}
                                    </div>
                                )}

                                <button type="submit" className={styles.submitButton} disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                                    {isSubmitting ? "Gönderiliyor..." : "Ön Görüşme İsteyin"}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className={styles.infoSide}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={24} weight="light" /></div>
                            <div>
                                <h3>Adres</h3>
                                <p>
                                    Kızılay Mah. Menekşe 2 Cad. No.33/11
                                    <br />
                                    Çankaya/ANKARA
                                </p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={24} weight="light" /></div>
                            <div>
                                <h3>Telefon</h3>
                                <p>
                                    <a href="tel:+903121234567">+90 (312) 123 45 67</a>
                                </p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Envelope size={24} weight="light" /></div>
                            <div>
                                <h3>E-posta</h3>
                                <p>
                                    <a href="mailto:info@aslanhan.com">info@aslanhan.com</a>
                                </p>
                            </div>
                        </div>

                        <div className={styles.note}>
                            <strong>Randevu ile görüşme:</strong> Verimli bir görüşme için
                            lütfen önceden randevu alın.
                        </div>

                        <div className={styles.map}>
                            <iframe
                                src="https://maps.google.com/maps?q=39.920837,32.849983&hl=tr&z=15&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                title="Aslanhan Hukuk Bürosu Konum"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
