"use client";

import { useState, useEffect, useCallback } from "react";
import { NextStudio } from "next-sanity/studio";
import { UserButton } from "@clerk/nextjs";
import config from "../../../../sanity.config";

import { client } from "@/sanity/lib/client";

interface Submission {
    id: string;
    name: string;
    contact: string;
    topic: string;
    message: string;
    status: string;
    submittedAt: string;
}

interface Article {
    _id: string;
    title: string;
    publishedAt: string;
    slug: { current: string };
}

const TOPIC_LABELS: Record<string, string> = {
    aile: "Aile & Boşanma",
    is: "İş Hukuku",
    icra: "Borç & Alacak",
    ceza: "Ceza Hukuku",
    gayrimenkul: "Gayrimenkul",
    diger: "Diğer",
};

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
    yeni: { label: "Yeni", color: "#fff", bg: "#E07A5F" },
    inceleniyor: { label: "İnceleniyor", color: "#fff", bg: "#E2A03F" },
    tamamlandi: { label: "Tamamlandı", color: "#fff", bg: "#6B8F71" },
};

export default function StudioPage() {
    const [activeTab, setActiveTab] = useState<"studio" | "submissions" | "articles">("submissions");
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingSubs, setLoadingSubs] = useState(false);
    const [loadingArts, setLoadingArts] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchSubmissions = useCallback(async () => {
        setLoadingSubs(true);
        try {
            const data = await client.fetch(`*[_type == "contactSubmission"] | order(submittedAt desc) { _id, name, contact, topic, message, status, submittedAt }`);
            const mapped = (data || []).map((sub: any) => ({
                ...sub,
                id: sub._id,
            }));
            setSubmissions(mapped);
        } catch (err) {
            console.error("Failed to load submissions", err);
        } finally {
            setLoadingSubs(false);
        }
    }, []);

    const fetchArticles = useCallback(async () => {
        setLoadingArts(true);
        try {
            const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc) { _id, title, publishedAt, slug }`);
            setArticles(data || []);
        } catch (error) {
            console.error("Failed to fetch articles:", error);
        } finally {
            setLoadingArts(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === "submissions") fetchSubmissions();
        if (activeTab === "articles") fetchArticles();
    }, [activeTab, fetchSubmissions, fetchArticles]);

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await fetch("/api/contact/status", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            setSubmissions((prev) =>
                prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
            );
        } catch {
            console.error("Failed to update status");
        }
    };

    const deleteSubmission = async (id: string) => {
        if (!confirm("Bu başvuruyu silmek istediğinizden emin misiniz?")) return;
        try {
            await fetch("/api/contact/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            setSubmissions((prev) => prev.filter((s) => s.id !== id));
        } catch {
            console.error("Failed to delete submission");
        }
    };

    // Authenticated via Clerk middleware — show tabs directly
    return (
        <div style={{ minHeight: "100vh", background: "#FAFAF7" }}>
            {/* Tab Bar */}
            <div style={{ ...s.tabBar, zIndex: 1000000 }}>
                <div style={s.tabBarInner}>
                    <div style={s.tabLogoSection}>
                        <strong style={{ fontSize: "1rem", color: "#2D3436", letterSpacing: "2px" }}>ASLANHAN</strong>
                        <span style={{ fontSize: "0.6rem", color: "#6B6B6B", letterSpacing: "2px" }}>STUDIO</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <button
                            onClick={() => setActiveTab("submissions")}
                            style={activeTab === "submissions" ? s.tabActive : s.tab}
                        >
                            📋 Başvurular {submissions.length > 0 && <span style={s.badge}>{submissions.filter(sub => sub.status === "yeni").length || ""}</span>}
                        </button>
                        <button
                            onClick={() => setActiveTab("articles")}
                            style={activeTab === "articles" ? s.tabActive : s.tab}
                        >
                            📰 Makaleler
                        </button>
                        <button
                            onClick={() => setActiveTab("studio")}
                            style={activeTab === "studio" ? s.tabActive : s.tab}
                        >
                            ✏️ Yeni Makale Yaz
                        </button>
                        <div style={{ marginLeft: "0.5rem" }}>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </div>
                </div>
            </div>

            {activeTab === "studio" ? (
                <div style={{ paddingTop: "60px", minHeight: "100vh" }}>
                    <div style={{ height: "calc(100vh - 60px)", overflow: "auto" }}>
                        <NextStudio config={config} />
                    </div>
                </div>
            ) : activeTab === "articles" ? (
                <div style={s.submissionsContainer}>
                    <div style={s.submissionsHeader}>
                        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#2D3436" }}>
                            📰 Makaleler
                        </h2>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button onClick={fetchArticles} style={s.refreshBtn}>
                                🔄 Yenile
                            </button>
                            <button onClick={() => setActiveTab("studio")} style={{ ...s.refreshBtn, background: "#6B8F71", color: "#fff", borderColor: "#6B8F71" }}>
                                ➕ Yeni Yazı
                            </button>
                        </div>
                    </div>

                    {loadingArts ? (
                        <p style={{ textAlign: "center", color: "#6B6B6B", padding: "3rem" }}>Yükleniyor...</p>
                    ) : articles.length === 0 ? (
                        <div style={s.emptyState}>
                            <p style={{ fontSize: "3rem", margin: "0 0 1rem" }}>✍️</p>
                            <p style={{ color: "#6B6B6B", fontSize: "1.05rem" }}>Henüz makale yok</p>
                            <button onClick={() => setActiveTab("studio")} style={s.button}>İlk Makaleni Yaz</button>
                        </div>
                    ) : (
                        <div style={s.submissionsList}>
                            {articles.map((art) => (
                                <div key={art._id} style={s.submissionCard}>
                                    <div style={s.cardHeader}>
                                        <div>
                                            <h3 style={s.cardName}>{art.title}</h3>
                                            <span style={s.cardDate}>
                                                {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("tr-TR") : "Tarihsiz"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setActiveTab("studio");
                                                window.location.hash = `#/intent/edit/id=${art._id};type=post`;
                                            }}
                                            style={{ ...s.refreshBtn, fontSize: "0.75rem" }}
                                        >
                                            Düzenle ✏️
                                        </button>
                                    </div>
                                    <div style={{ fontSize: "0.85rem", color: "#999" }}>
                                        URL: /makaleler/{art.slug?.current}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div style={s.submissionsContainer}>
                    <div style={s.submissionsHeader}>
                        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#2D3436" }}>
                            📋 Başvurular
                        </h2>
                        <button onClick={fetchSubmissions} style={s.refreshBtn}>
                            🔄 Yenile
                        </button>
                    </div>

                    {loadingSubs ? (
                        <p style={{ textAlign: "center", color: "#6B6B6B", padding: "3rem" }}>Yükleniyor...</p>
                    ) : submissions.length === 0 ? (
                        <div style={s.emptyState}>
                            <p style={{ fontSize: "3rem", margin: "0 0 1rem" }}>📭</p>
                            <p style={{ color: "#6B6B6B", fontSize: "1.05rem" }}>Henüz başvuru yok</p>
                            <p style={{ color: "#999", fontSize: "0.85rem" }}>Ziyaretçiler iletişim formunu doldurduğunda başvurular burada görünecek.</p>
                        </div>
                    ) : (
                        <div style={s.submissionsList}>
                            {submissions.map((sub) => {
                                const statusInfo = STATUS_LABELS[sub.status] || STATUS_LABELS.yeni;
                                const isExpanded = expandedId === sub.id;
                                return (
                                    <div key={sub.id} style={{ ...s.submissionCard, cursor: "pointer", transition: "all 0.2s ease" }}>
                                        {/* Compact Row — always visible */}
                                        <div
                                            onClick={() => setExpandedId(isExpanded ? null : sub.id)}
                                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                                                <span style={{ fontSize: "1.2rem" }}>{isExpanded ? "▼" : "▶"}</span>
                                                <div style={{ minWidth: 0 }}>
                                                    <h3 style={{ ...s.cardName, marginBottom: "2px" }}>{sub.name}</h3>
                                                    <span style={{ fontSize: "0.82rem", color: "#6B6B6B" }}>{TOPIC_LABELS[sub.topic] || sub.topic}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                                                <span style={{ fontSize: "0.75rem", color: "#999" }}>
                                                    {new Date(sub.submittedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                                                </span>
                                                <span style={{ ...s.statusBadge, background: statusInfo.bg, color: statusInfo.color }}>
                                                    {statusInfo.label}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {isExpanded && (
                                            <div style={{ marginTop: "1rem", borderTop: "1px solid #f0ece6", paddingTop: "1rem" }}>
                                                <div style={s.cardBody}>
                                                    <div style={s.cardRow}>
                                                        <span style={s.cardLabel}>📞 İletişim:</span>
                                                        <span style={s.cardValue}>{sub.contact}</span>
                                                    </div>
                                                    <div style={s.cardRow}>
                                                        <span style={s.cardLabel}>📂 Konu:</span>
                                                        <span style={s.cardValue}>{TOPIC_LABELS[sub.topic] || sub.topic}</span>
                                                    </div>
                                                    <div style={s.cardRow}>
                                                        <span style={s.cardLabel}>📅 Tarih:</span>
                                                        <span style={s.cardValue}>
                                                            {new Date(sub.submittedAt).toLocaleDateString("tr-TR", {
                                                                day: "numeric", month: "long", year: "numeric",
                                                                hour: "2-digit", minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>
                                                    {sub.message && (
                                                        <div style={{ ...s.cardRow, flexDirection: "column", alignItems: "flex-start" }}>
                                                            <span style={s.cardLabel}>💬 Mesaj:</span>
                                                            <p style={s.messageText}>{sub.message}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div style={s.cardActions}>
                                                    <select
                                                        value={sub.status}
                                                        onChange={(e) => { e.stopPropagation(); updateStatus(sub.id, e.target.value); }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        style={s.statusSelect}
                                                    >
                                                        <option value="yeni">🟠 Yeni</option>
                                                        <option value="inceleniyor">🟡 İnceleniyor</option>
                                                        <option value="tamamlandi">🟢 Tamamlandı</option>
                                                    </select>
                                                    <button onClick={(e) => { e.stopPropagation(); deleteSubmission(sub.id); }} style={s.deleteBtn}>
                                                        🗑️ Sil
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const s: Record<string, React.CSSProperties> = {
    container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF7", padding: "1rem" },
    card: { background: "#fff", borderRadius: "12px", padding: "3rem 2.5rem", maxWidth: "420px", width: "100%", boxShadow: "0 4px 24px rgba(45,52,54,0.08)", border: "1px solid #E2DDD5" },
    logoSection: { textAlign: "center" as const, marginBottom: "2rem" },
    logoMain: { fontFamily: "serif", fontSize: "1.8rem", fontWeight: 700, color: "#000", letterSpacing: "3px", margin: 0 },
    logoSub: { fontFamily: "sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#000", letterSpacing: "4px", opacity: 0.6, marginTop: "4px" },
    title: { textAlign: "center" as const, fontSize: "1.3rem", color: "#2D3436", marginBottom: "0.3rem", fontFamily: "serif" },
    subtitle: { textAlign: "center" as const, fontSize: "0.88rem", color: "#6B6B6B", marginBottom: "2rem" },
    form: { display: "flex", flexDirection: "column" as const, gap: "1.2rem" },
    field: { display: "flex", flexDirection: "column" as const, gap: "0.3rem" },
    label: { fontSize: "0.85rem", fontWeight: 700, color: "#2D3436" },
    input: { padding: "12px 16px", border: "1px solid #E2DDD5", borderRadius: "6px", fontSize: "0.95rem", background: "#FAFAF7", outline: "none", color: "#3D3D3D" },
    error: { color: "#E07A5F", fontSize: "0.85rem", textAlign: "center" as const, margin: 0 },
    button: { padding: "14px", background: "#6B8F71", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "1rem", cursor: "pointer" },
    footer: { textAlign: "center" as const, fontSize: "0.78rem", color: "#6B6B6B", marginTop: "1.5rem" },
    loadingText: { textAlign: "center" as const, color: "#6B6B6B", fontSize: "1rem" },

    // Tab bar
    tabBar: { position: "fixed" as const, top: 0, left: 0, right: 0, zIndex: 50, background: "#fff", borderBottom: "1px solid #E2DDD5", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" },
    tabBarInner: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", height: "60px", maxWidth: "1400px", margin: "0 auto" },
    tabLogoSection: { display: "flex", flexDirection: "column" as const, lineHeight: 1.1 },
    tab: { padding: "8px 16px", border: "1px solid #E2DDD5", borderRadius: "6px", background: "#fff", cursor: "pointer", fontSize: "0.85rem", color: "#6B6B6B", fontWeight: 600 },
    tabActive: { padding: "8px 16px", border: "1px solid #6B8F71", borderRadius: "6px", background: "#6B8F71", cursor: "pointer", fontSize: "0.85rem", color: "#fff", fontWeight: 700 },
    badge: { display: "inline-block", background: "#E07A5F", color: "#fff", borderRadius: "10px", padding: "1px 7px", fontSize: "0.7rem", fontWeight: 700, marginLeft: "4px" },

    // Submissions
    submissionsContainer: { paddingTop: "80px", maxWidth: "900px", margin: "0 auto", padding: "80px 1.5rem 2rem", overflowY: "auto" as const, maxHeight: "100vh" },
    submissionsHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" },
    refreshBtn: { padding: "8px 16px", border: "1px solid #E2DDD5", borderRadius: "6px", background: "#fff", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600 },
    emptyState: { textAlign: "center" as const, padding: "4rem 2rem", background: "#fff", borderRadius: "12px", border: "1px solid #E2DDD5" },
    submissionsList: { display: "flex", flexDirection: "column" as const, gap: "0.5rem", paddingBottom: "2rem" },
    submissionCard: { background: "#fff", borderRadius: "10px", border: "1px solid #E2DDD5", padding: "1rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" },
    cardName: { margin: 0, fontSize: "1.1rem", color: "#2D3436", fontWeight: 700 },
    cardDate: { fontSize: "0.78rem", color: "#999" },
    statusBadge: { padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: 700, whiteSpace: "nowrap" as const },
    cardBody: { display: "flex", flexDirection: "column" as const, gap: "0.6rem", marginBottom: "1rem" },
    cardRow: { display: "flex", alignItems: "center", gap: "0.5rem" },
    cardLabel: { fontSize: "0.82rem", color: "#6B6B6B", fontWeight: 600, minWidth: "90px" },
    cardValue: { fontSize: "0.9rem", color: "#2D3436" },
    messageText: { margin: "4px 0 0", fontSize: "0.88rem", color: "#3D3D3D", lineHeight: 1.6, background: "#FAFAF7", padding: "10px 14px", borderRadius: "6px", width: "100%" },
    cardActions: { display: "flex", gap: "0.8rem", alignItems: "center", borderTop: "1px solid #f0ece6", paddingTop: "1rem" },
    statusSelect: { padding: "6px 10px", border: "1px solid #E2DDD5", borderRadius: "6px", fontSize: "0.85rem", background: "#fff", cursor: "pointer" },
    deleteBtn: { padding: "6px 12px", border: "1px solid #E2DDD5", borderRadius: "6px", background: "#fff", cursor: "pointer", fontSize: "0.82rem", color: "#E07A5F", fontWeight: 600 },
};
