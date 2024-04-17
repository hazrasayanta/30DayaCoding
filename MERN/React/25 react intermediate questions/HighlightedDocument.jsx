import React, { useState } from 'react';

const HighlightedDocument = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleTextareaChange = (event) => {
    const newText = event.target.value;
    setDocumentContent(newText);
    setHighlightedText(newText);
  };

  const handleInsertText = () => {
    // Logic to insert text into the document
    // Here, we simply append the text to the existing content
    const newText = documentContent + '\nNew text added here.';
    setDocumentContent(newText);
    setHighlightedText('New text added here.');
  };

  return (
    <div>
      <h2>Highlighted Document</h2>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={documentContent}
          onChange={handleTextareaChange}
          rows={10}
          cols={50}
          placeholder="Type or paste your document content here..."
        />
      </div>
      <div>
        <button onClick={handleInsertText}>Insert Text</button>
      </div>
      <div
        style={{ marginTop: '10px', border: '1px solid black', padding: '5px' }}
      >
        <p>Document:</p>
        <pre>
          {documentContent.split('\n').map((line, index) => (
            <span
              key={index}
              style={{
                backgroundColor:
                  line === highlightedText ? 'yellow' : 'transparent',
              }}
            >
              {line}
              <br />
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default HighlightedDocument;
