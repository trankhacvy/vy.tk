import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import { MyListLayout } from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import Note from '@/components/Note'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ComponentProps } from 'react'

export const POSTS_PER_PAGE = 5

export const getStaticProps: GetStaticProps<{
  notes: ComponentProps<typeof MyListLayout>['items']
  initialDisplayItems: ComponentProps<typeof MyListLayout>['initialDisplayItems']
  pagination: ComponentProps<typeof MyListLayout>['pagination']
}> = async () => {
  const notes = await getAllFilesFrontMatter('til')

  const initialDisplayItems = notes.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(notes.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayItems, notes, pagination } }
}

export default function TIL({
  notes,
  initialDisplayItems,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={`#Til - ${siteMetadata.author}`} description={siteMetadata.description} />
      <MyListLayout
        items={notes}
        initialDisplayItems={initialDisplayItems}
        pagination={pagination}
        title="All Notes"
        render={({ items }) =>
          items.map((item) => {
            return (
              <li key={item.slug}>
                <Note note={item} />
              </li>
            )
          })
        }
      />
    </>
  )
}
