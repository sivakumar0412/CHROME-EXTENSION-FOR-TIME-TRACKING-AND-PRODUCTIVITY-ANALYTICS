"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Clock, TrendingUp, Monitor, BarChart3 } from "lucide-react"
import {
  Bar,
  BarChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface WebsiteData {
  domain: string
  timeSpent: number
  category: "productive" | "unproductive" | "neutral"
  visits: number
}

interface DayData {
  [domain: string]: WebsiteData
}

interface TrackingData {
  [date: string]: DayData
}

const COLORS = {
  productive: "#10b981",
  unproductive: "#ef4444",
  neutral: "#6b7280",
}

export default function Dashboard() {
  const [trackingData, setTrackingData] = useState<TrackingData>({})
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("today")
  const [loading, setLoading] = useState(true)
  const [animatedValues, setAnimatedValues] = useState({
    totalTime: 0,
    productiveTime: 0,
    unproductiveTime: 0,
    productivityScore: 0,
  })

  useEffect(() => {
    loadTrackingData()
  }, [])

  const loadTrackingData = async () => {
    try {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockData: TrackingData = {
        [new Date().toISOString().split("T")[0]]: {
          "github.com": {
            domain: "github.com",
            timeSpent: 7200000, // 2 hours
            category: "productive",
            visits: 15,
          },
          "stackoverflow.com": {
            domain: "stackoverflow.com",
            timeSpent: 3600000, // 1 hour
            category: "productive",
            visits: 8,
          },
          "youtube.com": {
            domain: "youtube.com",
            timeSpent: 5400000, // 1.5 hours
            category: "unproductive",
            visits: 12,
          },
          "facebook.com": {
            domain: "facebook.com",
            timeSpent: 1800000, // 30 minutes
            category: "unproductive",
            visits: 5,
          },
          "docs.google.com": {
            domain: "docs.google.com",
            timeSpent: 2700000, // 45 minutes
            category: "productive",
            visits: 6,
          },
        },
      }

      setTrackingData(mockData)
      setLoading(false)

      // Animate values after loading
      const { totalTime, productiveTime, unproductiveTime, productivityScore } = getAggregatedData(mockData)
      animateValues({ totalTime, productiveTime, unproductiveTime, productivityScore })
    } catch (error) {
      console.error("Failed to load tracking data:", error)
      setLoading(false)
    }
  }

  const animateValues = (targetValues: typeof animatedValues) => {
    const duration = 1500
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)

      setAnimatedValues({
        totalTime: Math.floor(targetValues.totalTime * easeOutCubic),
        productiveTime: Math.floor(targetValues.productiveTime * easeOutCubic),
        unproductiveTime: Math.floor(targetValues.unproductiveTime * easeOutCubic),
        productivityScore: Math.floor(targetValues.productivityScore * easeOutCubic),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getAggregatedData = (data = trackingData) => {
    const today = new Date().toISOString().split("T")[0]
    const dayData = data[today] || {}

    let totalTime = 0
    let productiveTime = 0
    let unproductiveTime = 0
    let neutralTime = 0

    const websites = Object.values(dayData)
      .map((website) => {
        totalTime += website.timeSpent

        switch (website.category) {
          case "productive":
            productiveTime += website.timeSpent
            break
          case "unproductive":
            unproductiveTime += website.timeSpent
            break
          case "neutral":
            neutralTime += website.timeSpent
            break
        }

        return website
      })
      .sort((a, b) => b.timeSpent - a.timeSpent)

    return {
      totalTime,
      productiveTime,
      unproductiveTime,
      neutralTime,
      websites,
      productivityScore: totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0,
    }
  }

  const { totalTime, productiveTime, unproductiveTime, neutralTime, websites, productivityScore } = getAggregatedData()

  const chartData = [
    { name: "Productive", value: productiveTime, color: COLORS.productive },
    { name: "Unproductive", value: unproductiveTime, color: COLORS.unproductive },
    { name: "Neutral", value: neutralTime, color: COLORS.neutral },
  ].filter((item) => item.value > 0)

  const barChartData = websites.slice(0, 10).map((website) => ({
    domain: website.domain.replace(".com", ""),
    timeSpent: Math.round(website.timeSpent / (1000 * 60)), // Convert to minutes
    category: website.category,
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <div
              className="absolute inset-0 rounded-full h-32 w-32 border-t-2 border-blue-300 mx-auto animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
            ></div>
          </div>
          <p className="mt-6 text-gray-600 animate-pulse">Loading your productivity data...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-slideInDown">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Productivity Dashboard</h1>
          <p className="text-gray-600">Track your time and analyze your productivity patterns</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className="animate-slideInUp hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "0.1s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-countUp">{formatTime(animatedValues.totalTime)}</div>
              <p className="text-xs text-muted-foreground">Today's activity</p>
            </CardContent>
          </Card>

          <Card
            className="animate-slideInUp hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "0.2s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productive Time</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 animate-bounce" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 animate-countUp">
                {formatTime(animatedValues.productiveTime)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalTime > 0 ? Math.round((productiveTime / totalTime) * 100) : 0}% of total time
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slideInUp hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "0.3s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600 animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 animate-countUp">
                {animatedValues.productivityScore}%
              </div>
              <Progress value={animatedValues.productivityScore} className="mt-2 animate-fillProgress" />
            </CardContent>
          </Card>

          <Card
            className="animate-slideInUp hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: "0.4s" }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Websites Visited</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold animate-countUp">{websites.length}</div>
              <p className="text-xs text-muted-foreground">Unique domains</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <TabsList className="animate-slideInUp">
            <TabsTrigger value="overview" className="transition-all duration-200 hover:scale-105">
              Overview
            </TabsTrigger>
            <TabsTrigger value="websites" className="transition-all duration-200 hover:scale-105">
              Websites
            </TabsTrigger>
            <TabsTrigger value="reports" className="transition-all duration-200 hover:scale-105">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time Distribution Chart */}
              <Card className="animate-slideInLeft hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Time Distribution</CardTitle>
                  <CardDescription>How you spent your time today</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      productive: { label: "Productive", color: COLORS.productive },
                      unproductive: { label: "Unproductive", color: COLORS.unproductive },
                      neutral: { label: "Neutral", color: COLORS.neutral },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1000}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0]
                              return (
                                <div className="bg-white p-2 border rounded shadow animate-fadeIn">
                                  <p className="font-medium">{data.name}</p>
                                  <p className="text-sm text-gray-600">{formatTime(data.value as number)}</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Top Websites */}
              <Card className="animate-slideInRight hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>Top Websites</CardTitle>
                  <CardDescription>Most visited websites today</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      timeSpent: { label: "Time (minutes)", color: "#2563eb" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="domain" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-white p-2 border rounded shadow animate-fadeIn">
                                  <p className="font-medium">{label}</p>
                                  <p className="text-sm text-gray-600">{payload[0].value} minutes</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="timeSpent" fill="#2563eb" animationDuration={1000} animationBegin={200} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="websites" className="space-y-6">
            <Card className="animate-slideInUp">
              <CardHeader>
                <CardTitle>Website Activity</CardTitle>
                <CardDescription>Detailed breakdown of time spent on each website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {websites.map((website, index) => (
                    <div
                      key={website.domain}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-slideInLeft"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="text-lg font-medium animate-bounce"
                          style={{ animationDelay: `${index * 0.1 + 0.5}s`, animationDuration: "2s" }}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{website.domain}</div>
                          <div className="text-sm text-gray-500">{website.visits} visits</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge
                          variant={
                            website.category === "productive"
                              ? "default"
                              : website.category === "unproductive"
                                ? "destructive"
                                : "secondary"
                          }
                          className="animate-pulse"
                        >
                          {website.category}
                        </Badge>
                        <div className="text-lg font-medium animate-countUp">{formatTime(website.timeSpent)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="animate-slideInUp">
              <CardHeader>
                <CardTitle>Weekly Productivity Report</CardTitle>
                <CardDescription>Your productivity summary for this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg animate-slideInLeft hover:scale-105 transition-transform duration-300">
                      <div className="text-2xl font-bold text-green-600 animate-countUp">
                        {formatTime(productiveTime)}
                      </div>
                      <div className="text-sm text-green-700">Productive Time</div>
                    </div>
                    <div
                      className="text-center p-4 bg-red-50 rounded-lg animate-slideInUp hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div className="text-2xl font-bold text-red-600 animate-countUp">
                        {formatTime(unproductiveTime)}
                      </div>
                      <div className="text-sm text-red-700">Unproductive Time</div>
                    </div>
                    <div
                      className="text-center p-4 bg-blue-50 rounded-lg animate-slideInRight hover:scale-105 transition-transform duration-300"
                      style={{ animationDelay: "0.2s" }}
                    >
                      <div className="text-2xl font-bold text-blue-600 animate-countUp">{productivityScore}%</div>
                      <div className="text-sm text-blue-700">Productivity Score</div>
                    </div>
                  </div>

                  <div className="prose max-w-none animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                    <h3>Insights & Recommendations</h3>
                    <ul className="space-y-2">
                      <li className="animate-slideInLeft" style={{ animationDelay: "0.6s" }}>
                        {productivityScore >= 70
                          ? "🎉 Great job! You're maintaining high productivity levels."
                          : productivityScore >= 50
                            ? "👍 Good progress! Try to reduce time on unproductive websites."
                            : "💡 Consider setting time limits for social media and entertainment sites."}
                      </li>
                      <li className="animate-slideInLeft" style={{ animationDelay: "0.7s" }}>
                        🚀 Your most productive time was spent on{" "}
                        {websites.filter((w) => w.category === "productive")[0]?.domain || "coding platforms"}.
                      </li>
                      <li className="animate-slideInLeft" style={{ animationDelay: "0.8s" }}>
                        {unproductiveTime > productiveTime
                          ? "🔒 Try using website blockers during work hours to improve focus."
                          : "⚖️ Keep up the good balance between work and leisure activities."}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
