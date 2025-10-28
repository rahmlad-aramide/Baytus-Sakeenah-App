export interface ArticleAuthor {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  author: ArticleAuthor;
  title: string;
  slug: string;
  status: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  is_featured: boolean;
  category: number | null;
  tags: number[];
  published_at: string | null;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  reading_time_minutes: number;
  word_count: number;
  view_count: number;
  bookmark_count: number;
  like_count: number;
  share_count: number;
  created: string;
  updated: string;
  category_detail: ArticleCategory;
  tags_detail: ArticleTag[];
  can_edit: string;
  can_publish: string;
}

export interface Author {
  email: string;
  first_name: string;
  last_name: string;
}

export interface ArticleInput {
  title: string;
  status: "draft" | "published" | "pending review" | "rejected" | "archived";
  excerpt?: string;
  content?: string;
  is_published?: boolean;
  is_featured?: boolean;
  category?: number | null;
  tags: number[];
  published_at?: string | null;
  meta_title?: string;
  meta_description?: string;
}

export interface ArticleResponse extends ArticleInput {
  id: string;
  slug: string;
  author: Author;
  created: string;
  updated: string;
  category_detail?: {
    name: string;
  };
}
