import { User } from 'lucide-react'
import Preview from '@/components/Preview'

export default function PreviewPage() {
    return (
        <div className="container mx-auto p-4">
            {/* Header with title and User button */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Project Preview</h1>
                <button className="text-black">
                    <User className="h-8 w-8" />
                </button>
            </div>

            {/* Preview component */}
            <Preview />
        </div>
    )
}
