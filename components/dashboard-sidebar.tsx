"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, BookOpen, MessageCircle, Users, Heart, Star, TrendingUp, Calendar, HelpCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Content Hub",
    href: "/dashboard/content",
    icon: BookOpen,
    badge: "New",
  },
  {
    title: "Q&A Forum",
    href: "/dashboard/qa",
    icon: MessageCircle,
    badge: "5",
  },
  {
    title: "Stories",
    href: "/dashboard/stories",
    icon: Heart,
  },
  {
    title: "Mentorship",
    href: "/dashboard/mentorship",
    icon: Users,
  },
  {
    title: "My Favorites",
    href: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Trending",
    href: "/dashboard/trending",
    icon: TrendingUp,
  },
  {
    title: "Events",
    href: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Help & Support",
    href: "/dashboard/help",
    icon: HelpCircle,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-muted/30 border-r border-border">
        <div className="flex flex-col flex-grow px-4">
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant={item.badge === "New" ? "default" : "secondary"} className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Community Stats */}
          <div className="mt-8 p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground mb-3">Community Impact</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Couples Helped</span>
                <span className="font-medium text-foreground">1,247</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Success Stories</span>
                <span className="font-medium text-foreground">523</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Mentors</span>
                <span className="font-medium text-foreground">89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
