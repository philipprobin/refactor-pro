'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function NotReadyPageComponent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sorry</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl mb-4">The tool is not ready yet, but stay tuned!</p>
          <p className="text-muted-foreground">We&#39;re working hard to bring RefactorPro to you. Thank you for your interest!</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}