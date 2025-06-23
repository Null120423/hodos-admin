export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
}

class UserService {
  private users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", lastLogin: "1 day ago" },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Moderator",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "User",
      status: "Active",
      lastLogin: "5 hours ago",
    },
    {
      id: 6,
      name: "Diana Prince",
      email: "diana@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "1 hour ago",
    },
    {
      id: 7,
      name: "Edward Norton",
      email: "edward@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "2 weeks ago",
    },
    {
      id: 8,
      name: "Fiona Green",
      email: "fiona@example.com",
      role: "Moderator",
      status: "Active",
      lastLogin: "4 hours ago",
    },
    {
      id: 9,
      name: "George Miller",
      email: "george@example.com",
      role: "User",
      status: "Active",
      lastLogin: "6 hours ago",
    },
    {
      id: 10,
      name: "Helen Davis",
      email: "helen@example.com",
      role: "User",
      status: "Active",
      lastLogin: "8 hours ago",
    },
    {
      id: 11,
      name: "Ian Thompson",
      email: "ian@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "30 minutes ago",
    },
    {
      id: 12,
      name: "Julia Roberts",
      email: "julia@example.com",
      role: "User",
      status: "Inactive",
      lastLogin: "3 days ago",
    },
    {
      id: 13,
      name: "Kevin Hart",
      email: "kevin@example.com",
      role: "User",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 14,
      name: "Lisa Anderson",
      email: "lisa@example.com",
      role: "Moderator",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 15,
      name: "Michael Scott",
      email: "michael@example.com",
      role: "User",
      status: "Active",
      lastLogin: "45 minutes ago",
    },
    {
      id: 16,
      name: "Nancy Wilson",
      email: "nancy@example.com",
      role: "User",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 17,
      name: "Oscar Martinez",
      email: "oscar@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "1 hour ago",
    },
    { id: 18, name: "Pam Beesly", email: "pam@example.com", role: "User", status: "Active", lastLogin: "2 hours ago" },
    {
      id: 19,
      name: "Quincy Adams",
      email: "quincy@example.com",
      role: "Moderator",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 20,
      name: "Rachel Green",
      email: "rachel@example.com",
      role: "User",
      status: "Active",
      lastLogin: "4 hours ago",
    },
  ]

  async getAllUsers(): Promise<User[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))
    return [...this.users]
  }

  async getUserById(id: number): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return this.users.find((user) => user.id === id) || null
  }

  async createUser(userData: Omit<User, "id">): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const newUser: User = {
      id: Math.max(...this.users.map((u) => u.id)) + 1,
      ...userData,
    }
    this.users.push(newUser)
    return newUser
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    await new Promise((resolve) => setTimeout(resolve, 150))
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...userData }
    return this.users[userIndex]
  }

  async deleteUser(id: number): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    return true
  }

  async searchUsers(query: string): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 100))
    const lowercaseQuery = query.toLowerCase()
    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.role.toLowerCase().includes(lowercaseQuery),
    )
  }

  async getUserStats(): Promise<{
    total: number
    active: number
    inactive: number
    admins: number
    users: number
    moderators: number
  }> {
    await new Promise((resolve) => setTimeout(resolve, 50))
    return {
      total: this.users.length,
      active: this.users.filter((u) => u.status === "Active").length,
      inactive: this.users.filter((u) => u.status === "Inactive").length,
      admins: this.users.filter((u) => u.role === "Admin").length,
      users: this.users.filter((u) => u.role === "User").length,
      moderators: this.users.filter((u) => u.role === "Moderator").length,
    }
  }
}

export const userService = new UserService()
