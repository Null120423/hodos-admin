export interface Location {
  id: number
  label: string
  type: string
  status: string
  visits: string
  rating: number
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
  images?: string[]
}

class LocationService {
  private locations: Location[] = [
    {
      id: 1,
      label: "Hanoi Old Quarter",
      type: "Historical",
      status: "Active",
      visits: "12.5k",
      rating: 4.8,
      coordinates: { lat: 21.0285, lng: 105.8542 },
      description: "Historic area in the heart of Hanoi",
      images: ["/images/hanoi-old-quarter-1.jpg", "/images/hanoi-old-quarter-2.jpg"],
    },
    {
      id: 2,
      label: "Ha Long Bay",
      type: "Natural",
      status: "Active",
      visits: "8.2k",
      rating: 4.9,
      coordinates: { lat: 20.9101, lng: 107.1839 },
      description: "UNESCO World Heritage Site with limestone karsts",
      images: ["/images/halong-bay-1.jpg", "/images/halong-bay-2.jpg"],
    },
    {
      id: 3,
      label: "Hoi An Ancient Town",
      type: "Cultural",
      status: "Active",
      visits: "15.3k",
      rating: 4.7,
      coordinates: { lat: 15.8801, lng: 108.338 },
      description: "Well-preserved ancient trading port",
      images: ["/images/hoi-an-1.jpg", "/images/hoi-an-2.jpg"],
    },
    {
      id: 4,
      label: "Sapa Terraces",
      type: "Natural",
      status: "Inactive",
      visits: "6.1k",
      rating: 4.6,
      coordinates: { lat: 22.3364, lng: 103.8438 },
      description: "Beautiful rice terraces in the mountains",
    },
    {
      id: 5,
      label: "Ho Chi Minh Mausoleum",
      type: "Historical",
      status: "Active",
      visits: "9.8k",
      rating: 4.5,
      coordinates: { lat: 21.0361, lng: 105.8342 },
      description: "Final resting place of Ho Chi Minh",
    },
    {
      id: 6,
      label: "Mekong Delta",
      type: "Natural",
      status: "Active",
      visits: "7.3k",
      rating: 4.4,
      coordinates: { lat: 10.0452, lng: 105.7469 },
      description: "Vast maze of rivers, swamps and islands",
    },
    {
      id: 7,
      label: "Cu Chi Tunnels",
      type: "Historical",
      status: "Active",
      visits: "11.2k",
      rating: 4.6,
      coordinates: { lat: 11.1581, lng: 106.4714 },
      description: "Underground tunnel network from Vietnam War",
    },
    {
      id: 8,
      label: "Phong Nha Cave",
      type: "Natural",
      status: "Active",
      visits: "5.9k",
      rating: 4.8,
      coordinates: { lat: 17.5813, lng: 106.2665 },
      description: "Spectacular cave system in national park",
    },
    {
      id: 9,
      label: "Imperial City Hue",
      type: "Historical",
      status: "Active",
      visits: "8.7k",
      rating: 4.5,
      coordinates: { lat: 16.4637, lng: 107.5909 },
      description: "Former imperial capital with ancient citadel",
    },
    {
      id: 10,
      label: "Ban Gioc Falls",
      type: "Natural",
      status: "Active",
      visits: "4.2k",
      rating: 4.7,
      coordinates: { lat: 22.8536, lng: 106.727 },
      description: "Tiered waterfall on Vietnam-China border",
    },
    {
      id: 11,
      label: "My Son Sanctuary",
      type: "Cultural",
      status: "Active",
      visits: "6.8k",
      rating: 4.3,
      coordinates: { lat: 15.7649, lng: 108.1233 },
      description: "Ancient Hindu temple complex",
    },
    {
      id: 12,
      label: "Cao Dai Temple",
      type: "Religious",
      status: "Active",
      visits: "3.5k",
      rating: 4.2,
      coordinates: { lat: 11.3547, lng: 106.1045 },
      description: "Holy See temple of Cao Daism",
    },
    {
      id: 13,
      label: "Marble Mountains",
      type: "Natural",
      status: "Active",
      visits: "7.9k",
      rating: 4.4,
      coordinates: { lat: 15.9926, lng: 108.2677 },
      description: "Cluster of five marble and limestone hills",
    },
    {
      id: 14,
      label: "Temple of Literature",
      type: "Cultural",
      status: "Active",
      visits: "10.1k",
      rating: 4.6,
      coordinates: { lat: 21.0285, lng: 105.8355 },
      description: "Vietnam's first university, dedicated to Confucius",
    },
    {
      id: 15,
      label: "One Pillar Pagoda",
      type: "Religious",
      status: "Active",
      visits: "5.7k",
      rating: 4.3,
      coordinates: { lat: 21.0358, lng: 105.8342 },
      description: "Historic Buddhist temple built in 1049",
    },
  ]

  async getAllLocations(): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.locations]
  }

  async getLocationById(id: number): Promise<Location | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.locations.find((location) => location.id === id) || null
  }

  async searchLocations(query: string): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const lowercaseQuery = query.toLowerCase()
    return this.locations.filter(
      (location) =>
        location.label.toLowerCase().includes(lowercaseQuery) || location.type.toLowerCase().includes(lowercaseQuery),
    )
  }

  async getLocationsByType(type: string): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return this.locations.filter((location) => location.type === type)
  }

  async getTopRatedLocations(limit = 10): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.locations].sort((a, b) => b.rating - a.rating).slice(0, limit)
  }

  async getLocationStats(): Promise<{
    total: number
    active: number
    inactive: number
    byType: Record<string, number>
    averageRating: number
  }> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    const byType = this.locations.reduce(
      (acc, location) => {
        acc[location.type] = (acc[location.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const averageRating = this.locations.reduce((sum, location) => sum + location.rating, 0) / this.locations.length

    return {
      total: this.locations.length,
      active: this.locations.filter((l) => l.status === "Active").length,
      inactive: this.locations.filter((l) => l.status === "Inactive").length,
      byType,
      averageRating: Math.round(averageRating * 10) / 10,
    }
  }
}

export const locationService = new LocationService()
