import { useEffect, useState } from 'react';
import { fetchWebsite } from '../../contentful/queries';
import { Entry, WebsiteStructure } from '../../contentful/types';
import WebsiteStructureComponent from '../../components/website-structure/WebsiteStructure';
import './CmsContent.css';

const CmsContent = () => {
  const [webpage, setWebpage] = useState<Entry<WebsiteStructure>>();

  useEffect(() => {
    fetchWebsite()
      .then((data) => {
        setWebpage(data);
      });
  }, []);

  return (
    <div className="cms-content" id='cms-content'>
      {webpage ? <WebsiteStructureComponent webpage={webpage} /> : <p>Loading...</p>}
    </div>
  );
};

export default CmsContent;
