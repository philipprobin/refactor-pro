'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Page() {
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    await handleFiles(e.dataTransfer.items)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await handleFiles(e.target.files)
    }
  }

  const handleFiles = async (items: FileList | DataTransferItemList) => {
    const fileStructure: { [key: string]: string } = {}

    const readFile = (file: File, path: string) => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          fileStructure[path] = e.target?.result as string
          resolve()
        }
        reader.readAsText(file)
      })
    }

    const traverseFileTree = async (item: FileSystemEntry, path: string = '') => {
      if (item.isFile) {
        const file = item as FileSystemFileEntry
        file.file(async (file) => {
          await readFile(file, `${path}${file.name}`)
        })
      } else if (item.isDirectory) {
        const dirReader = (item as FileSystemDirectoryEntry).createReader()
        dirReader.readEntries(async (entries) => {
          for (const entry of entries) {
            await traverseFileTree(entry, `${path}${item.name}/`)
          }
        })
      }
    }

    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile()
        if (file) {
          await readFile(file, file.name)
        }
      } else if (item.webkitGetAsEntry) {
        const entry = item.webkitGetAsEntry()
        if (entry) {
          await traverseFileTree(entry)
        }
      }
    }

    // Store the file structure in localStorage (you might want to use a more robust solution for larger projects)
    localStorage.setItem('fileStructure', JSON.stringify(fileStructure))

    // Navigate to the preview page
    router.push('/preview')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Code Refactor Tool</h1>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop your project files and folders here, or click to select
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          webkitdirectory="true"
          onChange={handleFileSelect}
        />
        <Button className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
          Select Files and Folders
        </Button>
      </div>
    </main>
  )
}