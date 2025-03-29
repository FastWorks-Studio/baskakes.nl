import { Button } from '../../components/button/Button';
import './Footer.css';

const Footer = () => {

  const handleClickCollaborate = () => {
    // TODO: mailto:info@baskakes.nl?subject=Samenwerken aan project
  };
  const handleClickLinkedIn = () => {
    // TODO: https://www.linkedin.com/in/bas-kakes/
  };

  return (
    <div className='footer'>
      <p>
        Natuurlijk ben ik beschikbaar voor onder ander bedrijfsvideo’s,
        commercials, videoclips en allerlei andere videoklussen. Zullen we
        samenwerken aan uw project?
      </p>
      <Button click={handleClickCollaborate}
      >Mail mij</Button
      >
      <Button click={handleClickLinkedIn}>LinkedIn</Button>
    </div >
  );
};

export default Footer;
