interface Post {
  id: number;
  title: string;
  author: string;
  note?: string;
  url: string;
}

interface PhotoCardProps {
  id: number;
  title: string;
  author: string;
  url: string;
}

interface HeaderProps {
  title?: string;
  breadcrumbs?: string;
}
