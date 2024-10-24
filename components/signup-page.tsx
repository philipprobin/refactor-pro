'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export function SignupPageComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const isFormComplete = Object.values(formData).every(value => value.trim() !== '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await router.push('/not-ready')
    } catch (error) {
      console.error('Navigation error', error)
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Sign Up for RefactorPro</CardTitle>
            <CardDescription>Enter your details to get started with RefactorPro</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                  />
                </div>
              </div>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Only $0.03 per 1,000 characters input
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!isFormComplete}>
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>
  )
}
