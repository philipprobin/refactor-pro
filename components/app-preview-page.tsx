'use client'

import Preview from '@/components/Preview'
import Link from 'next/link'

export function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project Preview</h1>
        <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Upload
        </Link>
      </div>
      <Preview />
    </div>
  )
}