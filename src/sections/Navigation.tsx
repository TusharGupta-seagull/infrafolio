import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container } from '../components/Container';
import { Typography } from '../components/Typography';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { links } from '../data/content';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

const LOGO_FRAMES = ['TG', 'TuGu', 'TusGup', 'TushGupt', 'TushaGupta', 'Tushar Gupta'];
const FRAME_DELAY = 80;

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoText, setLogoText] = useState('TG');
  const [isAnimating, setIsAnimating] = useState(false);
  const frameIndexRef = useRef(0);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExpandedRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle cross-page hash navigation
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      setTimeout(() => {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          // Clear the hash from the URL so it stays clean
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  }, [location]);

  const clearAnimation = useCallback(() => {
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
      animationTimerRef.current = null;
    }
  }, []);

  const animateTo = useCallback((targetIndex: number) => {
    clearAnimation();

    if (frameIndexRef.current === targetIndex) return;

    setIsAnimating(true);

    const step = () => {
      const current = frameIndexRef.current;
      if (current === targetIndex) {
        setIsAnimating(false);
        return;
      }

      const next = current < targetIndex ? current + 1 : current - 1;
      frameIndexRef.current = next;
      setLogoText(LOGO_FRAMES[next]);

      if (next !== targetIndex) {
        animationTimerRef.current = setTimeout(step, FRAME_DELAY);
      } else {
        setIsAnimating(false);
      }
    };

    step();
  }, [clearAnimation]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Observe the hero title on the homepage
  useEffect(() => {
    if (location.pathname !== '/') {
      // On non-home pages, always show full name
      if (!isExpandedRef.current) {
        isExpandedRef.current = true;
        animateTo(LOGO_FRAMES.length - 1);
      }
      return;
    }

    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isExpandedRef.current) {
          isExpandedRef.current = true;
          animateTo(LOGO_FRAMES.length - 1);
        } else if (entry.isIntersecting && isExpandedRef.current) {
          isExpandedRef.current = false;
          animateTo(0);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(heroTitle);

    return () => {
      observer.disconnect();
      clearAnimation();
    };
  }, [location.pathname, animateTo, clearAnimation]);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    ...(location.pathname !== '/projects' ? [{ label: 'Projects', href: '#projects' }] : []),
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#') || href.startsWith('/#')) {
      const targetId = href.replace('/#', '').replace('#', '');
      const target = document.getElementById(targetId);
      
      if (target) {
        // The element exists on the current page (e.g. Contact is everywhere)
        target.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      } else {
        // Navigate to home page with the hash so the useEffect picks it up
        navigate(`/#${targetId}`);
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <Container>
        <div className="nav-content">
          <Link 
            to="/" 
            style={{ textDecoration: 'none', color: 'inherit' }} 
            className="nav-logo-link"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Typography 
              variant="h3" 
              style={{ fontWeight: 600, letterSpacing: '-0.02em' }} 
              className={`nav-logo-text ${isAnimating ? 'nav-logo-text-animating' : ''}`}
            >
              {logoText}
            </Typography>
          </Link>

          <div className="nav-links desktop-only">
            <AnimatePresence mode="popLayout">
              {navLinks.map(link => (
                <motion.a 
                  layout
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                  key={link.label} 
                  href={link.href} 
                  className="nav-link"
                  onClick={(e) => handleNavClick(e as any, link.href)}
                >
                  <Typography variant="label">{link.label}</Typography>
                </motion.a>
              ))}
            </AnimatePresence>
            <motion.div layout className="nav-divider"></motion.div>
            <motion.a layout href={links.github} target="_blank" rel="noopener noreferrer" className="nav-icon-link" aria-label="GitHub">
              <FaGithub size={18} />
            </motion.a>
            <motion.a layout href={links.linkedin} target="_blank" rel="noopener noreferrer" className="nav-icon-link" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </motion.a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AnimatePresence mode="popLayout">
              {navLinks.map(link => (
                <motion.a
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={link.label}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e as any, link.href)}
                >
                  <Typography variant="h4">{link.label}</Typography>
                </motion.a>
              ))}
            </AnimatePresence>
            <motion.div layout className="mobile-divider"></motion.div>
            <motion.a layout href={links.github} target="_blank" rel="noopener noreferrer" className="mobile-nav-link">
              <Typography variant="h4">GitHub</Typography>
            </motion.a>
            <motion.a layout href={links.linkedin} target="_blank" rel="noopener noreferrer" className="mobile-nav-link">
              <Typography variant="h4">LinkedIn</Typography>
            </motion.a>
          </motion.div>
        )}
      </Container>
    </nav>
  );
};
