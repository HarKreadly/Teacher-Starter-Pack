import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "next-themes";

import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ResourcePage from './pages/ResourcePage';
import { textbookFilters, warmUpFilters, mockResources } from './data/mockData';

import ClickSpark from "./components/ui/ClickSpark";
import FloatingParticles from "./components/ui/FloatingParticles";
import "./i18n";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSettings } from "./context/SettingsContext";
import GlobalCursor from "./components/common/GlobalCursor";

gsap.registerPlugin(ScrollTrigger);

const PlaceholderPage = ({ title }) => (
  <div className="container mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{title}</h1>
  </div>
);

const AppContent = () => {
  const { 
    sparksEnabled, 
    monochrome, 
    floatingParticles, 
    scanlines, 
    performanceMode, 
    smoothScroll 
  } = useSettings();

  useEffect(() => {
    // Conditional Lenis Scroll
    let lenis = null;
    
    if (smoothScroll && !performanceMode) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
    }

    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenis) {
        lenis.destroy();
        gsap.ticker.remove((time) => {
          lenis.raf(time * 1000);
        });
      }
    };
  }, [smoothScroll, performanceMode]);

  return (
    <div className={`
      min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-300
      ${monochrome ? "monochrome" : ""}
      ${performanceMode ? "performance-mode" : ""}
    `}>
      {/* Global Overlays */}
      {floatingParticles && <FloatingParticles count={60} opacity={0.4} />}
      {scanlines && <div className="scanlines" />}
      
      <GlobalCursor />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="lesson-plans/*" element={<ResourcePage title="Lesson Plans" description="Browse our collection of comprehensive lesson plans designed to save you prep time." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'lesson-plan')} />} />
            <Route path="warm-ups/*" element={<ResourcePage title="Warm-Ups" description="Engaging 5-10 minute activities to start your class with high energy." filterConfig={warmUpFilters} resources={mockResources.filter(r => r.type === 'warm-up')} />} />
            <Route path="exercises/*" element={<ResourcePage title="Exercises" description="Printable and digital exercises for all grammar and vocabulary topics." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'exercise')} />} />
            <Route path="textbooks/*" element={<ResourcePage title="Textbooks & Guides" description="Curriculum-aligned textbook materials and pacing guides." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'textbook')} />} />
            <Route path="assessments/*" element={<ResourcePage title="Assessments" description="Formative and summative assessments with answer keys." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'assessment')} />} />
            <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
            <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {sparksEnabled && (
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
