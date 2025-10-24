import "./Toolbar.css"

// eslint-disable-next-line react/prop-types
function Toolbar({ previewToggle, previewRef, onInsertClick, insertButtonRef }) {

    /* RENDER ------------------------------ */
    return(
        <>
        <div id='toolbar'>
            <div id="toolbar-left">
                {/* Default buttons */}
                <button className='ql-align' value=''/>
                <button className='ql-align' value='center'/>
                <button className='ql-align' value='right'/>
                <button className='ql-align' value='justify'/>
            </div>
            <div id="toolbar-center">
                {/* Custom buttons (Preview mode) */}
                <button id="preview-toggle" onClick={previewToggle} ref={previewRef}>
                    <b>Preview Mode</b>
                </button>
            </div>
            <div id="toolbar-right">
                {/* Default buttons */}
                <button className='ql-bold'/>
                <button className='ql-italic'/>
                <button className='ql-underline'/>

                {/* Custom buttons */}
                <button id='insert' type="button" ref={insertButtonRef} onClick={onInsertClick} className='insertField'>
                    Insert Field
                </button>
            </div>
        </div>
        </>
    );
}

export default Toolbar;