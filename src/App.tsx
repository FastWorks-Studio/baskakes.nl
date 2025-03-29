import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import './App.css';
import Footer from './pages/Footer/Footer';

function App() {

  function getVideoUrl() {
    const orientation =
      window.innerHeight > window.innerWidth ? "portrait" : "landscape";
    return `./assets/video/bg_${orientation}.mp4`;
  }

  return (
    <main>
      <div className="content">
        <Landing />
        <Home />
        <Footer />
      </div>
      <video preload="none" src={getVideoUrl()} autoPlay muted loop playsInline />
    </main>
  );
}

export default App;