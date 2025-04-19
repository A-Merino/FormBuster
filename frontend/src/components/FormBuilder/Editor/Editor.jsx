import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react"

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

import './Editor.css'
import Toolbar from "../Toolbar/Toolbar.jsx";
import {faXmarkCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/display-name,react/prop-types
const Editor = forwardRef(({ initialValue}, ref) => {
    const [showInsertMenu, setShowInsertMenu] = useState(false);
    const [insertData, setInsertData] = useState({
        name: "",
        type: "text",
        placeholder: "",
    });
    const [insertMenuPos, setInsertMenuPos] = useState({
        top: 0,
        left: 0,
    });

    const insertMenuRef = useRef(null);
    const insertButtonRef = useRef(null);
    const quillRef = useRef(null);

    const [value, setValue] = useState(initialValue);

    const [range, setRange] = useState(null)

    const handleInsertClick = () => {
        const quill = quillRef.current.getEditor();
        const currentRange = quill.getSelection();
        setRange(currentRange)
        setShowInsertMenu(!showInsertMenu);
    }

    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (quillRef.current) {
                return quillRef.current.getEditor().root.innerHTML;
            }
            return '';
        }
    }))

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

    const handleInsert = (event) => {
        event.preventDefault();

        // const type = insertData.type;
        // if (type === "") {
        //
        // }
        const inputHTML = `<p class="custom-input" data-name="${insertData.name.replace(/\s+/g, '')}"` +
            ` data-type="${insertData.type}" data-placeholder="${insertData.placeholder}">` +
            `&lt${insertData.name} Input Placeholder&gt</p>`;
        const quill = quillRef.current.getEditor();
        if (range) {
            quill.deleteText(range.index, range.length)
            quill.clipboard.dangerouslyPasteHTML(range.index, inputHTML);
        } else {
            setValue(value + inputHTML);
        }
        setShowInsertMenu(false);
    }

    const handleChange = (e) => {
        setInsertData({ ...insertData, [e.target.name]: e.target.value });
    };

    const modules = {
        toolbar: {
            container: '#toolbar',
        },
    };

    const formats = [
        'bold', 'italic', 'underline',
        'align',
    ];

    return (
        <>
            <div id='editor'>
                <Toolbar id="toolbar" onInsertClick={handleInsertClick} insertButtonRef={insertButtonRef}/>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                />
            </div>

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