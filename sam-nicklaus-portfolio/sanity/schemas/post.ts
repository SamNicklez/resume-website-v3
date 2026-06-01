// sanity/schemas/post.ts
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',        type: 'string'   },
    { name: 'slug',        title: 'Slug',         type: 'slug',
      options: { source: 'title' }                                  },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'description', title: 'Short Summary',type: 'text'     },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' }
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  { name: 'href',  type: 'url',     title: 'URL'              },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab?' },
                ],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    { name: 'tags', title: 'Tags', type: 'array',
      of: [{ type: 'string' }]                                      },
    {
      name: 'attachments',
      title: 'Downloadable Files',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'file',  title: 'File',  type: 'file'   },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Recommended: 50–60 characters',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Recommended: 150–160 characters',
        },
        {
          name: 'ogImage',
          title: 'Social Share Image (OG Image)',
          type: 'image',
          description: 'Shown when shared on Twitter, LinkedIn, etc.',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'noIndex',
          title: 'Hide from Search Engines?',
          type: 'boolean',
          description: 'Turn on to prevent Google from indexing this post',
          initialValue: false,
        },
      ],
    },
  ],
};