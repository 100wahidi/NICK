import { useState } from "react";

function RAG() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Upload PDF
  const uploadFile = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "system", content: "✅ Document uploaded successfully" }
      ]);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  // ✅ Ask question
  const askQuestion = async () => {
    if (!question) return;

    // add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", content: question }
    ]);

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      // add bot response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer }
      ]);

    } catch (error) {
      console.error(error);
    }

    setQuestion("");
    setLoading(false);
  };

  return (
    <div className="rag-container">

      <h1>📚 RAG Book Analyzer</h1>

      {/* ✅ Upload section */}
      <div className="upload-section">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload PDF</button>
      </div>

      {/* ✅ Chat area */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}

        {loading && <p className="loading">⏳ Thinking...</p>}
      </div>

      {/* ✅ Input section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Ask something about the book..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion}>Send</button>
      </div>

    </div>
  );
}

export default RAG;