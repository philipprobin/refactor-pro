'use client'

import { useState } from 'react'
import { FileIcon, FolderIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type FileStructure = { [key: string]: string | FileStructure }

const mockProjectStructure: FileStructure = {
  'src': {
    'main.py': '',
    'utils.py': '',
    'data': {
      'process.py': '',
      'clean.py': '',
    },
    'models': {
      'model1.py': '',
      'model2.py': '',
    },
  },
  'tests': {
    'test_main.py': '',
    'test_utils.py': '',
  },
  'README.md': '',
  'requirements.txt': '',
}

export default function Preview() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const renderFileTree = (structure: FileStructure, path: string = '') => {
    return Object.entries(structure).map(([name, content]) => {
      const fullPath = path ? `${path}/${name}` : name
      if (typeof content === 'string') {
        return (
          <div key={fullPath} className="flex items-center space-x-2 py-1">
            <FileIcon className="h-4 w-4" />
            <button
              className="text-sm hover:underline"
              onClick={() => setSelectedFile(fullPath)}
            >
              {name}
            </button>
          </div>
        )
      } else {
        return (
          <div key={fullPath}>
            <div className="flex items-center space-x-2 py-1">
              <FolderIcon className="h-4 w-4" />
              <span className="font-medium">{name}</span>
            </div>
            <div className="ml-4">{renderFileTree(content, fullPath)}</div>
          </div>
        )
      }
    })
  }

  return (
    <div className="flex space-x-4">
      <Card className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-2">Project Structure</h2>
        <ScrollArea className="h-[400px]">
          {renderFileTree(mockProjectStructure)}
        </ScrollArea>
      </Card>
      <Card className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-2">File Preview</h2>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          {selectedFile ? (
            <pre className="text-sm">
              <code>{`// Content of ${selectedFile}\n// (This is a mock preview)`}</code>
            </pre>
          ) : (
            <p className="text-gray-500 text-center">Select a file to preview its content</p>
          )}
        </ScrollArea>
      </Card>
    </div>
  )
}