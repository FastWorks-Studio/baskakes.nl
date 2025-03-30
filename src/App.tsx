import CmsContent from './pages/CmsContent/CmsContent';
import Landing from './pages/Landing/Landing';
import './App.css';
import Footer from './pages/Footer/Footer';
import BackgroundVideo from './components/background-video/BackgroundVideo';

function App() {

  return (
    <main>
      <div className="app">
        <Landing />
        <div className="content">
          <CmsContent />
          <Footer />
        </div>
        <BackgroundVideo />
      </div>
    </main>
  );
}

export default App;