import React, { useRef } from "react";
import EmailEditor from "react-email-editor";
import TemplatesSection from "./TemplatesSection";

export default function TemplateBuilder() {
  const editorRef = useRef(null);

  const onLoad = () => {
    // Optionally load a starter template here
    // const starter = { body: { rows: [] }, counters: { u_column: 1 } };
    // editorRef.current?.loadDesign(starter);
  };

  const saveDesign = () => {
    editorRef.current?.editor?.saveDesign((design) => {
      // store JSON to DB
      console.log("Design JSON", design);
    });
  };

  const exportHtml = () => {
    editorRef.current?.editor?.exportHtml(({ html, design }) => {
      // html = email-safe HTML; design = JSON
      console.log("HTML", html);
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <TemplatesSection/>
    </div>
  );
}
