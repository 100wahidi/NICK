import { useState } from "react";

function RAG() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert("Please select a resume PDF");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch("https://alice-production-9ec8.up.railway.app/upload", {
        method: "POST",
        body: formData
      });

      await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "system", content: "✅ Resume profile uploaded successfully" }
      ]);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const askQuestion = async () => {
    if (!question) return;

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
      <h1>📄 Resume knowledge assistant</h1>

      <div className="upload-section">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={uploadFile}>Upload resume PDF</button>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>
            <p>{msg.content}</p>
          </div>
        ))}

        {loading && <p className="loading">⏳ Analyzing profile...</p>}
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Ask about experience, skills, or role fit..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={askQuestion}>Send</button>
      </div>
    </div>
  );
}

export default RAG;