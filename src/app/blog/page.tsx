import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import "./blog.css";

export const metadata: Metadata = {
  title: "Блог про ПДР | АвтоМентор",
  description: "Корисні поради, розбір ПДР та секрети успішного складання іспитів.",
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="blog-page section">
      <div className="container">
        <div className="text-center">
          <h1 className="section-title">Блог та корисні поради</h1>
          <p className="blog-subtitle">
            Статті про правила дорожнього руху, лайфхаки для запам'ятовування та підготовку до іспитів.
          </p>
        </div>

        <div className="blog-grid">
          {allPostsData.map(({ id, date, title, description }) => (
            <Link href={`/blog/${id}`} key={id} className="blog-card glass">
              <span className="blog-date">{date}</span>
              <h2 className="blog-title">{title}</h2>
              <p className="blog-desc">{description}</p>
              <span className="blog-read-more">Читати статтю →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
