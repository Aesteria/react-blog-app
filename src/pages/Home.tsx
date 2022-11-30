import Footer from '../components/Footer/Footer';
import BlogPost from '../components/BlogPost';
import Navigation from '../components/Navigation/Navigation';
import BlogCardList from '../components/BlogCardList';
import Container from '../components/Container';

const sampleBlogPosts = [
  {
    title: 'Remember Writing?',
    body: `Are you sick of short tweets and impersonal “shared” posts that are
  reminiscent of the late 90’s email forwards? We believe getting back
  to actually writing is the key to enjoying the internet again.`,
    welcomeScreen: true,
    cover: 'coding',
  },
  {
    title: 'Filler Title',
    body: 'This is a filler blog post title',
    cover: 'beautiful-stories',
  },
  {
    title: 'Filler Title',
    body: 'This is a filler blog post title',
    cover: 'designed-for-everyone',
  },
];

const sampleBlogCards = [
  {
    blogTitle: 'Blog card #1',
    blogCoverPhoto: 'stock-1',
    blogDate: 'May 1, 2021',
  },
  {
    blogTitle: 'Blog card #2',
    blogCoverPhoto: 'stock-2',
    blogDate: 'May 1, 2021',
  },
  {
    blogTitle: 'Blog card #3',
    blogCoverPhoto: 'stock-3',
    blogDate: 'May 1, 2021',
  },
  {
    blogTitle: 'Blog card #4',
    blogCoverPhoto: 'stock-4',
    blogDate: 'May 1, 2021',
  },
];

export default function Home() {
  return (
    <div>
      <Navigation />
      {sampleBlogPosts.map((post, index) => (
        <BlogPost post={post} key={index} />
      ))}
      <div className="bg-slate-100">
        <Container className="max-w-screen-2xl">
          <BlogCardList cards={sampleBlogCards} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
