import { SearchBox } from '@/components/SearchBox'
import { Button } from 'primereact/button'
import { Panel } from 'primereact/panel'

export default function IndexPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Panel className="w-150" header="PRIMEREACT TEMPLATE" toggleable>
        <h1 className="text-3xl font-bold mb-12">Foo bar is a title.</h1>
        <SearchBox />
        <Button>Button</Button>
      </Panel>
    </div>
  )
}
