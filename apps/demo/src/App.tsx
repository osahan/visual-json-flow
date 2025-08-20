import React, { useState } from "react";
import schema from "./schema.json";
import initial from "./data.json";
import { VisualJsonFlow } from "@vjf/react";

export default function App() {
  const [data, setData] = useState<any>(initial);
  return (
    <div style={{width:"100%",height:"100%",display:"grid",gridTemplateColumns:"1fr 360px"}}>
      <VisualJsonFlow schema={schema} value={data} onChange={setData} onValidate={()=>{}} />
      <pre style={{margin:0, padding:12, overflow:"auto", background:"#111", color:"#9fe"}}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
