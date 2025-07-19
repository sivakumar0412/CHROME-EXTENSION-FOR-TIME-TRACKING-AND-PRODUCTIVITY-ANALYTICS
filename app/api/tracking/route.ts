import { type NextRequest, NextResponse } from "next/server"

// In a real application, you would use a database
// For this example, we'll use in-memory storage
const trackingData: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { userId, date, websites } = data

    if (!trackingData[userId]) {
      trackingData[userId] = {}
    }

    trackingData[userId][date] = websites

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const userData = trackingData[userId] || {}

    // Filter data by date range if provided
    let filteredData = userData
    if (startDate && endDate) {
      filteredData = Object.keys(userData)
        .filter((date) => date >= startDate && date <= endDate)
        .reduce(
          (acc, date) => {
            acc[date] = userData[date]
            return acc
          },
          {} as Record<string, any>,
        )
    }

    return NextResponse.json({ data: filteredData })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
