import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

// Custom components for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with custom styling and proper hierarchy
    h1: ({ children, ...props }) => (
      <h1
        className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0 text-foreground"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="scroll-m-20 border-b border-border pb-3 text-3xl font-semibold tracking-tight first:mt-0 mt-12 mb-6 text-foreground"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-5 text-foreground"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4 text-foreground"
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        className="scroll-m-20 text-lg font-semibold tracking-tight mt-6 mb-3 text-foreground"
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className="scroll-m-20 text-base font-semibold tracking-tight mt-6 mb-3 text-foreground"
        {...props}
      >
        {children}
      </h6>
    ),

    // Paragraphs with optimal line height and spacing
    p: ({ children, ...props }) => (
      <p className="leading-8 text-foreground/90 [&:not(:first-child)]:mt-6 mb-4 text-base md:text-lg" {...props}>
        {children}
      </p>
    ),

    // Links with clear visual distinction
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http')
      
      if (isExternal) {
        return (
          <a
            href={href}
            className="font-medium text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary hover:text-primary/90 transition-all duration-200"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link
          href={(href || '#') as any}
          className="font-medium text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary hover:text-primary/90 transition-all duration-200"
          {...props}
        >
          {children}
        </Link>
      )
    },

    // Lists with proper spacing and indentation
    ul: ({ children, ...props }) => (
      <ul className="my-6 ml-6 space-y-2 list-disc marker:text-primary/70" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-6 ml-6 space-y-2 list-decimal marker:text-primary/70 marker:font-semibold" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-7 text-foreground/90 pl-2" {...props}>
        {children}
      </li>
    ),

    // Blockquotes with enhanced styling
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 border-l-4 border-primary bg-muted/30 pl-6 pr-4 py-4 italic text-foreground/80 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Code blocks with syntax highlighting support
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 overflow-x-auto rounded-lg border border-border bg-muted/50 p-4 text-sm leading-relaxed shadow-sm backdrop-blur-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      // Check if this is inline code or code block
      const isInline = !className?.includes('language-')
      
      if (isInline) {
        return (
          <code
            className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-medium text-primary border border-border/50"
            {...props}
          >
            {children}
          </code>
        )
      }
      
      // Code block (inside pre)
      return (
        <code
          className={`font-mono text-sm ${className || ''}`}
          {...props}
        >
          {children}
        </code>
      )
    },

    // Tables with responsive design and hover effects
    table: ({ children, ...props }) => (
      <div className="my-8 w-full overflow-x-auto rounded-lg border border-border shadow-sm">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-muted/50 border-b-2 border-border" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-border" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="transition-colors hover:bg-muted/30" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left align-middle font-semibold text-foreground text-sm [&:has([role=checkbox])]:pr-0"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="px-4 py-3 align-middle text-foreground/90 text-sm [&:has([role=checkbox])]:pr-0"
        {...props}
      >
        {children}
      </td>
    ),

    // Horizontal rule with subtle styling
    hr: (props) => (
      <hr className="my-10 border-border/50" {...props} />
    ),

    // Images - responsive with Next.js optimization
    img: (props) => {
      const { src, alt } = props as any
      
      // Use standard img tag for MDX to avoid React hooks during SSR
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <span className="block my-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={src || ''}
            alt={alt || ''}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </span>
      )
    },

    // Strong and emphasis with proper contrast
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-foreground" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-foreground/90" {...props}>
        {children}
      </em>
    ),

    // Delete and insert for showing changes
    del: ({ children, ...props }) => (
      <del className="line-through text-muted-foreground" {...props}>
        {children}
      </del>
    ),
    ins: ({ children, ...props }) => (
      <ins className="no-underline bg-primary/10 text-foreground px-1 rounded" {...props}>
        {children}
      </ins>
    ),

    // Keyboard input styling
    kbd: ({ children, ...props }) => (
      <kbd 
        className="px-2 py-1 text-xs font-semibold text-foreground bg-muted border border-border rounded shadow-sm"
        {...props}
      >
        {children}
      </kbd>
    ),

    // Abbreviation with dotted underline
    abbr: ({ children, ...props }) => (
      <abbr 
        className="cursor-help border-b border-dotted border-foreground/50 no-underline"
        {...props}
      >
        {children}
      </abbr>
    ),

    // Allow custom components to be passed in
    ...components,
  }
}
