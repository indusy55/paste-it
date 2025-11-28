import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import 'quill/dist/quill.snow.css'; 

export default function IndexPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="flex mb-2">
          <Button size="small">保存</Button>
        </div>
      <form>
        <div className="flex flex-col gap-2">
          <InputText />
        <Editor style={{height: '300px'}} />
        </div>
      </form>
    </div>
  )
}
