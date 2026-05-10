import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SettingsPanel from './SettingsPanel';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-300 text-base">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <SettingsPanel />
    </div>
  );
};

export default MainLayout;
