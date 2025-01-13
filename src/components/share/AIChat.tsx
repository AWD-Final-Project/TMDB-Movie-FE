import { Button, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import axiosClient from "../../configs/axios";
import { IMovie } from "../../interfaces";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

function AIChat() {
  const [messages, setMessages] = useState<{ text: any; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [returnType, setReturnType] = useState("search");
  const navigate = useNavigate();

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
      const queryString =
        returnType === "search"
          ? "/ai/search?key_word=" + message
          : "/ai/navigate?keyword=" + message;
      const response = await axiosClient.get(queryString);
      const data = await response.data.data;

      if (returnType === "search") {
        const movies = data.movies;

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: (
              <div className="flex gap-5 mb-4 overflow-x-auto">
                {movies.map((movie: IMovie) => (
                  <div
                    key={movie.id}
                    className="flex items-center my-1 flex-col w-20 cursor-pointer"
                    onClick={() =>
                      navigate(`/movie/${movie._id}?tmdb_id=${movie.id}`)
                    }
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300_and_h450_multi_faces${movie?.poster_path}`}
                      alt={movie.title}
                      className="w-[200px]  object-cover rounded-md"
                    />
                    <div className="ml-3 w-full relative">
                      <Typography className="text-ellipsis text-nowrap overflow-hidden mt-1 w-20">
                        {movie.title}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            ),
            sender: "ai",
          },
        ]);
      } else {
        const { movie, route } = data;
        if (movie) {
          navigate(route + "?tmdb_id=" + movie.id);
        } else {
          navigate(route);
        }
      }
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
              className={classNames("message py-2 rounded-full px-4", {
                "bg-blue-500 text-white": msg.sender === "user",
              })}
            >
              <div>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="loadingMessage text-center text-gray-500">
              <p>
                {returnType === "search" ? "AI is typing..." : "Navigating..."}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center gap-2">
            <Select
              className=""
              size="small"
              value={returnType}
              onChange={(e) =>
                setReturnType(e.target.value as "search" | "navigate")
              }
            >
              <MenuItem value="search">Search</MenuItem>
              <MenuItem value="navigate">Navigate</MenuItem>
            </Select>
          </div>
          <div className="mt-2 flex items-center">
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default AIChat;
