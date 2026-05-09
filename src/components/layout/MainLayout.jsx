import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SettingsPanel from './SettingsPanel';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
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
