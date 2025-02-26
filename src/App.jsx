import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [openSection, setOpenSection] = useState({
    taskForm: false,
    tasks: true,
    completedTasks: true,
  });

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
    localStorage.setItem(
      "tasks",
      JSON.stringify([...tasks, { ...task, completed: false, id: Date.now() }])
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks.filter((task) => task.id !== id))
    );
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    localStorage.setItem(
      "tasks",
      JSON.stringify(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      )
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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
        {openSection.taskForm && <TaskForm addTask={addTask} />}
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
        {openSection.tasks && (
          <TaskList
            deleteTask={deleteTask}
            completeTask={completeTask}
            activeTasks={activeTasks}
          />
        )}
      </div>
      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {openSection.completedTasks && (
          <CompletedTaskList
            completedTasks={completedTasks}
            deleteTask={deleteTask}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task titke"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="datetime-local"
        required
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  );
}

function Task({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id, completed } = task;
  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

function CompletedTaskList({ deleteTask, completedTasks }) {
  return (
    <ul className="task-list">
      {completedTasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          deleteTask={deleteTask}
          completed={true}
        />
      ))}
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
