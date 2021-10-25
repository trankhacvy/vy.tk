import Link from './Link'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'

interface ArticleFromMatterProps {
  post: PostFrontMatter
}

export default function ArticleFromMatter({ post }: ArticleFromMatterProps) {
  const { slug, date, title, summary } = post
  return (
    <article className="mb-4">
      <h3 className="text-xl sm:text-2xl font-bold leading-8 tracking-tight">
        <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
          {title}
        </Link>
      </h3>
      <div className="prose text-gray-500 max-w-none dark:text-gray-400">{summary}</div>
      <div className="text-right text-sm">
        <time dateTime={date}>{formatDate(date)}</time>
      </div>
    </article>
  )
}
