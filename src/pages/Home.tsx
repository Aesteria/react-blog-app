import Footer from '../components/Footer/Footer';
import BlogPost from '../components/BlogPost';
import Navigation from '../components/Navigation/Navigation';

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

export default function Home() {
  return (
    <div>
      <Navigation />
      {sampleBlogPosts.map((post, index) => (
        <BlogPost post={post} key={index} />
      ))}
      <Footer />
    </div>
  );
}
