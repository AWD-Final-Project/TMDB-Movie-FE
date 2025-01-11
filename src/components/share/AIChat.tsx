import { Button } from "@mui/material";
import { useState } from "react";

function AIChat() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // This function sends the message and gets a response from the AI
  const sendMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setLoading(true);
    setInput(""); // Clear the input field

    // Simulate calling the AI API (for example OpenAI's GPT-3 or similar)
    try {
      const response = await fetch("/api/ai-chat", {
        // You'd replace this with the actual API endpoint for AI.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      const aiMessage = data.reply || "Sorry, I couldn't understand that.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiMessage, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error with the AI response.", sender: "ai" },
      ]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input);
    }
  };

  return (
    <div className="AIChat bg-white p-4 shadow-lg rounded-lg h-full fixed w-[400px]">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto space-y-4">
          {/* Display chat messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message py-2 rounded-full px-4 ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && (
            <div className="loadingMessage text-center text-gray-500">
              <p>AI is typing...</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex items-center">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            className="ml-2 p-2 bg-blue-500 text-white rounded-xl normal-case"
            disabled={loading}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AIChat;
