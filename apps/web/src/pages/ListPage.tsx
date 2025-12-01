import type { PasteList } from "@/types/models/pastes"
import { request } from "@/utils/request"
import { Editor } from "primereact/editor"
import useSWR from "swr"

export default function ListPage() {
    const { data } = useSWR('/pastes', (url) => request<PasteList>(url))

    return data ? <div>
        {data.data.map(it => <div key={it.id}>
            <div>{it.title}</div>
            <Editor readOnly value={it.content} showHeader={false} />
        </div>)}
    </div> : null
}