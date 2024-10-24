'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function LandingPageComponent() {
  return (
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <span className="font-bold text-2xl">RefactorPro</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#demo">
              Demo
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#try-now">
              Pricing
            </Link>
          </nav>
        </header>
        <main className="flex-1 flex flex-col justify-center items-center">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  RefactorPro: Your Smart Code Refactoring Assistant
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your codebase with automated refactoring, architecture optimization, and best practices implementation.
                </p>
                <Link href="#try-now">
                  <Button className="mt-4" size="lg">
                    Try Now
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">See RefactorPro in Action</h2>
              <div className="aspect-video mx-auto max-w-4xl">
                <div style={{ padding: '51.94% 0 0 0', position: 'relative' }}>
                  <iframe
                      src="https://player.vimeo.com/video/1022782946?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title="refactor-pro-demo"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="w-full py-12 md:py-24 lg:py-32 flex justify-center items-center">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Automated Code Refactoring",
                    description: "Upload your codebase, and RefactorPro automatically refactors and improves your code for better readability, maintainability, and performance."
                  },
                  {
                    title: "Architecture Optimization",
                    description: "Transform your project with clean, modular architecture following industry-standard design patterns for better scalability and structure."
                  },
                  {
                    title: "Best Practices Implementation",
                    description: "RefactorPro ensures your code follows the latest best practices, reducing technical debt and enhancing code quality."
                  },
                  {
                    title: "Design Pattern Integration",
                    description: "Automatically introduces design patterns like MVC or Singleton, tailored to your project's needs, ensuring a robust structure."
                  },
                  {
                    title: "Error Reduction & Code Quality Improvement",
                    description: "Detects and resolves code smells and potential bugs, enhancing the overall quality and efficiency of your code."
                  },
                  {
                    title: "Small Project Transformation",
                    description: "Perfect for small projects, RefactorPro upgrades your codebase to a streamlined, professional structure, ready for future development."
                  }
                ].map((feature, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{feature.description}</p>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="try-now" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ready to Transform Your Code?</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mb-8">
                Start your journey to cleaner, more efficient code today.
              </p>
              <Link href="/signup-page">
                <Button size="lg">Try Now</Button>
              </Link>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Only $0.03 per 1,000 characters input
              </p>
            </div>
          </section>
        </main>

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 RefactorPro. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
  )
}
