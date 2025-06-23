"use client"

import * as React from "react"
import { Bot, MessageSquare, Calendar, Languages, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const mockChatHistory = [
  { id: 1, type: "user", message: "I want to plan a trip to Vietnam", timestamp: "10:30 AM" },
  {
    id: 2,
    type: "ai",
    message: "Great! I'd love to help you plan your Vietnam trip. What type of experience are you looking for?",
    timestamp: "10:31 AM",
  },
  { id: 3, type: "user", message: "I'm interested in cultural sites and local food", timestamp: "10:32 AM" },
  {
    id: 4,
    type: "ai",
    message:
      "Perfect! I recommend starting with Hanoi's Old Quarter for authentic street food and visiting the Temple of Literature for cultural heritage.",
    timestamp: "10:33 AM",
  },
]

export function AIServices() {
  const [message, setMessage] = React.useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Services</h2>
          <p className="text-muted-foreground">Gemini AI-powered travel assistance and automation</p>
        </div>
        <Badge variant="secondary" className="flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          Powered by Gemini AI
        </Badge>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Chat Dashboard</TabsTrigger>
          <TabsTrigger value="scheduling">AI Scheduling</TabsTrigger>
          <TabsTrigger value="translation">Translation</TabsTrigger>
          <TabsTrigger value="test">AI Test</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Travel Chat Box
                </CardTitle>
                <CardDescription>AI-powered travel assistance chat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[300px] w-full border rounded-md p-4">
                  <div className="space-y-4">
                    {mockChatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            chat.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{chat.message}</p>
                          <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about travel plans..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chat Analytics</CardTitle>
                <CardDescription>AI chat performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-sm text-muted-foreground">Total Conversations</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">94.2%</div>
                    <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">2.3s</div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Active Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  AI Tour Scheduling
                </CardTitle>
                <CardDescription>Automatically schedule tours based on preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <Input placeholder="Enter destination..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (days)</label>
                  <Input type="number" placeholder="7" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferences</label>
                  <Textarea placeholder="Cultural sites, local food, adventure activities..." />
                </div>
                <Button className="w-full">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Schedule
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schedule Details</CardTitle>
                <CardDescription>AI-generated tour schedule details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center text-muted-foreground py-8">
                    Generate a schedule to see detailed tour plans
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="translation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Languages className="h-5 w-5 mr-2" />
                AI Translation Service
              </CardTitle>
              <CardDescription>Translate travel content using Gemini AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Source Text</label>
                  <Textarea placeholder="Enter text to translate..." className="min-h-[120px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Translation</label>
                  <Textarea placeholder="Translation will appear here..." className="min-h-[120px]" readOnly />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>English</option>
                  <option>Vietnamese</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                  <option>Korean</option>
                </select>
                <span>→</span>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Vietnamese</option>
                  <option>English</option>
                  <option>Chinese</option>
                  <option>Japanese</option>
                  <option>Korean</option>
                </select>
                <Button>Translate</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Gemini AI Test
              </CardTitle>
              <CardDescription>Test Gemini AI integration and responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Test Query</label>
                <Input placeholder="Enter test query for Gemini AI..." />
              </div>
              <Button>
                <Bot className="h-4 w-4 mr-2" />
                Test AI Response
              </Button>
              <div className="border rounded-md p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground">AI response will appear here...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
