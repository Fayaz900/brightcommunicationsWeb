"use client";

import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CodeXml,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { AdminInputDialog } from "@/components/admin/AdminInputDialog";
import { validateEditorUrl } from "@/lib/admin-validation";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  error?: string;
  onChange?: () => void;
};

type DialogType = "link" | "image" | null;

function ToolbarButton({
  active = false,
  disabled = false,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={active ? "is-active" : ""}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ToolbarGroup({ children }: { children: ReactNode }) {
  return <div className="rich-editor__group">{children}</div>;
}

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
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false },
      }),
      Subscript,
      Superscript,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      Image.configure({
        resize: {
          enabled: true,
          minWidth: 64,
          minHeight: 64,
          alwaysPreserveAspectRatio: true,
        },
      }),
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
          <div className="rich-editor__toolbar-row">
            <ToolbarGroup>
              <ToolbarButton
                title="Undo"
                disabled={!editor.can().undo()}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo2 />
              </ToolbarButton>
              <ToolbarButton
                title="Redo"
                disabled={!editor.can().redo()}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo2 />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarButton
                title="Bold"
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold />
              </ToolbarButton>
              <ToolbarButton
                title="Italic"
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic />
              </ToolbarButton>
              <ToolbarButton
                title="Underline"
                active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon />
              </ToolbarButton>
              <ToolbarButton
                title="Strikethrough"
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <HeadingButton editor={editor} level={1} />
              <HeadingButton editor={editor} level={2} />
              <HeadingButton editor={editor} level={3} />
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarButton
                title="Subscript"
                active={editor.isActive("subscript")}
                onClick={() => editor.chain().focus().toggleSubscript().run()}
              >
                <SubscriptIcon />
              </ToolbarButton>
              <ToolbarButton
                title="Superscript"
                active={editor.isActive("superscript")}
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
              >
                <SuperscriptIcon />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarButton
                title="Numbered list"
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered />
              </ToolbarButton>
              <ToolbarButton
                title="Bullet list"
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List />
              </ToolbarButton>
            </ToolbarGroup>
          </div>

          <div className="rich-editor__toolbar-row">
            <ToolbarGroup>
              <ToolbarButton
                title="Align left"
                active={editor.isActive({ textAlign: "left" })}
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
              >
                <AlignLeft />
              </ToolbarButton>
              <ToolbarButton
                title="Align center"
                active={editor.isActive({ textAlign: "center" })}
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
              >
                <AlignCenter />
              </ToolbarButton>
              <ToolbarButton
                title="Align right"
                active={editor.isActive({ textAlign: "right" })}
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
              >
                <AlignRight />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarButton title="Insert image" onClick={() => setDialogType("image")}>
                <ImageIcon />
              </ToolbarButton>
              <ToolbarButton
                title={editor.isActive("link") ? "Remove link" : "Insert link"}
                active={editor.isActive("link")}
                onClick={() => {
                  if (editor.isActive("link")) {
                    editor.chain().focus().unsetLink().run();
                    return;
                  }
                  setDialogType("link");
                }}
              >
                <Link2 />
              </ToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <ToolbarButton
                title="Blockquote"
                active={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote />
              </ToolbarButton>
              <ToolbarButton
                title="Inline code"
                active={editor.isActive("code")}
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <CodeXml />
              </ToolbarButton>
              <ToolbarButton
                title="Clear formatting"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              >
                <RemoveFormatting />
              </ToolbarButton>
            </ToolbarGroup>
          </div>
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

function HeadingButton({ editor, level }: { editor: Editor; level: 1 | 2 | 3 }) {
  return (
    <ToolbarButton
      title={`Heading ${level}`}
      active={editor.isActive("heading", { level })}
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
    >
      <span className="rich-editor__heading-label">H{level}</span>
    </ToolbarButton>
  );
}
