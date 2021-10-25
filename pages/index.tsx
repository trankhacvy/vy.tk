import Link from '@/components/Link'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import ArticleFromMatter from '@/components/ArticleFromMatter'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="flex items-center space-x-8 pt-4 pb-16 sm:pb-20">
          <Image
            className="rounded-full"
            width="120px"
            height="120px"
            src="/static/images/avatar.jpg"
            alt="Đây là avatar của tui"
          />
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Hey there{' '}
            <span aria-label="hey" role="img">
              👋
            </span>
            , I'm Vy.
            <br />
            I'm a front-end developer based in Ho Chi Minh, Viet Nam.
          </p>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest posts
          </h1>
        </div>
        <ul className="space-y-6">
          {!posts.length && <div className="py-4 text-center">No posts found.</div>}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            return (
              <li key={frontMatter.slug}>
                <ArticleFromMatter post={frontMatter} />
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
