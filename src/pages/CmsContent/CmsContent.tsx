import { useEffect, useState } from 'react';
import { fetchWebsite } from '../../contentful/queries';
import { Entry, WebsiteStructure } from '../../contentful/types';
import WebsiteStructureComponent from '../../components/website-structure/WebsiteStructure';
import './CmsContent.css';

const CmsContent = () => {
  const [website, setWebsite] = useState<Entry<WebsiteStructure>>();

  useEffect(() => {
    fetchWebsite()
      .then((data) => {
        setWebsite(data);
      });
  }, []);

  return (
    <div className="cms-content" id='cms-content'>
      {website ? <WebsiteStructureComponent website={website} /> : <p>Loading...</p>}
    </div>
  );
};

export default CmsContent;
