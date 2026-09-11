import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../blog.css";

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  
  if (!postData) {
    return { title: 'Стаття не знайдена' };
  }

  return {
    title: `${postData.title} | Блог АвтоМентор`,
    description: postData.description,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.slug);
  
  if (!postData) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postData.title,
    description: postData.description || postData.title,
    datePublished: postData.date,
    author: {
      '@type': 'Organization',
      name: 'АвтоМентор',
      url: 'https://auto-mentor.com.ua',
    },
    publisher: {
      '@type': 'Organization',
      name: 'АвтоМентор',
      url: 'https://auto-mentor.com.ua',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://auto-mentor.com.ua/blog/${resolvedParams.slug}`,
    },
  };

  return (
    <div className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <div className="container" style={{maxWidth: "1000px"}}>
            <Link href="/blog" className="back-link">
            ← Повернутися до всіх статей
            </Link>
        </div>
        
        <article className="glass blog-post-article">
          <header className="post-header">
            <h1 className="post-title">{postData.title}</h1>
            <div className="blog-date">{postData.date}</div>
          </header>
          
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </article>
      </div>
    </div>
  );
}
