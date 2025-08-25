import React from 'react';

interface SchemaViewProps {
  schema: any;
}

export function SchemaView({ schema }: SchemaViewProps) {
  return (
    <div className="vjf-schema-view">
      <div className="vjf-schema-header">
        <h2>JSON Schema</h2>
        <p>This is the schema that defines the structure of your data.</p>
      </div>
      <div className="vjf-schema-content">
        <pre className="vjf-schema-json">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </div>
  );
}
