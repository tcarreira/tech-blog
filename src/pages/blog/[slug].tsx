import { GetStaticPaths } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'

import { enhanceStaticProps } from 'utils/next/enhanceStaticProps'
import { BLOG_FILES_FOLDER } from 'utils/server'
import { BlogPage, BlogPageProps } from 'views/BlogPage'

type BlogPagePathParams = {
  slug: string
}

export const getStaticPaths: GetStaticPaths<BlogPagePathParams> = async () => {
  const files = await fs.readdir(BLOG_FILES_FOLDER, { withFileTypes: true })

  return {
    paths: files.map((f) => {
      const [slug, locale] = f.name.split('.')

      return { params: { slug }, locale }
    }),
    fallback: false,
  }
}

export const getStaticProps = enhanceStaticProps<
  BlogPageProps,
  BlogPagePathParams
>(async ({ params, locale }) => {
  const slug = params?.slug

  if (!slug || !locale) {
    return { notFound: true }
  }

  const filename = `${slug}.${locale}.mdx`

  const source = await fs.readFile(path.join(BLOG_FILES_FOLDER, filename))

  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: data })

  return { props: { source: mdxSource, frontMatter: data } }
})

export default BlogPage
