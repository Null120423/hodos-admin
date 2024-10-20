import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { forwardRef, memo, useEffect, useImperativeHandle, useLayoutEffect } from 'react';
import { useQuill } from 'react-quilljs';

import './style.css';

const Editor = forwardRef(({ onChangeValue }, ref) => {
  const { quill, quillRef, Quill } = useQuill({ 
    modules: { blotFormatter: {} },
  });

  useLayoutEffect(() => {
    if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
      Quill.register('modules/blotFormatter', BlotFormatter);
    }
  }, [])
  

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChangeValue(quill.root.innerHTML);
      });
    }
  }, []);

   useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quill) {
        return quill.root.innerHTML;
      }
      return '';
    }
  }));

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
});

export default memo(Editor);
