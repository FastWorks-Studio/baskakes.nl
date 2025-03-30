import { Button } from '../../components/button/Button';
import LandingGraphic from '../../components/landing-graphic/LandingGraphic';
import './Landing.css';

const Landing = () => {
  const quote = "Ik wil de wereld van haar mooiste kant laten zien. Dit doe ik via mijn passie voor film.";

  const handleClickPortfolio = () => {
    document.getElementById("cms-content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='landing'>
      <LandingGraphic subtitle='brengt het in beeld' />
      <div className='column'>
        <div />
        <div className='bans'>
          <div className="badgeContainer">
            <img
              className="badge"
              src="./assets/images/bas-kakes.jpg"
              alt="Foto van Bas Kakes"
            />
          </div>
          <p className="quote">{quote}</p>
        </div>
        <Button click={handleClickPortfolio} center>
          Bekijk mijn werk
        </Button>
      </div>
    </div >
  );
};

export default Landing;
