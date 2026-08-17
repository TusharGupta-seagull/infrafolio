import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { Section } from '../components/Section';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { projects } from '../data/content';
import './ProjectDetailPage.css';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    
    // Fetch the markdown file from the public directory
    fetch(`/projects/${slug}/index.md`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch markdown');
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setContent('# Project Documentation Missing\n\nThe detailed blog post for this project is currently being written or is unavailable. Please check back later.');
        setLoading(false);
      });
  }, [slug]);

  if (!project) {
    return (
      <main className="project-detail-main">
        <Section id="project-not-found" background="primary">
          <Container>
            <div className="blog-header">
              <button onClick={() => navigate('/projects')} className="blog-back-btn">
                <ArrowLeft size={16} />
                <Typography variant="label" color="inherit">Back to Projects</Typography>
              </button>
              <Typography variant="h2" style={{ marginTop: 'var(--spacing-8)' }}>Project Not Found</Typography>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  return (
    <main className="project-detail-main">
      <Section id="project-detail" background="primary">
        <Container>
          <div className="blog-header">
            <button onClick={() => navigate('/projects')} className="blog-back-btn">
              <ArrowLeft size={16} />
              <Typography variant="label" color="inherit">Back to Projects</Typography>
            </button>
          </div>
          
          <article className="blog-container">
            {loading ? (
              <div className="blog-loading">
                <div className="loading-pulse"></div>
                <Typography variant="body" color="tertiary">Loading project details...</Typography>
              </div>
            ) : (
              <div className="markdown-body">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </article>
        </Container>
      </Section>
    </main>
  );
};
