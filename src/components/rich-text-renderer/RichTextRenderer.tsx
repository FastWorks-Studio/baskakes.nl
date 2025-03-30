import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import './RichTextRenderer.css';
import { JSX } from 'react';

type Props = {
  document: any;
};

// Reusable helper to skip rendering empty blocks
const renderIfNotEmpty = (Tag: keyof JSX.IntrinsicElements) => {
  return (_node: any, children: any) => {
    const filteredChildren = children.filter(
      (child: any) =>
        !(typeof child === 'string' && child.trim() === '') &&
        child != null
    );

    if (filteredChildren.length === 0) return null;

    return <Tag>{filteredChildren}</Tag>;
  };
};

const RichTextRenderer = ({ document }: Props) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.HEADING_1]: renderIfNotEmpty('h1'),
      [BLOCKS.HEADING_2]: renderIfNotEmpty('h2'),
      [BLOCKS.HEADING_3]: renderIfNotEmpty('h3'),
      [BLOCKS.HEADING_4]: renderIfNotEmpty('h4'),
      [BLOCKS.HEADING_5]: renderIfNotEmpty('h5'),
      [BLOCKS.HEADING_6]: renderIfNotEmpty('h6'),
      [BLOCKS.PARAGRAPH]: renderIfNotEmpty('p'),

      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),

      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title } = node.data.target.fields;
        return <img className="contentfulImage" src={file.url} alt={title} />;
      }
    },

    renderMark: {
      bold: (text: any) => <strong className="bold">{text}</strong>
    }
  };

  return <div className="richText">{documentToReactComponents(document, options)}</div>;
};

export default RichTextRenderer;
