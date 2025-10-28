"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Search, Star, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import {
  useArticles,
  useManagedArticles,
  usePostArticle,
} from "@/queries/article";
import { toast } from "sonner";

export default function ContentHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // 🔹 Fetch both endpoints
  const { data: publicData } = useArticles();
  const { data: managedData, isLoading, error, refetch } = useManagedArticles();

  // If backend returns arrays (not paginated objects)
  const allArticles = [
    ...(managedData?.results ?? []),
    ...(publicData?.results ?? []),
  ];

  const { mutate: createArticle, isPending } = usePostArticle({
    onSuccess: () => {
      toast.success("Article created successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to create article");
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 px-10 mt-17 lg:mt-0">Loading articles...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10 mt-17 lg:mt-0">
        Failed to load articles
      </div>
    );
  }

  // 🔹 Filtering
  const filteredArticles = allArticles.filter((article: any) => {
    const matchesSearch =
      article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      article.category_detail?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 🔹 Sorting
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "popular") return b.view_count - a.view_count;
    if (sortBy === "rating")
      return (b.average_rating ?? 0) - (a.average_rating ?? 0);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="space-y-8 mt-17 lg:mt-0">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground mb-2">
          Content Hub
        </h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Discover Islamic guidance, practical advice, and wisdom for
          strengthening your marriage
        </p>

        <Button
          onClick={() =>
            createArticle({
              title: "New Untitled Article",
              content: "Start writing your new article...",
              category: 1,
              status: "draft",
              tags: [],
              excerpt: "",
              is_published: false,
              is_featured: false,
              meta_title: "New Article",
              meta_description: "An auto-generated article draft",
            })
          }
          disabled={isPending}
        >
          {isPending ? "Creating..." : "New Article"}
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search articles, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 placeholder:text-xs lg:placeholder:text-sm"
          />
        </div>

        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {[...new Set(allArticles.map((a) => a.category_detail?.name || ""))]
              .filter(Boolean)
              .map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48 text-xs lg:text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="liked">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedArticles.map((article: any) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.excerpt ?? "No description available"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <Badge>
                      {article.category_detail?.name ?? "Uncategorized"}
                    </Badge>
                    {article.tags_detail?.map((tag: any) => (
                      <Badge key={tag.id} variant="outline">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 pt-2">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" /> {article.view_count ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-red-500" />{" "}
                      {article.like_count ?? 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />{" "}
                      {article.average_rating?.toFixed(1) ?? "0.0"}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />{" "}
                      {article.reading_time_minutes ?? "—"} mins
                    </span>
                  </div>

                  <Link href={`/article/${article.slug}`}>
                    <Button className="w-full mt-2">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
