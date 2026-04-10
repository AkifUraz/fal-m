import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Makale',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Başlık',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'URL Yapısı (Slug)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Özet (Excerpt)',
            type: 'text',
            description: 'Makale listeleme sayfasında görünecek kısa açıklama (SEO ve Okuyucu için önemli).',
            rows: 3,
            validation: (Rule) => Rule.required().min(20).max(200),
        }),
        defineField({
            name: 'mainImage',
            title: 'Ana Görsel',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'publishedAt',
            title: 'Yayın Tarihi',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'body',
            title: 'İçerik',
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
        },
    },
})
