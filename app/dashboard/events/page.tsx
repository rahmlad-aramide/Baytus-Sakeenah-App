import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const upcomingEvents = [
  {
    id: 1,
    title: "Building Strong Marriages: A Workshop for Couples",
    description:
      "Join us for an interactive workshop focusing on communication, conflict resolution, and strengthening your Islamic marriage foundation.",
    date: "2024-02-15",
    time: "7:00 PM - 9:00 PM EST",
    location: "Online (Zoom)",
    type: "Workshop",
    host: "Ustadh Ahmad & Sister Khadijah",
    hostImage: "/muslim-mentor-couple.png",
    attendees: 45,
    maxAttendees: 100,
    price: "Free",
    featured: true,
    tags: ["Communication", "Conflict Resolution", "Islamic Marriage"],
  },
  {
    id: 2,
    title: "Financial Planning for Muslim Families",
    description:
      "Learn Islamic principles of financial management, budgeting, and planning for your family's future according to Shariah guidelines.",
    date: "2024-02-20",
    time: "8:00 PM - 9:30 PM EST",
    location: "Online (Zoom)",
    type: "Webinar",
    host: "Brother Omar Al-Rashid",
    hostImage: "/imam-mentor.png",
    attendees: 32,
    maxAttendees: 150,
    price: "Free",
    featured: false,
    tags: ["Finance", "Islamic Banking", "Family Planning"],
  },
  {
    id: 3,
    title: "Parenting in Islam: Raising Righteous Children",
    description:
      "Discover Islamic approaches to parenting, discipline, and nurturing children's spiritual and emotional development.",
    date: "2024-02-25",
    time: "2:00 PM - 4:00 PM EST",
    location: "Community Center, New York",
    type: "Workshop",
    host: "Sister Aisha Rahman",
    hostImage: "/muslim-mentor-sister.png",
    attendees: 28,
    maxAttendees: 50,
    price: "Free",
    featured: true,
    tags: ["Parenting", "Children", "Islamic Education"],
  },
  {
    id: 4,
    title: "Monthly Community Gathering",
    description:
      "Join fellow community members for networking, sharing experiences, and building lasting friendships in a supportive Islamic environment.",
    date: "2024-03-01",
    time: "6:00 PM - 8:00 PM EST",
    location: "Islamic Center, Chicago",
    type: "Community",
    host: "Baytus-Sakeenah Team",
    hostImage: "/placeholder.svg",
    attendees: 67,
    maxAttendees: 200,
    price: "Free",
    featured: false,
    tags: ["Community", "Networking", "Social"],
  },
];

const pastEvents = [
  {
    id: 5,
    title: "Dealing with In-Law Relationships",
    description:
      "A comprehensive workshop on building positive relationships with extended family.",
    date: "2024-01-20",
    attendees: 89,
    rating: 4.8,
    type: "Workshop",
  },
  {
    id: 6,
    title: "Islamic Marriage Contracts: Understanding Your Rights",
    description:
      "Educational session on Islamic marriage contracts and legal considerations.",
    date: "2024-01-15",
    attendees: 156,
    rating: 4.9,
    type: "Webinar",
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6 mt-17 lg:mt-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">
            Community Events
          </h1>
          <p className="text-gray-600 mt-1 text-sm lg:text-base">
            Join workshops, webinars, and community gatherings
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent text-xs lg:textx-base"
          >
            <Calendar className="h-4 w-4 lg:mr-2" />
            Calendar View
          </Button>
          <Button className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-xs lg:text-base">
            <Plus className="h-4 w-4 lg:mr-2" />
            Suggest Event
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Input
            placeholder="Search events..."
            className="placeholder:text-xs lg:placeholder:text-sm"
          />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-1/2 lg:w-[140px] text-xs lg:text-sm">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="workshop">Workshops</SelectItem>
              <SelectItem value="webinar">Webinars</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-1/2 lg:w-[120px] text-xs lg:text-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Events Content */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming" className="text-xs lg:text-base">
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past" className="text-xs lg:text-base">
            Past Events
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Events */}
        <TabsContent value="upcoming" className="space-y-6">
          {/* Featured Events */}
          <div>
            <h2 className="text-base lg:text-xl font-semibold text-gray-900 mb-4">
              Featured Events
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {upcomingEvents
                .filter((event) => event.featured)
                .map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow border-l-4 border-l-emerald-600"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          {event.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-orange-600 border-orange-200"
                        >
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-sm lg:text-lg leading-tight mt-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-xs lg:text-sm text-justify lg:text-left leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-[10px] lg:text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                          <span>
                            {event.attendees}/{event.maxAttendees} registered
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={event.hostImage || "/placeholder.svg"}
                            alt={event.host}
                          />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                            {event.host.split(" ")[0][0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.host}
                          </p>
                          <p className="text-xs text-gray-500">Host</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] lg:text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-semibold text-emerald-700 text-xs lg:text-base">
                          {event.price}
                        </span>
                        <Button className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-[10px] lg:text-base">
                          Register Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Upcoming Events */}
          <div>
            <h2 className="text-base lg:text-xl font-semibold text-gray-900 mb-4">
              All Upcoming Events
            </h2>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="px-4 lg:px-6">
                    <div className="flex items-start gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xl lg:text-2xl font-bold text-emerald-700">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs lg:text-sm text-gray-500 uppercase">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                              {event.type}
                            </Badge>
                            {event.featured && (
                              <Badge
                                variant="outline"
                                className="text-orange-600 border-orange-200"
                              >
                                Featured
                              </Badge>
                            )}
                          </div>
                          <span className="font-semibold text-emerald-700 text-xs lg:text-base">
                            {event.price}
                          </span>
                        </div>

                        <h3 className="text-sm lg:text-lg font-semibold mb-2 text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed text-xs lg:text-base text-justify lg:text-left">
                          {event.description}
                        </p>

                        <div className="grid gap-2 md:grid-cols-2 text-[10px] lg:text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 lg:h-4 lg:w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 lg:h-4 lg:w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                            <span>
                              {event.attendees}/{event.maxAttendees} registered
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-3 w-3 lg:h-4 lg:w-4">
                              <AvatarImage
                                src={event.hostImage || "/placeholder.svg"}
                                alt={event.host}
                              />
                              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                                {event.host.split(" ")[0][0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{event.host}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {event.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-[10px] lg:text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-[10px]"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Learn More
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-[10px] lg:text-base"
                          >
                            Register Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Past Events */}
        <TabsContent value="past" className="space-y-4">
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="px-4 lg:px-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-gray-100 text-gray-700"
                    >
                      {event.type}
                    </Badge>
                    <div className="flex items-center gap-2 text-[10px] lg:text-sm text-gray-500">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{event.attendees} attended</span>
                      <span>•</span>
                      <span>⭐ {event.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm lg:text-lg font-semibold mb-2 text-gray-900 text-justify lg:text-left">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed text-xs lg:text-base text-justify lg:text-left">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-[10px] lg:text-base"
                    >
                      View Recording
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-[10px] lg:text-base"
                    >
                      Download Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Guidelines */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader className="pb-0">
          <CardTitle className="text-emerald-800 text-sm lg:text-base">
            Event Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs lg:text-sm text-emerald-700 text-justify lg:text-left pt-0">
          <ul className="list-disc list-outside pl-4 space-y-1">
            <li>
              All events follow Islamic principles and community guidelines
            </li>
            <li>
              Registration is required for most events to ensure proper planning
            </li>
            <li>
              Events are family-friendly and welcoming to all community members
            </li>
            <li>
              Recording may be available for registered participants who cannot
              attend live
            </li>
            <li>Contact support if you need special accommodations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
