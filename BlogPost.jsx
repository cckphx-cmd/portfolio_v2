import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from './blogData';

const colors = {
  cream: '#F8F6F1',
  creamDark: '#EFECE4',
  creamDarker: '#E0DCD3',
  charcoal: '#3D3D3D',
  charcoalLight: '#6B6B6B',
  muted: '#8B8780',
  border: '#D8D4CB',
  teal: '#5B7B7A',
  tealLight: '#5B7B7A15',
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  // If it's an external link, redirect
  if (post.externalLink) {
    window.location.href = post.externalLink;
    return null;
  }

  // If no content, redirect home
  if (!post.content) {
    return <Navigate to="/" replace />;
  }

  // Convert markdown-style headings to HTML
  const formatContent = (text) => {
    return text.split('\n').map((line, index) => {
      // Handle h2 (##)
      if (line.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="font-serif text-3xl lg:text-4xl mb-6 mt-12"
            style={{ color: colors.charcoal }}
          >
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Handle empty lines as paragraph breaks
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }

      // Regular paragraphs
      return (
        <p
          key={index}
          className="text-lg leading-relaxed mb-6"
          style={{ color: colors.charcoalLight }}
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.cream }}>
      {/* Header */}
      <header className="border-b" style={{ backgroundColor: colors.cream, borderColor: colors.border }}>
        <div className="max-w-4xl mx-auto px-8 py-8">
          <Link
            to="/#writing"
            className="inline-flex items-center gap-2 text-sm transition hover:opacity-70 mb-8"
            style={{ color: colors.teal }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>

          <div className="mb-6">
            <p className="text-sm uppercase tracking-widest mb-4" style={{ color: colors.teal }}>
              {post.category}
            </p>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4 leading-tight" style={{ color: colors.charcoal }}>
              {post.title}
            </h1>
            <p className="text-xl mb-2" style={{ color: colors.charcoalLight }}>
              {post.description}
            </p>
            <p className="text-sm" style={{ color: colors.muted }}>
              {post.date}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-16 px-8">
        <div className="max-w-3xl mx-auto">
          {formatContent(post.content)}
        </div>
      </article>

      {/* Back to Portfolio */}
      <div className="py-12 px-8" style={{ backgroundColor: colors.creamDark }}>
        <div className="max-w-3xl mx-auto text-center">
          <Link
            to="/#writing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition hover:opacity-90"
            style={{ backgroundColor: colors.teal, color: colors.cream }}
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 px-8 text-center" style={{ backgroundColor: '#2D2D2D' }}>
        <p className="text-sm" style={{ color: colors.muted }}>© 2025 Courtney Kingsbury</p>
      </footer>
    </div>
  );
}
