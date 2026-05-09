import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ResourcePage from './pages/ResourcePage';
import { textbookFilters, warmUpFilters, mockResources } from './data/mockData';

const PlaceholderPage = ({ title }) => (
  <div className="container mx-auto px-6 py-20 min-h-[60vh] flex items-center justify-center">
    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{title}</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="lesson-plans/*" element={<ResourcePage title="Lesson Plans" description="Browse our collection of comprehensive lesson plans designed to save you prep time." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'lesson-plan')} />} />
          <Route path="warm-ups/*" element={<ResourcePage title="Warm-Ups" description="Engaging 5-10 minute activities to start your class with high energy." filterConfig={warmUpFilters} resources={mockResources.filter(r => r.type === 'warm-up')} />} />
          <Route path="exercises/*" element={<ResourcePage title="Exercises" description="Printable and digital exercises for all grammar and vocabulary topics." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'exercise')} />} />
          <Route path="textbooks/*" element={<ResourcePage title="Textbooks & Guides" description="Curriculum-aligned textbook materials and pacing guides." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'textbook')} />} />
          <Route path="assessments/*" element={<ResourcePage title="Assessments" quizzes description="Formative and summative assessments with answer keys." filterConfig={textbookFilters} resources={mockResources.filter(r => r.type === 'assessment')} />} />
          <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
