import { Button } from '../../components/button/Button';
import './Footer.css';

const Footer = () => {

  const handleClickCollaborate = () => {
    window.location.href = 'mailto:info@baskakes.nl?subject=Samenwerken aan project';
  };
  const handleClickLinkedIn = () => {
    window.open('https://www.linkedin.com/in/bas-kakes/', '_blank');
  };

  return (
    <div className='footer'>
      <div className='carousel'>
        <Button click={handleClickCollaborate}>
          Mail mij
        </Button>

        <Button click={handleClickLinkedIn}>
          LinkedIn
        </Button>
      </div>
    </div >
  );
};

export default Footer;
