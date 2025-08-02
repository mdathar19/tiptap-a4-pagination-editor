
import TextEditor from '../components/TextEditor/TextEditor';


const EditorPage = () => {
  return (
    <div className="max-w-full">
      {/* Editor */}
      <div className="grid grid-cols-1 gap-6">
        <TextEditor />
        
      
      </div>
    </div>
  );
};

EditorPage.displayName = 'EditorPage';

export default EditorPage;