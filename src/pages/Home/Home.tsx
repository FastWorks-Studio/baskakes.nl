import { useEffect, useState } from 'react';
import { fetchWebsite } from '../../contentful/queries';
import { Entry, WebsiteStructure } from '../../contentful/types';
import WebsiteStructureComponent from '../../components/WebsiteStructure';

const Home = () => {
  const [website, setWebsite] = useState<Entry<WebsiteStructure>>();

  useEffect(() => {
    fetchWebsite()
      .then((data) => {
        setWebsite(data);
        console.log(JSON.stringify(data));
      });
  }, []);

  return (
    <div>
      {website ? <WebsiteStructureComponent website={website} /> : <p>Loading...</p>}
    </div>
  );
};

export default Home;
