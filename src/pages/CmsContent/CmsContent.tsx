import { useEffect, useState } from 'react';
import { fetchWebsite } from '../../contentful/queries';
import { Entry, Webpage } from '../../contentful/types';
import WebsiteStructureComponent from '../../components/webpage/WebpageComponent';
import './CmsContent.css';

const CmsContent = () => {
  const [webpage, setWebpage] = useState<Entry<Webpage>>();

  useEffect(() => {
    fetchWebsite()
      .then((data) => {
        setWebpage(data);
      });
  }, []);
  if (webpage === undefined) { return null; }

  return (
    <div className="cms-content" id='cms-content'>
      <WebsiteStructureComponent webpage={webpage} />
    </div>
  );
};

export default CmsContent;
