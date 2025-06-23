"use client"
import { MapPin, Search, Plus, Download, Upload, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePagination } from "@/hooks/use-pagination"
import { Pagination } from "@/components/ui/pagination"
import React from "react"
import { locationService, type Location } from "@/services/location.service"

export function LocationManagement() {
  const locationPagination = usePagination({ initialPageSize: 10 })
  const [locations, setLocations] = React.useState<Location[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Load locations data
  React.useEffect(() => {
    const loadLocations = async () => {
      setLoading(true)
      try {
        const locationData = await locationService.getAllLocations()
        setLocations(locationData)
        locationPagination.setTotalItems(locationData.length)
      } catch (error) {
        console.error("Failed to load locations:", error)
      } finally {
        setLoading(false)
      }
    }

    loadLocations()
  }, [])

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      const allLocations = await locationService.getAllLocations()
      setLocations(allLocations)
      locationPagination.setTotalItems(allLocations.length)
    } else {
      const searchResults = await locationService.searchLocations(query)
      setLocations(searchResults)
      locationPagination.setTotalItems(searchResults.length)
    }
    locationPagination.setPage(1) // Reset to first page
  }

  const pagedLocations = locationPagination.getPagedData(locations)

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Location Management</h2>
          <p className="text-muted-foreground">Manage locations, galleries, and predictions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      <Tabs defaultValue="locations" className="space-y-4 flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="top10">Top 10</TabsTrigger>
        </TabsList>

        <TabsContent value="locations" className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by label..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Multi Create
            </Button>
            <Button variant="outline">Init Data</Button>
          </div>

          <Card className="flex-1 flex flex-col">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading locations...</div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-background">
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Visits</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedLocations.map((location) => (
                        <TableRow key={location.id}>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <span className="font-medium">{location.label}</span>
                                {location.description && (
                                  <p className="text-xs text-muted-foreground">{location.description}</p>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{location.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={location.status === "Active" ? "default" : "secondary"}>
                              {location.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{location.visits}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="text-yellow-500">★</span>
                              <span className="ml-1">{location.rating}</span>
                            </div>
                          </TableCell>
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
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Soft Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="border-t">
                  <Pagination
                    currentPage={locationPagination.currentPage}
                    totalPages={locationPagination.totalPages}
                    pageSize={locationPagination.pageSize}
                    totalItems={locationPagination.totalItems}
                    onPageChange={locationPagination.setPage}
                    onPageSizeChange={locationPagination.setPageSize}
                    className="py-4"
                  />
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4 flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Location Gallery</CardTitle>
              <CardDescription>Manage images and media for locations</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Image {i}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-4">
                <Upload className="h-4 w-4 mr-2" />
                Init Gallery
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4 flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Location Predictions</CardTitle>
              <CardDescription>AI-powered location recommendations and predictions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Enter user preferences..." />
                  <Button>Predict</Button>
                </div>
                <div className="text-center text-muted-foreground py-8">
                  Enter user preferences to get AI-powered location predictions
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top10" className="space-y-4 flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Top 10 Locations</CardTitle>
              <CardDescription>Most popular and highest rated locations</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="space-y-3">
                {locations
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 10)
                  .map((location, index) => (
                    <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{location.label}</p>
                          <p className="text-sm text-muted-foreground">{location.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{location.visits} visits</p>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm">{location.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
