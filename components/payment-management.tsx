"use client"

import * as React from "react"
import { CreditCard, QrCode, Receipt, CheckCircle, Clock, XCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"
import { paymentService, type Transaction } from "@/services/payment.service"

export function PaymentManagement() {
  const [qrAmount, setQrAmount] = React.useState("")
  const [qrDescription, setQrDescription] = React.useState("")
  const transactionPagination = usePagination({ initialPageSize: 10 })
  const [transactions, setTransactions] = React.useState<Transaction[]>([])
  const [loading, setLoading] = React.useState(false)
  const [paymentStats, setPaymentStats] = React.useState<any>(null)

  // Load transactions data
  React.useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true)
      try {
        const transactionData = await paymentService.getAllTransactions()
        setTransactions(transactionData)
        transactionPagination.setTotalItems(transactionData.length)

        const stats = await paymentService.getPaymentStats()
        setPaymentStats(stats)
      } catch (error) {
        console.error("Failed to load transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const handleGenerateQR = async () => {
    if (!qrAmount || !qrDescription) return

    try {
      const qrData = await paymentService.generateQRCode(Number.parseInt(qrAmount), qrDescription)
      console.log("QR Code generated:", qrData)
      // Handle QR code display
    } catch (error) {
      console.error("Failed to generate QR code:", error)
    }
  }

  const pagedTransactions = transactionPagination.getPagedData(transactions)

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payment Management</h2>
          <p className="text-muted-foreground">Manage Sepay integration, QR codes, and transactions</p>
        </div>
        <Badge variant="secondary" className="flex items-center">
          <CreditCard className="h-3 w-3 mr-1" />
          Sepay Integration
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {paymentStats ? `${(paymentStats.totalAmount / 1000000).toFixed(1)}M VND` : "Loading..."}
            </div>
            <p className="text-xs text-muted-foreground">+15.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats?.successful || 0}</div>
            <p className="text-xs text-muted-foreground">{paymentStats?.successRate || 0}% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats?.pending || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Transactions</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats?.failed || 0}</div>
            <p className="text-xs text-muted-foreground">{100 - (paymentStats?.successRate || 0)}% failure rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4 flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="qr-generator">QR Generator</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search transactions..." className="w-[300px]" />
              <Button variant="outline">Filter</Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>Load All Transactions</Button>
            </div>
          </div>

          <Card className="flex-1 flex flex-col">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading transactions...</div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono">{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell className="font-medium">{transaction.amount}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "Success"
                                  ? "default"
                                  : transaction.status === "Pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="border-t">
                  <Pagination
                    currentPage={transactionPagination.currentPage}
                    totalPages={transactionPagination.totalPages}
                    pageSize={transactionPagination.pageSize}
                    totalItems={transactionPagination.totalItems}
                    onPageChange={transactionPagination.setPage}
                    onPageSizeChange={transactionPagination.setPageSize}
                    className="py-4"
                  />
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="qr-generator" className="space-y-4 flex-1">
          <div className="grid gap-4 md:grid-cols-2 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="h-5 w-5 mr-2" />
                  Generate QR Code
                </CardTitle>
                <CardDescription>Create QR codes for payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount (VND)</label>
                  <Input
                    type="number"
                    placeholder="Enter amount..."
                    value={qrAmount}
                    onChange={(e) => setQrAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    placeholder="Payment description..."
                    value={qrDescription}
                    onChange={(e) => setQrDescription(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleGenerateQR}>
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated QR Code</CardTitle>
                <CardDescription>QR code for payment</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4 flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sepay Webhooks</CardTitle>
              <CardDescription>Monitor webhook events from Sepay</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Confirmation</p>
                    <p className="text-sm text-muted-foreground">Webhook received for transaction TXN001</p>
                  </div>
                  <Badge>Success</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Failed</p>
                    <p className="text-sm text-muted-foreground">Webhook received for transaction TXN003</p>
                  </div>
                  <Badge variant="destructive">Failed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
