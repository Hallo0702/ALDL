import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
interface EditorProps {
  onChange: any;
  editorLoaded: any;
  name: any;
  value?: any;
}
const Editor: FC<EditorProps> = ({ onChange, editorLoaded, name, value }) => {
  const router = useRouter();
  console.log(router);
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
          // type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            onChange(data);
          }}
          onReady={(editor) => {
            console.log(editor);
            // console.log(event.ui.view.render());
          }}
          onError={(a, b) => console.log(a, b)}
        />
      )}
    </div>
  );
};

export default Editor;
