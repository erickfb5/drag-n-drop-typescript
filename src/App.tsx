import  { useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    e.currentTarget.classList.add("invisible");
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.classList.remove("invisible");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("hovered");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) =>
    e.currentTarget.classList.remove("hovered");

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(data) as Node;
    e.currentTarget.appendChild(draggedElement);
    e.currentTarget.classList.remove("hovered");
  };

  return (
    <div>
      <div
        id="fill"
        className={isDragging ? "fill hold" : "fill"}
        draggable={true}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      ></div>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="empty"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        ></div>
      ))}
    </div>
  );
}

export default App;
