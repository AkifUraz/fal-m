import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

// Temporary data store - will be populated based on user input
const practiceAreasData: Record<string, { title: string; content: string }> = {
    "icra-iflas-hukuku": {
        title: "İcra ve İflas Hukuku",
        content: `Türk hukuk sisteminde alacak ve borç ilişkilerinin yasal zeminde tahsilini düzenleyen İcra ve İflas Hukuku; cebri icra prosedürleri, haciz işlemleri, iflas ertelemeleri ve konkordato süreçleri gibi teknik uzmanlık gerektiren geniş bir alanı kapsamaktadır. Aslanhan Hukuk & Danışmanlık, ekonomik süreçlerin hukuki boyutunu titizlikle yöneterek, gerek alacaklı gerekse borçlu sıfatını taşıyan müvekkillerine stratejik çözüm ortaklığı sunmaktadır.

Başlıca Çalışma Alanları:

İcra Takip Prosedürleri: İlamlı ve ilamsız takipler, kambiyo senetlerine (Çek, Senet, Poliçe) özgü haciz yolları ve rehin paraya çevrilmesi yoluyla takiplerin başlatılması ve yönetimi.

Dava Süreçleri: İtirazın iptali ve kaldırılması, menfi tespit (borçlu olmadığının tespiti) ve istirdat (geri alım) davalarının takibi.

İflas ve Konkordato: Şirketlerin borç yapılandırma süreçleri, iflas yoluyla takip, iflas davası ve konkordato projesinin hazırlanarak tasdik sürecinin yönetimi.

Kira Hukuku Kaynaklı Takipler: Kira alacaklarının tahsili ve taşınmaz tahliye süreçlerinin icra hukuku çerçevesinde yürütülmesi.

Diğer İşlemler: İhalenin feshi, tasarrufun iptali davaları, ihtiyati haciz kararlarının alınması ve hacze iştirak prosedürleri.`
    },
    "ceza-hukuku": {
        title: "Ceza Hukuku",
        content: `Aslanhan Hukuk & Danışmanlık, Ceza Hukuku alanında müvekkillerine soruşturma aşamasından itibaren ihtiyaç duyulan her türlü avukatlık ve danışmanlık hizmetini sağlamaktadır. Soruşturma ve dava öncesi süreçlerden başlayarak, kovuşturma ve infaz aşamalarına kadar cezai yaptırım riski bulunan tüm işlemlere ilişkin hukuki destek sunulmaktadır.

Başlıca Çalışma Alanları:

Ağır Ceza Yargılamaları: Kasten öldürme, nitelikli dolandırıcılık, zimmet, irtikap ve örgütlü suçlar gibi ağır yaptırım öngören davaların takibi ve savunması.

Ekonomik ve Ticari Suçlar: Şirket yöneticilerinin cezai sorumluluğu, vergi suçları ve sermaye piyasası suçlarına ilişkin savunma ve danışmanlık hizmetleri.

İcra ve İflas Suçları: Karşılıksız çek, taahhüdü ihlal ve hileli iflas suçlarından kaynaklanan davaların takibi.

Fikri ve Sınai Haklar Ceza Hukuku: Marka hakkına tecavüz ve telif hakları ihlallerinden doğan cezai süreçlerin yönetimi.

Önleyici Danışmanlık: Şirketler ve şahıslar için potansiyel cezai risklerin analizi ve hukuki koruma süreçlerinin yönetimi.`
    },
    "idare-hukuku": {
        title: "İdare ve Vergi Hukuku",
        content: `Aslanhan Hukuk & Danışmanlık, idarenin her türlü eylem ve işlemi karşısında, hukuka aykırılıkların giderilmesi ve vergi mevzuatından doğan ihtilafların çözümü konusunda uzmanlaşmış bir hizmet sunmaktadır. Büromuz, idare karşısında müvekkillerinin hak arama özgürlüğünü etkin bir şekilde kullanmasını sağlamayı ve uyuşmazlıkların idari veya yargısal yollarla çözümünü hedeflemektedir.

Başlıca Çalışma Alanları:

İdari Başvuru ve İtirazlar: İdarenin tesis ettiği işlemlere karşı gerekli idari başvuruların yapılması ve itiraz süreçlerinin yönetimi.

İptal ve Tam Yargı Davaları: Hukuka aykırı idari işlemlerin iptali ve idarenin kusurlu eylemleri nedeniyle oluşan zararların tazmini için tam yargı davalarının takibi.

Vergi ve Ceza Uyuşmazlıkları: Vergi suç ve cezalarından kaynaklanan problemlerin çözümü, gümrük mevzuatı kaynaklı idari para cezalarına karşı hukuki süreçlerin yürütülmesi.

Uzlaşma Süreçleri: Dava açılmadan önce idari yolların tüketilmesi ve uzlaşma komisyonlarında müvekkil temsili.`
    },
    "gayrimenkul-hukuku": {
        title: "Gayrimenkul Hukuku",
        content: `Aslanhan Hukuk & Danışmanlık, gayrimenkul hukuku alanında mülkiyet sahiplerine ve yatırımcılara, mülkiyetin devri, yönetimi ve korunması konularında kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Taşınmazların alım-satımı, kiralanması, ayni ve şahsi hakların tesisi süreçlerinde hukuki güvenlik ve mevzuata uygunluk esas alınarak süreç yönetilmektedir.

Başlıca Çalışma Alanları:

Hukuki Risk Analizi: Gayrimenkullerin hukuki durum tespitinin yapılması ve raporlanması.

Sözleşme Süreçleri: Alım-satım ve kiralama sözleşmelerinin hazırlanması, incelenmesi ve müzakere süreçlerinin yönetimi.

Ayni ve Şahsi Haklar: İpotek, intifa, irtifak gibi ayni ve şahsi hak tesisi sözleşmelerinin düzenlenmesi.

Yabancıların Mülk Edinimi: Yabancı gerçek ve tüzel kişilerin Türkiye'de gayrimenkul edinme süreçlerinin takibi.

Tapu ve Kadastro: Tapu iptal ve tescil davaları ile tapu müdürlükleri nezdindeki idari işlemlerin yürütülmesi.

Mevzuat Uyumu: Gayrimenkul projelerinin imar ve çevre mevzuatına uygunluğunun denetlenmesi.

Gayrimenkul Finansmanı: Proje finansmanı ve gayrimenkul teminatlı işlemler konusunda hukuki danışmanlık.`
    },
    "is-hukuku": {
        title: "İş ve Sosyal Güvenlik Hukuku",
        content: `Aslanhan Hukuk & Danışmanlık, işçi ve işveren ilişkilerinin yasal zeminde düzenlenmesi, istihdam sürecinin mevzuata uygun yürütülmesi ve iş hukukundan doğan uyuşmazlıkların çözümü konusunda kapsamlı hukuki danışmanlık hizmeti sunmaktadır. Süreçlerde "önleyici hukuk" prensibiyle hareket edilerek, olası hukuki risklerin en aza indirilmesi ve çalışma barışının korunması hedeflenmektedir.

Başlıca Çalışma Alanları:

Sözleşme ve Mevzuat Uyumu: İş sözleşmelerinin ve işyeri iç yönetmeliklerinin güncel Yargıtay kararları ışığında hazırlanması ve revize edilmesi.

Fesih ve Dava Süreçleri: İş akdinin feshi, işe iade, kıdem ve ihbar tazminatı ile diğer işçilik alacaklarından doğan davaların takibi ve sulh süreçlerinin yönetimi.

İş Sağlığı ve Güvenliği: İş kazası ve meslek hastalıklarından kaynaklanan hukuki ve cezai sorumluluklara ilişkin danışmanlık ve dava takibi.

Toplu İş Hukuku: Toplu iş sözleşmesi taslaklarının hazırlanması, müzakere süreçlerinin yönetimi ve sendikal faaliyetlerden doğan ihtilafların çözümü.

İdari Süreçler: Her somut olaya özgü tutanak, savunma istem yazıları, ihtarname ve fesih bildirimlerinin hukuki usullere uygun olarak hazırlanması.

Kurumsal Eğitim: İş Kanunu ve Sosyal Güvenlik mevzuatından doğan yükümlülüklere ilişkin şirket içi eğitim hizmetlerinin sunulması.`
    },
    "aile-hukuku": {
        title: "Aile ve Boşanma Hukuku",
        content: `Aslanhan Hukuk & Danışmanlık, Medeni Hukuk kapsamında yer alan aile birliğinin kurulması, devamı ve sona ermesi süreçlerinde ortaya çıkan tüm hukuki ihtilaflarda müvekkillerine dava vekilliği ve danışmanlık hizmeti sunmaktadır. Aile mahremiyeti ve çocukların üstün yararı gözetilerek, süreçlerin hızlı ve hukuka uygun bir şekilde sonuçlandırılması hedeflenmektedir.

Başlıca Çalışma Alanları:

Boşanma Davaları: Çekişmeli ve anlaşmalı boşanma davalarının takibi, anlaşmalı boşanma protokollerinin hazırlanması ve müzakere edilmesi.

Mal Rejimleri: Evlilik birliği içerisinde edinilen malların tasfiyesi, katılma alacağı, değer artış payı davaları ve mal rejimi sözleşmelerinin (evlilik sözleşmesi) düzenlenmesi.

Nafaka ve Tazminat: Tedbir, iştirak, yoksulluk ve yardım nafakası talepleri ile boşanmadan kaynaklı maddi ve manevi tazminat davalarının takibi.

Velayet ve Soybağı: Velayet davaları, kişisel ilişki kurulması, babalık davası, nesebin reddi ve tashihi, evlat edinme süreçlerinin yürütülmesi.

Koruma Tedbirleri: 6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesi Kanunu kapsamında koruma ve uzaklaştırma kararlarının alınması.

Uluslararası İşlemler: Yabancı mahkemelerden alınan boşanma kararlarının Türkiye'de tanınması ve tenfizi davaları.

Diğer Aile Hukuku İşlemleri: Nişanın bozulmasından doğan tazminat davaları, aile konutu şerhi konulması, evlenme izni (iddet müddetinin kaldırılması) davaları.`
    }
};

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const area = practiceAreasData[slug];

    if (!area) {
        return {
            title: "Sayfa Bulunamadı",
        };
    }

    return {
        title: `${area.title} | Aslanhan Hukuk Bürosu`,
        description: `${area.title} alanındaki hizmetlerimiz hakkında bilgi alın.`,
    };
}

export default async function PracticeAreaDetail(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;
    const area = practiceAreasData[slug];

    if (!area) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{area.title}</h1>
            <div className={styles.content}>
                {area.content.split('\n\n').map((paragraph, idx) => {
                    // Increased threshold to 300 to accommodate longer descriptions
                    const isTitle = paragraph.includes(':') && paragraph.length < 350;

                    if (idx === 0) {
                        const content = paragraph.replace(
                            /Aslanhan Hukuk & Danışmanlık/g,
                            '<strong>Aslanhan Hukuk & Danışmanlık</strong>'
                        );
                        return <p key={idx} className={styles.intro} dangerouslySetInnerHTML={{ __html: content }} />;
                    }

                    if (isTitle) {
                        const [title, ...rest] = paragraph.split(':');
                        const description = rest.join(':').trim();

                        if (title.trim() === 'Başlıca Çalışma Alanları' || title.trim() === 'Hizmet Kapsamı') {
                            return (
                                <div key={idx}>
                                    <h2 className={styles.sectionHeader}>{title}</h2>
                                    {description && <p className={styles.contentParagraph} style={{ marginBottom: '3rem' }}>{description}</p>}
                                </div>
                            );
                        }

                        return (
                            <div key={idx} className={styles.itemWidget}>
                                <strong className={styles.heading}>{title}</strong>
                                <p>{description}</p>
                            </div>
                        );
                    }

                    // Apply highlighting to standard paragraphs that are not the intro
                    return <p key={idx} className={styles.contentParagraph}>{paragraph}</p>;
                })}
            </div>

            <div className={styles.backButtonWrapper}>
                <Link href="/" className={styles.backButton}>
                    ← Anasayfaya Dön
                </Link>
            </div>
        </div>
    );
}
