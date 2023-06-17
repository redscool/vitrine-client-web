import katex from "katex";
import "katex/dist/katex.css";

import ReactQuill, { Quill } from "react-quill";

import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import "@edtr-io/mathquill/build/mathquill";
import "@edtr-io/mathquill/build/mathquill.css";

import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";

import BlotFormatter from "quill-blot-formatter";

import React, { createRef, useEffect } from "react";
import { useState } from "react";

const Image = Quill.import("formats/image");

const ATTRIBUTES = ["alt", "height", "width", "class", "style"];

class CustomImage extends Image {
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      const copy = { ...formats };

      if (domNode.hasAttribute(attribute)) {
        copy[attribute] = domNode.getAttribute(attribute);
      }

      return copy;
    }, {});
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ["bold", "italic", "underline", "strike", "formula"],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  ["clean"],
];

const CUSTOM_OPERATORS = [
  ["\\pm", "\\pm"],
  ["x^y", "^{}"],
  ["x_y", "_{}"],
  ["\\sqrt{x}", "\\sqrt"],
  ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
  ["\\sqrt[n]{x}", "\\nthroot"],
  ["\\frac{x}{y}", "\\frac"],
  ["\\sum^{s}_{x}{d}", "\\sum"],
  ["\\prod^{s}_{x}{d}", "\\prod"],
  ["\\coprod^{s}_{x}{d}", "\\coprod"],
  ["\\int^{s}_{x}{d}", "\\int"],
  ["\\binom{n}{k}", "\\binom"],
];

const slug = {
  ops: [
    {
      insert: "aXC\n",
    },
    {
      insert: {
        image: "https://git-scm.com/images/logo@2x.png",
      },
    },
    {
      insert: "\n",
    },
  ],
};

window.katex = katex;
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register({
  "formats/image": CustomImage,
});

const EditorComponent = (props) => {
  const reactQuill = createRef();
  const [editorState, setEditorState] = useState();

  const handleChangeFunc = () => {
    const editorObject = reactQuill?.current?.editor;
    if (!editorObject) return;
    const editorContent = editorObject.editor.delta;

    setEditorState(editorContent);
  };

  const {
    get,
    editorProps,
    placeholder = "Type text here, select for formating",
    modules = {
      toolbar: true,
    },
    theme = "bubble",
    handleChange = handleChangeFunc,
  } = props;

  useEffect(() => {
    mathquill4quill({ Quill, katex })(reactQuill.current.editor, {
      operators: CUSTOM_OPERATORS,
    });
    setEditorState(slug);
  }, []);

  return (
    <ReactQuill
      ref={reactQuill}
      modules={modules}
      value={editorState}
      onChange={handleChange}
      placeholder={placeholder}
      theme={theme}
      {...editorProps}
    />
  );
};

export default function Editor({ expand }) {
  if (expand) {
    return (
      <EditorComponent
        modules={{
          formula: true,
          toolbar: toolbarOptions,
          blotFormatter: {},
        }}
        placeholder="Type text here, or click on the formula button to enter math."
        theme="snow"
      />
    );
  }

  return <EditorComponent />;
}
