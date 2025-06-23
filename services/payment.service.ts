export interface Transaction {
  id: string
  amount: string
  status: "Success" | "Pending" | "Failed"
  method: string
  date: string
  customer: string
  description?: string
  reference?: string
}

class PaymentService {
  private transactions: Transaction[] = [
    {
      id: "TXN001",
      amount: "500,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-15",
      customer: "John Doe",
      description: "Tour booking payment",
      reference: "REF001",
    },
    {
      id: "TXN002",
      amount: "1,200,000 VND",
      status: "Pending",
      method: "Bank Transfer",
      date: "2024-01-15",
      customer: "Jane Smith",
      description: "Hotel reservation",
      reference: "REF002",
    },
    {
      id: "TXN003",
      amount: "750,000 VND",
      status: "Failed",
      method: "QR Code",
      date: "2024-01-14",
      customer: "Bob Johnson",
      description: "Flight booking",
      reference: "REF003",
    },
    {
      id: "TXN004",
      amount: "2,000,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-14",
      customer: "Alice Brown",
      description: "Package tour",
      reference: "REF004",
    },
    {
      id: "TXN005",
      amount: "850,000 VND",
      status: "Success",
      method: "Bank Transfer",
      date: "2024-01-14",
      customer: "Charlie Wilson",
      description: "Car rental",
      reference: "REF005",
    },
    {
      id: "TXN006",
      amount: "1,500,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-13",
      customer: "Diana Prince",
      description: "Adventure tour",
      reference: "REF006",
    },
    {
      id: "TXN007",
      amount: "650,000 VND",
      status: "Pending",
      method: "QR Code",
      date: "2024-01-13",
      customer: "Edward Norton",
      description: "Museum tickets",
      reference: "REF007",
    },
    {
      id: "TXN008",
      amount: "900,000 VND",
      status: "Success",
      method: "Bank Transfer",
      date: "2024-01-13",
      customer: "Fiona Green",
      description: "Food tour",
      reference: "REF008",
    },
    {
      id: "TXN009",
      amount: "1,100,000 VND",
      status: "Failed",
      method: "QR Code",
      date: "2024-01-12",
      customer: "George Miller",
      description: "Cruise booking",
      reference: "REF009",
    },
    {
      id: "TXN010",
      amount: "800,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-12",
      customer: "Helen Davis",
      description: "City tour",
      reference: "REF010",
    },
    {
      id: "TXN011",
      amount: "1,800,000 VND",
      status: "Success",
      method: "Bank Transfer",
      date: "2024-01-12",
      customer: "Ian Thompson",
      description: "Luxury package",
      reference: "REF011",
    },
    {
      id: "TXN012",
      amount: "700,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-11",
      customer: "Julia Roberts",
      description: "Cultural tour",
      reference: "REF012",
    },
    {
      id: "TXN013",
      amount: "950,000 VND",
      status: "Pending",
      method: "QR Code",
      date: "2024-01-11",
      customer: "Kevin Hart",
      description: "Beach resort",
      reference: "REF013",
    },
    {
      id: "TXN014",
      amount: "1,300,000 VND",
      status: "Success",
      method: "Bank Transfer",
      date: "2024-01-11",
      customer: "Lisa Anderson",
      description: "Mountain trek",
      reference: "REF014",
    },
    {
      id: "TXN015",
      amount: "600,000 VND",
      status: "Success",
      method: "QR Code",
      date: "2024-01-10",
      customer: "Michael Scott",
      description: "Local experience",
      reference: "REF015",
    },
  ]

  async getAllTransactions(): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.transactions]
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.transactions.find((transaction) => transaction.id === id) || null
  }

  async searchTransactions(query: string): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const lowercaseQuery = query.toLowerCase()
    return this.transactions.filter(
      (transaction) =>
        transaction.id.toLowerCase().includes(lowercaseQuery) ||
        transaction.customer.toLowerCase().includes(lowercaseQuery) ||
        transaction.method.toLowerCase().includes(lowercaseQuery),
    )
  }

  async getTransactionsByStatus(status: Transaction["status"]): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.transactions.filter((transaction) => transaction.status === status)
  }

  async getTransactionsByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.transactions.filter((transaction) => transaction.date >= startDate && transaction.date <= endDate)
  }

  async getPaymentStats(): Promise<{
    total: number
    totalAmount: number
    successful: number
    pending: number
    failed: number
    byMethod: Record<string, number>
    successRate: number
  }> {
    await new Promise((resolve) => setTimeout(resolve, 50))

    const totalAmount = this.transactions.reduce((sum, transaction) => {
      const amount = Number.parseInt(transaction.amount.replace(/[^\d]/g, ""))
      return sum + amount
    }, 0)

    const byMethod = this.transactions.reduce(
      (acc, transaction) => {
        acc[transaction.method] = (acc[transaction.method] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const successful = this.transactions.filter((t) => t.status === "Success").length
    const successRate = Math.round((successful / this.transactions.length) * 100)

    return {
      total: this.transactions.length,
      totalAmount,
      successful,
      pending: this.transactions.filter((t) => t.status === "Pending").length,
      failed: this.transactions.filter((t) => t.status === "Failed").length,
      byMethod,
      successRate,
    }
  }

  async generateQRCode(
    amount: number,
    description: string,
  ): Promise<{
    qrCode: string
    transactionId: string
    expiresAt: string
  }> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const transactionId = `QR${Date.now()}`
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes

    return {
      qrCode: `data:image/svg+xml;base64,${btoa(`<svg>QR Code for ${amount} VND</svg>`)}`,
      transactionId,
      expiresAt,
    }
  }
}

export const paymentService = new PaymentService()
