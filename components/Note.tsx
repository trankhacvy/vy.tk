import Link from './Link'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'

interface NoteProps {
  note: PostFrontMatter
}

export default function Note({ note }: NoteProps) {
  const { slug, date, title, tags } = note
  return (
    <article className="mb-4">
      <div className="block sm:flex items-center justify-between">
        <h3 className="text-xl sm:text-2xl font-bold leading-8 tracking-tight">
          <Link href={`/til/${slug}`} className="text-gray-900 dark:text-gray-100">
            {title}
          </Link>
        </h3>
        <div className="text-sm">
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
      </div>
      <div className="flex flex-wrap space-x-2 mt-4">
        {tags.map((tag) => (
          <div
            key={tag}
            className="py-1 px-3 bg-white rounded-full bg-gray-900 dark:bg-primary-500"
          >
            <div className="text-xs font-medium leading-none text-white">{tag}</div>
          </div>
        ))}
      </div>
    </article>
  )
}
