import Navbar from '../Navbar/Navbar';
import './MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrapper">
        {children}
      </main>
    </div>
  );
}
