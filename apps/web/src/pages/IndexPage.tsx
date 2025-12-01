import useSWRMutation from "swr/mutation";
import {pick} from "es-toolkit";
import type { CreatePasteInput } from "@/types/models/pastes";
import { useForm } from "@tanstack/react-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import "quill/dist/quill.snow.css";
import { request } from "@/utils/request";

type ExpiredDurationOption = {
  label: string;
  code: number;
};

type CreatePasteFormValues = Omit<CreatePasteInput, "expired_at"> & {
  expired_duration: ExpiredDurationOption;
};

export default function IndexPage() {
  const expiredDurationOptions: ExpiredDurationOption[] = [
    {
      label: "10分钟",
      code: 1000 * 60 * 10,
    },
    {
      label: "30分钟",
      code: 1000 * 60 * 30,
    },
  ];

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      content: "",
      secret_hash: "",
      attachments: [],
      expired_duration: expiredDurationOptions[0],
    } as CreatePasteFormValues,
    onSubmit: async ({ value }) => {
      const expired_at = new Date(
        Date.now() + value.expired_duration.code
      ).toISOString();

      runCreatePaste({
        ...pick(value, ['title', 'secret_hash', 'lang', 'content', 'attachments']),
        expired_at
      });
    },
  });

  async function createPaste(url: string, { arg }: { arg: CreatePasteInput }) {
    return request.post(url, arg)
  }

  const { trigger: runCreatePaste, isMutating } = useSWRMutation(
    "/pastes",
    createPaste
  );

  return (
    <div className="w-full h-full flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <div className="flex items-center gap-2">
          <Field
            name="expired_duration"
            children={(field) => (
              <Dropdown
                name={field.name}
                placeholder="过期时间"
                options={expiredDurationOptions}
                optionLabel="label"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.value)}
              />
            )}
          />

          <Field
            name="secret_hash"
            children={(field) => (
              <InputText
                name={field.name}
                placeholder="密钥"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Field
            name="title"
            children={(field) => (
              <InputText
                name={field.name}
                placeholder="标题"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            )}
          />
          <Field
            name="content"
            children={(field) => (
              <Editor
                style={{ height: "300px" }}
                name={field.name}
                value={field.state.value}
                onTextChange={(e) => field.handleChange(e.htmlValue ?? "")}
                placeholder="内容"
              />
            )}
          />
          <div className="flex mb-2 ml-auto">
            <Button type="submit" loading={isMutating}>
              保存
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
