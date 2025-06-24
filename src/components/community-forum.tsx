"use client"

import React, { useState } from "react"
import { MessageSquare, Send } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Post {
  user: {
    name: string;
    avatar: string;
    fallback: string;
  };
  message: string;
  timestamp: string;
}

const initialPosts: Post[] = [
  {
    user: { name: "Alice", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d", fallback: "A" },
    message: "Anyone else notice the air quality dip this morning? My plants are looking sad.",
    timestamp: "2h ago",
  },
  {
    user: { name: "Bob", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", fallback: "B" },
    message: "Yes! I closed my windows and turned on my air purifier. The recommendations from the app helped.",
    timestamp: "1h ago",
  },
    {
    user: { name: "Charlie", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d", fallback: "C" },
    message: "I recommend getting some snake plants. They are great for filtering indoor air!",
    timestamp: "30m ago",
  },
];

export function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPost, setNewPost] = useState("")

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPost.trim() === "") return

    const post: Post = {
      user: { name: "You", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", fallback: "Y" },
      message: newPost,
      timestamp: "Just now",
    }
    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <MessageSquare />
            Community Forum
        </CardTitle>
        <CardDescription>Share insights and tips with the community.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[400px]">
          <ScrollArea className="flex-grow pr-4 -mr-4">
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.fallback}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="font-semibold">{post.user.name}</p>
                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                    </div>
                    <p className="text-sm text-foreground/90">{post.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <form onSubmit={handlePostSubmit} className="mt-4 flex gap-2 pt-4 border-t">
            <Input
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-grow"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
