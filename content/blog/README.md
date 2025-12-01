# Blog Content Guide

This directory contains all blog posts for the PICABORD website. Posts are written in MDX format, which allows you to use Markdown with React components.

## Creating a New Blog Post

1. Create a new `.mdx` file in this directory
2. Add frontmatter with required metadata
3. Write your content using Markdown and MDX features
4. Save and the post will automatically appear on the blog

## Frontmatter Format

Every blog post must include frontmatter at the top:

```yaml
---
title: "Your Post Title"
excerpt: "A brief description of your post (150-200 characters)"
date: "2025-11-05"
author: "Author Name"
category: "Hardware" # or "Software", "Industry Insights", "Company News"
featuredImage: "/blog/your-image.jpg"
tags: ["tag1", "tag2", "tag3"]
published: true
---
```

## Styling Features

### Typography

The blog system includes comprehensive typography styling:

- **Headings**: Six levels (H1-H6) with proper hierarchy and spacing
- **Paragraphs**: Optimized line height (1.8) and spacing for readability
- **Lists**: Both ordered and unordered with proper indentation
- **Links**: Styled with primary color and smooth hover effects
- **Emphasis**: Bold, italic, and combined formatting

### Code Blocks

Code blocks support syntax highlighting for multiple languages:

\`\`\`javascript
// Your code here
const example = "Hello World";
\`\`\`

Supported languages include:
- JavaScript/TypeScript
- Python
- Bash/Shell
- HTML/CSS
- JSON
- And many more

Inline code uses backticks: \`const example = "value"\`

### Tables

Tables are fully responsive and styled:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

Features:
- Hover effects on rows
- Responsive horizontal scrolling on mobile
- Zebra striping for better readability
- Proper borders and spacing

### Blockquotes

Blockquotes are styled with a left border and background:

> This is a blockquote. It's perfect for highlighting important information or quotes.

### Images

Images are automatically optimized using Next.js Image component:

![Alt text](/path/to/image.jpg)

Features:
- Automatic responsive sizing
- Lazy loading
- WebP format with fallbacks
- Rounded corners and shadows

### Special Elements

- **Horizontal Rules**: Use `---` for section dividers
- **Keyboard Shortcuts**: Use `<kbd>Ctrl</kbd>` for keyboard keys
- **Abbreviations**: Use `<abbr title="Full Text">Abbr</abbr>`
- **Strikethrough**: Use `~~text~~` for deleted content

## Responsive Design

All styling is fully responsive:
- Mobile-first approach
- Touch-friendly interactive elements (44px minimum)
- Optimized font sizes for all screen sizes
- Responsive images and tables

## Dark Mode Support

All styling automatically adapts to dark mode:
- Proper contrast ratios
- Adjusted syntax highlighting colors
- Smooth theme transitions

## Best Practices

1. **Use descriptive headings**: Create a clear content hierarchy
2. **Keep paragraphs short**: 3-4 sentences maximum
3. **Add alt text to images**: Important for accessibility
4. **Use code blocks for code**: Don't use screenshots
5. **Break up long content**: Use headings, lists, and images
6. **Test on mobile**: Ensure readability on small screens

## Example Post Structure

```markdown
---
title: "Your Title"
excerpt: "Your excerpt"
date: "2025-11-05"
author: "PICABORD Team"
category: "Software"
featuredImage: "/blog/image.jpg"
tags: ["tag1", "tag2"]
published: true
---

# Main Title

Brief introduction paragraph.

## Section 1

Content with **bold** and *italic* text.

### Subsection

- List item 1
- List item 2

\`\`\`javascript
// Code example
const example = "value";
\`\`\`

## Section 2

More content with a table:

| Header 1 | Header 2 |
|----------|----------|
| Data 1   | Data 2   |

> Important quote or note

## Conclusion

Final thoughts and call to action.
```

## Need Help?

Check out the `styling-demo.mdx` file for a comprehensive example of all available styling features.
