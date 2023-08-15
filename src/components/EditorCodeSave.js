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

import React, { createRef, useEffect, useMemo, useState } from "react";
import { file_server_request } from "../utils/Service";
import config from "../config.json";

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

// const getEditor = () => {
//   return reactQuill?.current?.editor;
// };

const EditorComponent = (props) => {
    const {
        expand,
        readOnly,
        setShowPopup,
        defaultContent,
        setEditorContent,
        setEditorContentText,
        editorProps,
        placeholder = "Type text here, select for formating",
        theme = "bubble",
        reactQuill,
        editorRange,
    } = props;

    const addImageInEditor = (setShowPopup) => () => {
        const editor = reactQuill?.current?.editor;
        editorRange.current = editor?.getSelection();

        console.log("reached iie2");
        if (!editor || !editorRange.current) {
            return setShowPopup(false);
        }
        console.log("reached iie3");
        setShowPopup(true);
    };

    // const reactQuill = createRef();
    // let editorRange;

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

    const handleChangeFunc = () => {
        const editorObject = reactQuill?.current?.editor;
        if (!editorObject) return;
        const editorContent = editorObject.editor.delta;
        console.log(editorContent);

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

    return (
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
    );
};

function PopUp({ setShowPopup, reactQuill, editorRange }) {
    const [imgUrl, setImgUrl] = useState();

    console.log("reached popup");

    const onFileChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImgUrl(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleSubmit = () => {
        const editor = reactQuill?.current?.editor;
        console.log("reached submit");

        if (!editorRange.current) {
            console.log("hello");
            return setShowPopup(false);
        }
        console.log("reached submit2");

        const formData = new FormData();
        const inputFile = document.querySelector("#editorFileInput");
        formData.append("file", inputFile.files[0]);
        file_server_request(
            "post",
            "/uploadFile",
            formData,
            ({ data: { filename } }) => {
                if (filename) {
                    console.log("reached request");
                    const url = `${FILE_SERVER}/getFile?id=${filename}`;
                    editor?.insertEmbed(
                        editorRange.current.index,
                        "image",
                        url,
                        Quill.sources.USER
                    );
                }
            },
            console.log
        );
        setShowPopup(false);
    };

    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                zIndex: 10,
                backgroundColor: "#12121230",
            }}
        >
            <div
                style={{
                    margin: "auto",
                    height: "50vh",
                    width: "70vw",
                    backgroundColor: "#fff",
                }}
            >
                <label>
                    <input
                        id="editorFileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={onFileChange}
                        accept="image/png, image/jpeg"
                    />
                    Upload Image
                </label>
                <button onClick={() => setShowPopup(false)}>Close</button>
                <button onClick={() => handleSubmit()}>Submit</button>
                <img alt="demoImg" src={imgUrl} />
            </div>
        </div>
    );
}

export default function Editor({
    expand,
    readOnly,
    defaultContent,
    setEditorContent,
    setEditorContentText,
}) {
    const [showPopup, setShowPopup] = useState(false);

    const reactQuill = createRef();
    const editorRange = createRef();

    const defaultProps = {
        readOnly,
        setEditorContent,
        setEditorContentText,
        defaultContent,
        setShowPopup,
        reactQuill,
        editorRange,
    };

    if (expand) {
        return (
            <>
                {showPopup ? <PopUp editorRange={editorRange} reactQuill={reactQuill} setShowPopup={setShowPopup} /> : null}
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
