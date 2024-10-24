'use client'

import React, { useState } from 'react'
import { UploadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DragAndDrop() {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop here
    const files = Array.from(e.dataTransfer.files)
    console.log('Dropped files:', files)
    // You would typically process these files or send them to a server
  }

  return (
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
        Drag and drop your project files here, or click to select files
      </p>
      <Button className="mt-4">Select Files</Button>
    </div>
  )
}