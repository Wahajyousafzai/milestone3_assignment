export const BLOG_POSTS = {
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js: A Comprehensive Guide',
    slug: 'getting-started-with-nextjs',
    preview: 'Learn how to build modern web applications with Next.js 14. This comprehensive guide covers everything from setup to advanced features.',
    content: `
      <p>Next.js has revolutionized the way we build React applications. With its powerful features like server-side rendering, static site generation, and built-in routing, it's become the go-to framework for modern web development.</p>

      <h2>Why Choose Next.js?</h2>
      <p>Next.js offers several advantages over traditional React applications:</p>
      <ul>
        <li>Automatic code splitting for faster page loads</li>
        <li>Server-side rendering (SSR) for better SEO</li>
        <li>Static site generation (SSG) for optimal performance</li>
        <li>Built-in routing system</li>
        <li>API routes for backend functionality</li>
      </ul>

      <h2>Getting Started</h2>
      <p>To create a new Next.js project, run the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>

      <p>This will set up a new Next.js project with all the necessary dependencies and a basic project structure.</p>

      <h2>Key Features</h2>
      <p>Let's explore some of the key features that make Next.js stand out:</p>

      <h3>1. File-based Routing</h3>
      <p>Next.js uses a file-based routing system. Simply create files in your pages directory, and they automatically become routes in your application.</p>

      <h3>2. API Routes</h3>
      <p>Create API endpoints easily by adding files to the api directory. Perfect for building full-stack applications.</p>

      <h3>3. Image Optimization</h3>
      <p>The Image component automatically optimizes images for better performance and user experience.</p>
    `,
    date: '2024-03-21',
    category: 'Next.js',
    readTime: '8 min read',
    author: 'John Doe'
  },
  'mastering-react-hooks': {
    title: 'Mastering React Hooks: A Deep Dive',
    slug: 'mastering-react-hooks',
    preview: 'Explore the power of React Hooks and learn how to write more efficient and maintainable React components.',
    content: `
      <p>React Hooks have transformed the way we write React components. They allow us to use state and other React features without writing class components.</p>

      <h2>Understanding React Hooks</h2>
      <p>Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8.</p>

      <h2>Essential Hooks</h2>
      <h3>1. useState</h3>
      <p>The useState hook lets you add state to functional components:</p>
      <pre><code>
const [count, setCount] = useState(0);
      </code></pre>

      <h3>2. useEffect</h3>
      <p>useEffect lets you perform side effects in function components:</p>
      <pre><code>
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
      </code></pre>

      <h3>3. useContext</h3>
      <p>useContext subscribes to React context without introducing nesting:</p>
      <pre><code>
const theme = useContext(ThemeContext);
      </code></pre>

      <h2>Custom Hooks</h2>
      <p>You can create your own Hooks to reuse stateful logic between different components. Here's an example:</p>
      <pre><code>
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}
      </code></pre>
    `,
    date: '2024-03-20',
    category: 'React',
    readTime: '10 min read',
    author: 'Jane Smith'
  },
  'web-development-best-practices': {
    title: 'Web Development Best Practices for 2024',
    slug: 'web-development-best-practices',
    preview: 'Stay up-to-date with the latest web development best practices and improve your coding skills.',
    content: `
      <p>As web development continues to evolve, staying current with best practices is crucial for building modern, efficient, and maintainable applications.</p>

      <h2>Performance Optimization</h2>
      <p>Performance is crucial for user experience and SEO. Here are key areas to focus on:</p>
      <ul>
        <li>Minimize HTTP requests</li>
        <li>Optimize images and media</li>
        <li>Use lazy loading for images and components</li>
        <li>Implement caching strategies</li>
        <li>Optimize JavaScript bundles</li>
      </ul>

      <h2>Security Measures</h2>
      <p>Security should never be an afterthought. Essential security practices include:</p>
      <ul>
        <li>Implement HTTPS</li>
        <li>Use secure authentication methods</li>
        <li>Sanitize user inputs</li>
        <li>Keep dependencies updated</li>
        <li>Implement CSP (Content Security Policy)</li>
      </ul>

      <h2>Accessibility</h2>
      <p>Making your web applications accessible is not just good practice—it's essential. Key considerations:</p>
      <ul>
        <li>Use semantic HTML</li>
        <li>Provide alt text for images</li>
        <li>Ensure keyboard navigation</li>
        <li>Maintain sufficient color contrast</li>
        <li>Add ARIA labels where necessary</li>
      </ul>
    `,
    date: '2024-03-19',
    category: 'Web Development',
    readTime: '12 min read',
    author: 'Alex Johnson'
  }
};

export type BlogPost = typeof BLOG_POSTS[keyof typeof BLOG_POSTS]; 