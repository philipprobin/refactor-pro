'use client'

import { useState, useEffect } from 'react'
import { FileIcon, FolderIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { mockProjectStructure, FileStructure } from '@/lib/mockProjectStructure'
import { mockIdealProjectStructure } from '@/lib/mockIdealProjectStructure'
import JSZip from 'jszip'

export default function Preview() {
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [fileContent, setFileContent] = useState<string>('')
    const [currentStructure, setCurrentStructure] = useState<FileStructure>(mockProjectStructure)
    const [isRefactoring, setIsRefactoring] = useState(false)
    const [progress, setProgress] = useState(0)
    const [statusMessage, setStatusMessage] = useState('')
    const [isRefactored, setIsRefactored] = useState(false)

    // Function to automatically select the first file
    useEffect(() => {
        const selectFirstFile = (structure: FileStructure) => {
            for (const [name, content] of Object.entries(structure)) {
                if (typeof content === 'string') {
                    setSelectedFile(name)
                    setFileContent(content)
                    break
                } else {
                    selectFirstFile(content)
                    break
                }
            }
        }

        selectFirstFile(currentStructure)
    }, [currentStructure])

    // Function to render the file tree recursively
    const renderFileTree = (structure: FileStructure, path: string = '') => {
        return Object.entries(structure).map(([name, content]) => {
            const fullPath = path ? `${path}/${name}` : name
            if (typeof content === 'string') {
                const fileContentString = content
                return (
                    <div key={fullPath} className="flex items-center space-x-2 py-1">
                        <FileIcon className="h-4 w-4" />
                        <button
                            className="text-sm hover:underline text-left"
                            onClick={() => {
                                setSelectedFile(fullPath)
                                setFileContent(fileContentString)
                            }}
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

    // Function to handle the refactoring process
    const handleRefactor = () => {
        setIsRefactoring(true)
        let progressCounter = 0
        const interval = setInterval(() => {
            progressCounter += 20
            setProgress(progressCounter)

            if (progressCounter === 20) {
                setStatusMessage('Analysing code...')
            } else if (progressCounter === 40) {
                setStatusMessage('Restructuring codebase...')
            } else if (progressCounter === 60) {
                setStatusMessage('Implementing best practices...')
            } else if (progressCounter >= 100) {
                setStatusMessage('Refactor complete!')
                clearInterval(interval)
                setCurrentStructure(mockIdealProjectStructure)
                setIsRefactored(true)
                setTimeout(() => {
                    setIsRefactoring(false)
                    setProgress(0)
                    setStatusMessage('')
                }, 1000) // Delay to show completion for a second
            }
        }, 1000)
    }

    // Function to download an empty folder named TSPD in a zip file
    const handleDownload = async () => {
        const zip = new JSZip()

        // Create an empty folder named "TSPD"
        zip.folder("scr")

        // Generate the zip file and trigger the download
        const content = await zip.generateAsync({ type: 'blob' })
        const url = URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = 'src.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }

    // Function to display code with line numbers while preserving empty lines
    const renderCodeWithLineNumbers = (code: string) => {
        const lines = code.split('\n')
        return (
            <div className="flex">
                {/* Line Numbers */}
                <div className="pr-4 text-right text-gray-400 select-none">
                    {lines.map((_, index) => (
                        <div key={index} className="pr-2">
                            {index + 1}
                        </div>
                    ))}
                </div>
                {/* Code Content */}
                <div className="flex-1">
                    {lines.map((line, index) => (
                        <div key={index} className="whitespace-pre">
                            {line.length === 0 ? '\u00A0' : line} {/* Ensure empty lines are preserved */}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex space-x-4">
                {/* Project Tree (1/4 width) */}
                <Card className="flex-1 p-4" style={{ flex: '1 1 25%' }}>
                    <h2 className="text-lg font-semibold mb-2">Project Tree</h2>
                    <ScrollArea className="h-[600px]">
                        {renderFileTree(currentStructure)}
                    </ScrollArea>
                </Card>

                {/* Code Preview (3/4 width) */}
                <Card className="flex-1 p-4" style={{ flex: '3 1 75%' }}>
                    <h2 className="text-lg font-semibold mb-2">{selectedFile || 'File Preview'}</h2>
                    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                        {selectedFile ? (
                            <pre className="text-sm">
                                {renderCodeWithLineNumbers(fileContent)}
                            </pre>
                        ) : (
                            <p className="text-gray-500 text-center">
                                Wähle eine Datei, um den Inhalt anzuzeigen
                            </p>
                        )}
                    </ScrollArea>
                </Card>
            </div>

            {/* Refactor or Download Button */}
            <div className="flex justify-center mt-4">
                {!isRefactored ? (
                    <button
                        className={`px-4 py-2 rounded bg-blue-600 text-white ${isRefactoring && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isRefactoring}
                        onClick={handleRefactor}
                    >
                        {isRefactoring ? 'Refactoring...' : 'REFACTOR'}
                    </button>
                ) : (
                    <button
                        className="px-4 py-2 rounded bg-green-600 text-white"
                        onClick={handleDownload}
                    >
                        DOWNLOAD
                    </button>
                )}
            </div>

            {/* Progress Bar and Status */}
            {isRefactoring && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-center text-gray-700">{statusMessage}</p>
                </div>
            )}
        </div>
    )
}
