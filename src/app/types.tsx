interface Post {
  id: number;
  title: string;
  author: string;
  note?: string;
  url: string;
}

type CreatePostProps = Pick<Post, "title" | "author" | "note" | "url">;

type PhotoCardProps = Pick<Post, "id" | "title" | "author" | "url">;

interface HeaderProps {
  title?: string;
  breadcrumbs?: string;
}
