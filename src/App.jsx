import { useState } from "react";

function App() {
  const [openSection, setOpenSection] = useState({
    taskForm: true,
    tasks: true,
    completedTasks: true,
  });

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="app">
      <h1>Task List with Priority</h1>
      <div className="task-container">
        <h2>New task</h2>
        <button
          className={`close-button ${openSection.taskForm ? "open" : ""}`}
          onClick={() => toggleSection("taskForm")}
        >
          +
        </button>
        {openSection.taskForm && <TaskForm />}
      </div>
      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {openSection.tasks && <TaskList />}
      </div>
      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {openSection.completedTasks && <CompletedTaskList />}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  return (
    <form action="" className="task-form">
      <input
        type="text"
        value={title}
        placeholder="Task titke"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input type="datetime-local" required />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList() {
  return (
    <ul className="task-list">
      <Task />
    </ul>
  );
}

function Task() {
  return (
    <li className="task-item">
      <div className="task-info">
        <div>
          Title <strong>Medium</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button">Delete</button>
      </div>
    </li>
  );
}

function CompletedTaskList() {
  return (
    <ul className="completed-task-list">
      <Task />
    </ul>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array mathods (map,
        filter), event handling
      </p>
    </footer>
  );
}

export default App;
