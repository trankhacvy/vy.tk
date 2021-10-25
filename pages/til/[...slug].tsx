import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

const DEFAULT_LAYOUT = 'NoteLayout'

export async function getStaticPaths() {
  const notes = getFiles('til')
  return {
    paths: notes.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const allNotes = await getAllFilesFrontMatter('til')
  const noteIndex = allNotes.findIndex((note) => formatSlug(note.slug) === slug)
  const prev: { slug: string; title: string } = allNotes[noteIndex + 1] || null
  const next: { slug: string; title: string } = allNotes[noteIndex - 1] || null
  const note = await getFileBySlug('til', slug)
  // @ts-ignore
  const authorList = note.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author])
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  const rss = generateRss(allNotes)
  fs.writeFileSync('./public/feed.xml', rss)

  return {
    props: {
      note,
      authorDetails,
      prev,
      next,
    },
  }
}

export default function Blog({
  note,
  authorDetails,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = note
  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
