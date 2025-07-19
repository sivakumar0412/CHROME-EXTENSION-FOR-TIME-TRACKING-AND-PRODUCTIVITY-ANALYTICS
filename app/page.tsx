import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BarChart3, Shield, Zap, Download, Chrome } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 animate-slideInDown">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-8 w-8 text-blue-600 animate-pulse" />
            <span className="text-2xl font-bold text-gray-900">ProductivityTracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline" className="hover-lift bg-transparent">
                Dashboard
              </Button>
            </Link>
            <Button className="hover-lift animate-glow">Get Started</Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 animate-slideInUp stagger-1" variant="secondary">
            <Chrome className="h-4 w-4 mr-2 animate-spin" style={{ animationDuration: "3s" }} />
            Chrome Extension
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-slideInUp stagger-2">
            Track Your Time, Boost Your <span className="text-blue-600 animate-glow">Productivity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slideInUp stagger-3">
            Automatically track time spent on websites, analyze your productivity patterns, and get insights to improve
            your focus and efficiency.
          </p>
          <div className="flex items-center justify-center space-x-4 animate-slideInUp stagger-4">
            <Button size="lg" className="px-8 hover-lift animate-float">
              <Download className="h-5 w-5 mr-2 animate-bounce" />
              Install Extension
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-8 bg-transparent hover-lift">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-slideInUp">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Stay Productive</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our Chrome extension provides comprehensive time tracking and analytics to help you understand and improve
            your productivity habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover-lift animate-slideInUp stagger-1">
            <CardHeader>
              <Clock className="h-12 w-12 text-blue-600 mb-4 animate-pulse" />
              <CardTitle>Automatic Tracking</CardTitle>
              <CardDescription>Seamlessly track time spent on every website without manual input</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-lift animate-slideInUp stagger-2">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-green-600 mb-4 animate-bounce" />
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>Get comprehensive insights with charts, graphs, and productivity scores</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-lift animate-slideInUp stagger-3">
            <CardHeader>
              <Zap className="h-12 w-12 text-purple-600 mb-4 animate-wiggle" />
              <CardTitle>Smart Classification</CardTitle>
              <CardDescription>
                Automatically categorize websites as productive, unproductive, or neutral
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover-lift animate-slideInUp stagger-4">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mb-4 animate-pulse" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>Your data stays private and secure with local storage options</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slideInUp">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Get started in minutes with our simple three-step process</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-slideInLeft stagger-1">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover-lift animate-float">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Install Extension</h3>
              <p className="text-gray-600">Add our Chrome extension to your browser with one click</p>
            </div>

            <div className="text-center animate-slideInUp stagger-2">
              <div
                className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover-lift animate-float"
                style={{ animationDelay: "0.5s" }}
              >
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Normally</h3>
              <p className="text-gray-600">Continue your regular browsing - we'll track everything automatically</p>
            </div>

            <div className="text-center animate-slideInRight stagger-3">
              <div
                className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover-lift animate-float"
                style={{ animationDelay: "1s" }}
              >
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
              <p className="text-gray-600">Access detailed reports and insights through our dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto animate-slideInUp">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of users who have improved their productivity with our time tracking extension.
          </p>
          <Button size="lg" className="px-8 hover-lift animate-glow">
            <Download className="h-5 w-5 mr-2 animate-bounce" />
            Install Now - It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 animate-slideInUp">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 animate-pulse" />
              <span className="text-lg font-semibold">ProductivityTracker</span>
            </div>
            <p className="text-gray-400">© 2024 ProductivityTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
