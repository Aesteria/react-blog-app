import BlogCard from './BlogCard/BlogCard';

type BlogCardListProps = {
  cards: {
    blogTitle: string;
    blogCoverPhoto: string;
    blogDate: string;
  }[];
};

export default function BlogCardList({ cards }: BlogCardListProps) {
  return (
    <div className="relative py-20 px-4">
      <div>
        <h3 className="font-light text-3xl mb-8">View More Recent Blogs</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((post, index) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
