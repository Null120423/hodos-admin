export interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSession: string
  apiRequests: number
  serverUptime: number
  storageUsed: number
  errorRate: number
  responseTime: number
  throughput: string
}

export interface ApiEndpoint {
  endpoint: string
  method: string
  status: "Healthy" | "Warning" | "Error"
  responseTime: string
  requests: string
}

class AnalyticsService {
  private analyticsData: AnalyticsData = {
    pageViews: 12847,
    uniqueVisitors: 3421,
    bounceRate: 24.3,
    avgSession: "4m 32s",
    apiRequests: 45200,
    serverUptime: 99.9,
    storageUsed: 68.4,
    errorRate: 0.12,
    responseTime: 145,
    throughput: "1.2k/min",
  }

  private apiEndpoints: ApiEndpoint[] = [
    { endpoint: "/api/users", method: "GET", status: "Healthy", responseTime: "45ms", requests: "1.2k" },
    { endpoint: "/api/auth/login", method: "POST", status: "Healthy", responseTime: "120ms", requests: "856" },
    { endpoint: "/api/content", method: "GET", status: "Warning", responseTime: "230ms", requests: "2.1k" },
    { endpoint: "/api/upload", method: "POST", status: "Error", responseTime: "1.2s", requests: "45" },
    { endpoint: "/api/locations", method: "GET", status: "Healthy", responseTime: "67ms", requests: "3.4k" },
    { endpoint: "/api/payments", method: "POST", status: "Healthy", responseTime: "89ms", requests: "567" },
    { endpoint: "/api/analytics", method: "GET", status: "Warning", responseTime: "156ms", requests: "234" },
  ]

  async getAnalyticsData(): Promise<AnalyticsData> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return { ...this.analyticsData }
  }

  async getApiEndpoints(): Promise<ApiEndpoint[]> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return [...this.apiEndpoints]
  }

  async getTrafficData(days = 30): Promise<
    Array<{
      date: string
      visitors: number
      pageViews: number
    }>
  > {
    await new Promise((resolve) => setTimeout(resolve, 150))

    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      data.push({
        date: date.toISOString().split("T")[0],
        visitors: Math.floor(Math.random() * 500) + 100,
        pageViews: Math.floor(Math.random() * 1500) + 300,
      })
    }

    return data
  }

  async getPerformanceMetrics(): Promise<{
    cpu: number
    memory: number
    disk: number
    network: number
  }> {
    await new Promise((resolve) => setTimeout(resolve, 100))

    return {
      cpu: Math.floor(Math.random() * 30) + 20,
      memory: Math.floor(Math.random() * 40) + 40,
      disk: Math.floor(Math.random() * 20) + 60,
      network: Math.floor(Math.random() * 50) + 25,
    }
  }
}

export const analyticsService = new AnalyticsService()
