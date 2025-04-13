import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/Hero';
import { Page } from '../types';
import { getPageBySlug } from '../admin/services/pageService';
import NotFoundPage from './NotFoundPage';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        if (slug) {
          const pageData = await getPageBySlug(slug);
          setPage(pageData);
        }
      } catch (err) {
        console.error('Error fetching page:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page || !page.isPublished) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <Hero
        title={page.title}
        subtitle={page.metaDescription}
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </div>
      </section>
    </div>
  );
};

export default DynamicPage;