import React, { useRef } from "react";
// import EmailEditor from "react-email-editor";
import { EmailEditor } from "react-email-editor";

export default function TemplateBuilder() {
  const editorRef = useRef(null);

  const onLoad = () => {
    // Optionally load a saved design JSON
    // editorRef.current?.editor.loadDesign(savedDesignJson);
  };

  const saveDesign = () => {
    editorRef.current?.editor.saveDesign((design) => {
      // store JSON to DB
      console.log("Design JSON", design);
    });
  };

  const exportHtml = () => {
    editorRef.current?.editor.exportHtml(({ html, design }) => {
      // html = email-safe HTML; design = JSON
      console.log("HTML", html);
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div style={{ padding: 8, display: "flex", gap: 8 }}>
        <button onClick={saveDesign}>Save</button>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      {/* <EmailEditor
        ref={editorRef}
        onLoad={onLoad}
        options={{
          appearance: { theme: "modern" },
          features: {
            stockImages: true,
            undoRedo: true,
            textEditor: { spellchecker: true },
          },
          tools: {
            // enable the blocks you want (like your screenshot)
            text: { enabled: true },
            image: { enabled: true },
            button: { enabled: true },
            divider: { enabled: true },
            social: { enabled: true },
            spacer: { enabled: true },
            // columns / structure
            columns: { enabled: true },
            // optional extras
            html: { enabled: true }, // raw HTML block (advanced)
          },
        }}
        style={{ height: "calc(100vh - 48px)" }}
      /> */}
      <EmailEditor
        ref={editorRef}
        onLoad={onLoad}
        options={{
          appearance: { theme: "modern" },
          features: {
            stockImages: true,
            undoRedo: true,
            textEditor: { spellchecker: true },
          },
        }}
        //   options={...}
      />
    </div>
  );
}
