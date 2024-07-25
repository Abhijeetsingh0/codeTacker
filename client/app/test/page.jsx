'use client'
import {useState} from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import rehypeSanitize from "rehype-sanitize";
import dynamic from "next/dynamic";
import MDEditor from "@uiw/react-md-editor";

const CreateBlog = () => {
    const [value, setValue] = useState("")

    return(
        <div className='container'>
            <MDEditor
                data-color-mode="light"
              value={value}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],}}
              onChange={setValue}
            />
            <MDEditor.Markdown source={value} style={{backgroundColor: '#ffffff' }}/>
        </div>
    )
};


export default CreateBlog;
