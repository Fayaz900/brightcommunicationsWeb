"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { AdminInputDialog } from "@/components/admin/AdminInputDialog";
import { validateEditorUrl } from "@/lib/admin-validation";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  error?: string;
  onChange?: () => void;
};

type DialogType = "link" | "image" | null;

export function RichTextEditor({
  name,
  defaultValue = "",
  error,
  onChange,
}: RichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue);
  const [dialogType, setDialogType] = useState<DialogType>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: defaultValue,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      setHtml(currentEditor.getHTML());
      onChange?.();
    },
    editorProps: {
      attributes: {
        class: "rich-editor__prose",
      },
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setHtml(defaultValue);
    }
  }, [defaultValue, editor]);

  if (!editor) return null;

  return (
    <div className={`admin-field${error ? " admin-field--invalid" : ""}`}>
      <label htmlFor={name}>Body</label>
      <input type="hidden" name={name} value={html} readOnly />
      <div className="rich-editor">
        <div className="rich-editor__toolbar">
          <button
            type="button"
            className={editor.isActive("bold") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </button>
          <button
            type="button"
            className={editor.isActive("italic") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </button>
          <button
            type="button"
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </button>
          <button
            type="button"
            className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </button>
          <button
            type="button"
            className={editor.isActive("bulletList") ? "is-active" : ""}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            List
          </button>
          <button type="button" onClick={() => setDialogType("link")}>
            Link
          </button>
          <button type="button" onClick={() => setDialogType("image")}>
            Image
          </button>
        </div>
        <div className="rich-editor__content">
          <EditorContent editor={editor} />
        </div>
      </div>
      {error ? (
        <p className="admin-field__error" role="alert">
          {error}
        </p>
      ) : null}

      <AdminInputDialog
        open={dialogType === "link"}
        onOpenChange={(open) => {
          if (!open) setDialogType(null);
        }}
        title="Insert link"
        label="Link URL"
        placeholder="https://example.com"
        confirmLabel="Insert link"
        validate={(value) => validateEditorUrl(value, "link")}
        onConfirm={(url) => {
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
      />

      <AdminInputDialog
        open={dialogType === "image"}
        onOpenChange={(open) => {
          if (!open) setDialogType(null);
        }}
        title="Insert image"
        label="Image URL"
        placeholder="https://example.com/image.jpg"
        confirmLabel="Insert image"
        allowUpload
        uploadFolder="blog"
        validate={(value) => validateEditorUrl(value, "image")}
        onConfirm={(url) => {
          editor.chain().focus().setImage({ src: url }).run();
        }}
      />
    </div>
  );
}
