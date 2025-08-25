import React, { useState } from "react";
import schema from "./schema.json";
import initial from "./data.json";
import { VisualJsonFlow } from "@vjf/react";

export default function App() {
  const [data, setData] = useState<any>(initial);
  return (
    <div style={{width:"100%",height:"100%"}}>
      <VisualJsonFlow schema={schema} value={data} onChange={setData} onValidate={()=>{}} />
    </div>
  );
}
