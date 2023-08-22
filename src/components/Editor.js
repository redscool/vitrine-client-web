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

import React, { useEffect, useMemo, useRef, useState } from "react";
import config from "../config.json";
import ShelfPopUp from "./ShelfPopUp";

const FILE_SERVER = config.FILE_SERVER;

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

const toolbarContainer = [
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

window.katex = katex;
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register({
  "formats/image": CustomImage,
});

const EditorComponent = (props) => {
  const {
    expand,
    readOnly,
    defaultContent,
    setEditorContent,
    setEditorContentText,
    editorProps,
    placeholder = "Type text here, select for formating",
    theme = "bubble",
    reactQuill,
    editorRange,
    handleDelta,
  } = props;

  const [showPopup, setShowPopup] = useState(false);

  const addImageInEditor = (setShowPopup) => () => {
    const editor = reactQuill?.current?.editor;
    editorRange.current = editor?.getSelection();
    if (!editor || !editorRange.current) {
      return setShowPopup(false);
    }
    setShowPopup(true);
  };

  const imageHandler = useMemo(() => {
    return addImageInEditor(setShowPopup);
  }, [setShowPopup]);

  const toolbarOptions = {
    container: toolbarContainer,
    handlers: {
      image: imageHandler,
    },
  };

  const modules = expand
    ? {
      formula: true,
      toolbar: toolbarOptions,
      blotFormatter: {},
    }
    : {
      toolbar: true,
    };

  const handleChangeFunc = (delta, oldDelta, source) => {
    const editorObject = reactQuill?.current?.editor;
    if (!editorObject) return;
    const editorContent = editorObject.editor.delta;
    if (handleDelta) handleDelta(delta, oldDelta, source);
    setEditorContent(editorContent);
    if (setEditorContentText) setEditorContentText(editorObject.getText());
  };

  const { handleChange = handleChangeFunc } = props;

  useEffect(() => {
    mathquill4quill({ Quill, katex })(reactQuill?.current?.editor, {
      operators: CUSTOM_OPERATORS,
    });
  }, []);

  if (readOnly) {
    return (
      <ReactQuill
        ref={reactQuill}
        modules={{
          formula: true,
        }}
        defaultValue={defaultContent}
        theme={"bubble"}
        readOnly={readOnly}
      />
    );
  }

  const handleSubmit = (file) => {
    const editor = reactQuill?.current?.editor;

    if (!editorRange.current) {
      return setShowPopup(false);
    }

    const url = `${FILE_SERVER}/getFile?id=${file.url}`;
    editor?.insertEmbed(
      editorRange.current.index,
      "image",
      url,
      Quill.sources.USER
    );

    setShowPopup(false);
  };

  return (
    <>
      {showPopup ? <ShelfPopUp addFile={handleSubmit} setPopUp={setShowPopup} /> : null}
      <ReactQuill
        ref={reactQuill}
        modules={modules}
        defaultValue={defaultContent}
        onChange={handleChange}
        placeholder={placeholder}
        theme={theme}
        readOnly={readOnly}
        {...editorProps}
      />
    </>
  );
};

export default function Editor({
  expand,
  readOnly,
  defaultContent,
  setEditorContent,
  setEditorContentText,
  handleDelta
}) {
  const reactQuill = useRef();
  const editorRange = useRef();

  const defaultProps = {
    readOnly,
    setEditorContent,
    setEditorContentText,
    defaultContent,
    handleDelta,
    reactQuill,
    editorRange,
  };

  if (expand) {
    return (
      <>
        <EditorComponent
          {...defaultProps}
          expand={expand}
          placeholder="Type text here, or click on the formula button to enter math."
          theme="snow"
        />
      </>
    );
  }

  return (
    <>
      <EditorComponent {...defaultProps} />
    </>
  );
}
