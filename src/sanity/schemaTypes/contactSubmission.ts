import { defineType, defineField } from "sanity";

export default defineType({
    name: "contactSubmission",
    title: "Başvurular",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Ad Soyad",
            type: "string",
        }),
        defineField({
            name: "contact",
            title: "İletişim (Telefon/E-posta)",
            type: "string",
        }),
        defineField({
            name: "topic",
            title: "Konu",
            type: "string",
            options: {
                list: [
                    { title: "Aile & Boşanma", value: "aile" },
                    { title: "İş Hukuku", value: "is" },
                    { title: "Borç & Alacak", value: "icra" },
                    { title: "Ceza Hukuku", value: "ceza" },
                    { title: "Gayrimenkul", value: "gayrimenkul" },
                    { title: "Diğer", value: "diger" },
                ],
            },
        }),
        defineField({
            name: "message",
            title: "Mesaj",
            type: "text",
        }),
        defineField({
            name: "status",
            title: "Durum",
            type: "string",
            options: {
                list: [
                    { title: "Yeni", value: "yeni" },
                    { title: "İnceleniyor", value: "inceleniyor" },
                    { title: "Tamamlandı", value: "tamamlandi" },
                ],
            },
            initialValue: "yeni",
        }),
        defineField({
            name: "submittedAt",
            title: "Gönderilme Tarihi",
            type: "datetime",
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "topic",
        },
    },
    orderings: [
        {
            title: "Gönderilme Tarihi",
            name: "submittedAtDesc",
            by: [{ field: "submittedAt", direction: "desc" }],
        },
    ],
});
