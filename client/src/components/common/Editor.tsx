import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
interface EditorProps {
  onChange: any;
  onReady: any;
  editorLoaded: any;
  name: any;
  value?: any;
}
const Editor: FC<EditorProps> = ({
  onChange,
  onReady,
  editorLoaded,
  name,
  value,
}) => {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);

  return (
    <div>
      {editorLoaded && (
        <CKEditor
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
          onReady={(editor) => {
            onReady(editor);
          }}
          onError={(a, b) => console.log(a, b)}
        />
      )}
    </div>
  );
};

export default Editor;
