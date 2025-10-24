// react imports
import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react"

// other imports
import Toolbar from "../Toolbar/Toolbar.jsx";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Editor.css'
import './../../Form/Form.css'
import {convertToDB} from "../Util/Util.jsx";

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'
const Parchment = Quill.import('parchment');

const customClass = new Parchment.Attributor.Class('custom', 'custom');
const customName = new Parchment.Attributor.Attribute('data-name', 'data-name');
const customType = new Parchment.Attributor.Attribute('data-type', 'data-type');
const customPlaceholder = new Parchment.Attributor.Attribute('data-placeholder', 'data-placeholder');
Quill.register(customClass, true);
Quill.register(customName, true);
Quill.register(customType, true);
Quill.register(customPlaceholder, true);

// Editor is a const wrapper so that its ref can be accessed in the parent component
// This was done to simplify the FormBuilder component since Editor itself is quite large

// Disable warnings from the linter, this is only a problem if you have ESLint set up
// eslint-disable-next-line react/display-name,react/prop-types
const Editor = forwardRef(({initialValue}, ref) => {


    const [showInsertMenu, setShowInsertMenu] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [preview, setPreview] = useState(null);

    // The insertData contains the information about the current data field
    const [insertData, setInsertData] = useState({
        name: "",
        type: "text",
        placeholder: "",
    });
    const [insertMenuPos, setInsertMenuPos] = useState({
        top: 0,
        left: 0,
    });

    // Refs to DOM elements and Quill instance
    const insertMenuRef = useRef(null);
    const insertButtonRef = useRef(null);
    const previewButtonRef = useRef(null);
    const quillRef = useRef(null);

    // Cursor (selection) range
    const [range, setRange] = useState(null)

    const [value, setValue] = useState(initialValue);

    // Toggle the insert menu while preserving the cursor position so that the inserted
    // field is where user was selecting
    const handleInsertClick = () => {
        if (showPreview) return;
        const quill = quillRef.current.getEditor();
        const currentRange = quill.getSelection();
        setRange(currentRange)
        setShowInsertMenu(!showInsertMenu);
    }

    // Allow the parent component to call methods via the ref
    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (quillRef.current) {
                return quillRef.current.getEditor().root.innerHTML;
            }
            return '';
        }
    }))

    // Construct the insert menu based on the position of the insert button
    useEffect(() => {
        if (showInsertMenu && insertMenuRef.current && insertButtonRef.current) {
            const buttonRect = insertButtonRef.current.getBoundingClientRect();
            const menuRect = insertMenuRef.current.getBoundingClientRect();

            const top = buttonRect.bottom + window.scrollY + 5;
            const left =
                buttonRect.left +
                buttonRect.width / 2 -
                menuRect.width / 2 +
                window.scrollX;
            setInsertMenuPos({
                top: top,
                left: left,
            });
        }
    }, [showInsertMenu]);

    // Converts the input field data to the format that will be saved in the DB
    const handleInsert = (event) => {
        event.preventDefault();

        const inputHTML = `<p class='custom-input' data-name="${insertData.name.replace(/\s+/g, '')}"` +
            ` data-type="${insertData.type}" data-placeholder="${insertData.placeholder}">` +
            `&{insertData.name} Input Placeholder</p>`;

        const quill = quillRef.current.getEditor();
        // Replace the selected text if there was any, otherwise append
        if (range) {
            quill.deleteText(range.index, range.length)
            quill.clipboard.dangerouslyPasteHTML(range.index, inputHTML);
        } else {
            quill.clipboard.dangerouslyPasteHTML(quill.getLength(), inputHTML);
        }
        setValue(quill.root.innerHTML);
        setShowInsertMenu(false);
    }

    // Toggle preview mode on and off
    const handlePreview = (event) => {
        event.preventDefault();

        if (!showPreview) {
            setPreview(convertToDB(quillRef.current.getEditor().root.innerHTML));
        }

        setShowPreview(!showPreview);
    }

    const handleChange = (e) => {
        setInsertData({ ...insertData, [e.target.name]: e.target.value });
    };

    // ReactQuill components
    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };
    const formats = [
        'bold', 'italic', 'underline',
        'align', 'custom',
        'data-name', 'data-type', 'data-placeholder'
    ];

    return (
        <>
            <Toolbar id="toolbar"
                     onInsertClick={handleInsertClick} insertButtonRef={insertButtonRef}
                     previewToggle={handlePreview} previewRef={previewButtonRef}
            />
            { !showPreview && (
                <div id="editor">
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                />
                </div>
            )}

            { showPreview && (
                <div id="form-submission-container">
                    <form id="form-container">
                        <div id="form" dangerouslySetInnerHTML={{
                            __html: preview
                        }}/>
                    </form>
                    <div id="bottom-padding"></div>
                </div>
            )}

            { showInsertMenu && (
                <div
                    id="insert-menu"
                    ref={insertMenuRef}
                    style={{
                        position: "fixed",
                        top: insertMenuPos.top,
                        left: insertMenuPos.left,
                        background: "#fff",
                        padding: "10px",
                        border: "1px solid black",
                        borderRadius: "6px",
                    }}
                >
                    <div id="close-div">
                        <h3>Create an input field:</h3>
                        <FontAwesomeIcon
                            id="close-button"
                            onClick={() => setShowInsertMenu(false)}
                            cursor="pointer"
                            icon={faXmarkCircle}
                        />
                    </div>
                    <form id='insert-form' onSubmit={handleInsert}>
                        <label> Name:
                            <input name='name' onChange={handleChange} value={insertData.name} required/>
                        </label>
                        <label> Type:
                            <input name='type' onChange={handleChange} value={insertData.type}/>
                        </label>
                        <label> Placeholder:
                            <input name='placeholder' onChange={handleChange} value={insertData.placeholder}/>
                        </label>
                        <input id="submit-insert" type="submit"/>
                    </form>
                </div>
            )}
        </>
    );
});

export default Editor;