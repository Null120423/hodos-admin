"use client"

import * as React from "react"
import {
  Users,
  BarChart3,
  Settings,
  Database,
  Activity,
  FileText,
  Shield,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
  TrendingUp,
  Server,
  CheckCircle,
  MapPin,
  ImageIcon,
  Bot,
  MessageSquare,
  Calendar,
  Languages,
  Smartphone,
  Upload,
  Route,
  HelpCircle,
  Navigation,
  Briefcase,
  CreditCard,
  QrCode,
  Receipt,
  Webhook,
  Map,
  LogOut,
  UserIcon,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

import { LocationManagement } from "./location-management"
import { AIServices } from "./ai-services"
import { PaymentManagement } from "./payment-management"
import { useAuth } from "@/hooks/use-auth"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"

// Import services
import { userService } from "@/services/user.service"
import { analyticsService } from "@/services/analytics.service"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: BarChart3, isActive: true },
      { title: "Analytics", icon: Activity },
    ],
  },
  {
    title: "Authentication",
    items: [
      { title: "User Profiles", icon: Users },
      { title: "Sign-ins", icon: Shield },
      { title: "Verifications", icon: CheckCircle },
    ],
  },
  {
    title: "Location Management",
    items: [
      { title: "Locations", icon: MapPin },
      { title: "Location Search", icon: Search },
      { title: "Location Gallery", icon: ImageIcon },
      { title: "Location Predictions", icon: TrendingUp },
    ],
  },
  {
    title: "AI Services",
    items: [
      { title: "Gemini AI", icon: Bot },
      { title: "AI Chat", icon: MessageSquare },
      { title: "AI Scheduling", icon: Calendar },
      { title: "AI Translation", icon: Languages },
    ],
  },
  {
    title: "Content Management",
    items: [
      { title: "Blogs", icon: FileText },
      { title: "Mobile Posts", icon: Smartphone },
      { title: "Media Upload", icon: Upload },
    ],
  },
  {
    title: "Trip Planning",
    items: [
      { title: "Trip Plans", icon: Route },
      { title: "Trip Questions", icon: HelpCircle },
      { title: "Trip Directions", icon: Navigation },
      { title: "User Trips", icon: Briefcase },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "Sepay Integration", icon: CreditCard },
      { title: "QR Codes", icon: QrCode },
      { title: "Transactions", icon: Receipt },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Logs", icon: FileText },
      { title: "Webhooks", icon: Webhook },
      { title: "VietMap", icon: Map },
      { title: "Settings", icon: Settings },
    ],
  },
]

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const userPagination = usePagination({ initialPageSize: 5 })
  const [activeSection, setActiveSection] = React.useState("Dashboard")
  const [users, setUsers] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [apiEndpoints, setApiEndpoints] = React.useState([])

  // Load users data
  React.useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        const userData = await userService.getAllUsers()
        setUsers(userData)
        userPagination.setTotalItems(userData.length)
      } catch (error) {
        console.error("Failed to load users:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Load API endpoints data
  React.useEffect(() => {
    const loadApiEndpoints = async () => {
      try {
        const endpoints = await analyticsService.getApiEndpoints()
        setApiEndpoints(endpoints)
      } catch (error) {
        console.error("Failed to load API endpoints:", error)
      }
    }

    loadApiEndpoints()
  }, [])

  const renderDashboardContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <h1 className="text-2xl font-bold text-blue-900">Welcome back, {user?.username}!</h1>
              <p className="text-blue-700 mt-1">Here's what's happening with your Hodos system today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5%
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45.2k</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.2%
                    </span>
                    from last hour
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.9%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      All systems operational
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68.4%</div>
                  <Progress value={68.4} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">342 GB of 500 GB used</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and System Status */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest system events and user actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">John Doe created a new user</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SY</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">System backup completed</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Alice Brown updated content</p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints Status</CardTitle>
                  <CardDescription>Real-time monitoring of API endpoints</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>{endpoint.method}</Badge>
                          <span className="text-sm font-mono">{endpoint.endpoint}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              endpoint.status === "Healthy"
                                ? "default"
                                : endpoint.status === "Warning"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {endpoint.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{endpoint.responseTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "User Profiles":
        const pagedUsers = userPagination.getPagedData(users)

        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Manage system users and their permissions</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." className="pl-8" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="text-muted-foreground">Loading users...</div>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="border-t">
                    <Pagination
                      currentPage={userPagination.currentPage}
                      totalPages={userPagination.totalPages}
                      pageSize={userPagination.pageSize}
                      totalItems={userPagination.totalItems}
                      onPageChange={userPagination.setPage}
                      onPageSizeChange={userPagination.setPageSize}
                      className="py-4"
                    />
                  </div>
                </>
              )}
            </Card>
          </div>
        )

      case "Analytics":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">System performance and usage analytics</p>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="api">API Usage</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12,847</div>
                      <p className="text-xs text-muted-foreground">+15.2% from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3,421</div>
                      <p className="text-xs text-muted-foreground">+8.7% from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24.3%</div>
                      <p className="text-xs text-muted-foreground">-2.1% from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4m 32s</div>
                      <p className="text-xs text-muted-foreground">+12s from last week</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Overview</CardTitle>
                    <CardDescription>Daily traffic for the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Chart placeholder - Traffic data visualization would go here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">145ms</div>
                      <Progress value={75} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0.12%</div>
                      <Progress value={12} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Throughput</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1.2k/min</div>
                      <Progress value={85} className="mt-2" />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "Locations":
      case "Location Search":
      case "Location Gallery":
      case "Location Predictions":
        return <LocationManagement />

      case "Gemini AI":
      case "AI Chat":
      case "AI Scheduling":
      case "AI Translation":
        return <AIServices />

      case "Sepay Integration":
      case "QR Codes":
      case "Transactions":
        return <PaymentManagement />

      case "Blogs":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Blog Management</h2>
                <p className="text-muted-foreground">Create and manage blog posts</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Blog
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  Blog management interface - Create, edit, and manage blog posts
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "Trip Plans":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Trip Planning</h2>
                <p className="text-muted-foreground">Manage user trip plans and itineraries</p>
              </div>
              <Button>Load Questions</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Active Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-sm text-muted-foreground">Currently planned</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,891</div>
                  <p className="text-sm text-muted-foreground">Successfully completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-sm text-muted-foreground">User satisfaction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "Logs":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">System Logs</h2>
              <p className="text-muted-foreground">Monitor build logs and error logs</p>
            </div>
            <Tabs defaultValue="build" className="space-y-4">
              <TabsList>
                <TabsTrigger value="build">Build Logs</TabsTrigger>
                <TabsTrigger value="error">Error Logs</TabsTrigger>
              </TabsList>
              <TabsContent value="build">
                <Card>
                  <CardHeader>
                    <CardTitle>Build Log Pagination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-green-600">[2024-01-15 10:30:15] Build started successfully</div>
                      <div className="text-blue-600">[2024-01-15 10:30:45] Installing dependencies...</div>
                      <div className="text-green-600">[2024-01-15 10:31:20] Build completed successfully</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="error">
                <Card>
                  <CardHeader>
                    <CardTitle>Error Log Pagination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-red-600">[2024-01-15 09:15:32] ERROR: Database connection failed</div>
                      <div className="text-yellow-600">[2024-01-15 09:10:15] WARN: High memory usage detected</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )

      case "VietMap":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">VietMap Integration</h2>
              <p className="text-muted-foreground">Route finding and mapping services</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Find Route</CardTitle>
                <CardDescription>Calculate routes between locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From</label>
                    <Input placeholder="Starting location..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">To</label>
                    <Input placeholder="Destination..." />
                  </div>
                </div>
                <Button>Find Route</Button>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-[400px]">
            <div className="text-center">
              <h3 className="text-lg font-semibold">{activeSection}</h3>
              <p className="text-muted-foreground">This section is under development</p>
            </div>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="[&[data-state=collapsed]]:w-20">
        <SidebarHeader>
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">
              <span className="font-semibold">Hodos Admin</span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          </div>
          <div className="px-4 group-data-[collapsible=icon]:px-2">
            <div className="relative group-data-[collapsible=icon]:hidden">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <SidebarInput placeholder="Search..." className="pl-8" />
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {navigationItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:sr-only">{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={activeSection === item.title}
                        onClick={() => setActiveSection(item.title)}
                        tooltip={item.title}
                        className="group-data-[collapsible=icon]:justify-center"
                      >
                        {item.icon === ImageIcon ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : (
                          <item.icon className="h-4 w-4" />
                        )}
                        <span className="group-data-[collapsible=icon]:sr-only">{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activeSection}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || "A"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.username}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.role}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col gap-4 p-4 h-full">{renderDashboardContent()}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
