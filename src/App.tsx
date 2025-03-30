import CmsContent from './pages/CmsContent/CmsContent';
import Landing from './pages/Landing/Landing';
import './App.css';
import Footer from './pages/Footer/Footer';
import PageBackground from './components/page-background/PageBackground';

function App() {

  return (
    <main>
      <div className="app">
        <Landing />
        <div className="content">
          <CmsContent />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;