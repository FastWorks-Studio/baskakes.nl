import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

type Props = {
  document: any;
};

const RichTextRenderer = ({ document }: Props) => {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: any, children: any) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <p>{children}</p>,
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  return <div>{documentToReactComponents(document, options)}</div>;
};

export default RichTextRenderer;
