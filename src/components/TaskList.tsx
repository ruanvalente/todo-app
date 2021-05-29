import { useEffect, useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storageTasks = window.localStorage.getItem("ignite::tasks");

    if (storageTasks) {
      return JSON.parse(storageTasks);
    }
    return [];
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("ignite::tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    const findTaskIsComplete = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );

    setTasks(findTaskIsComplete);
  }

  function handleRemoveTask(id: number) {
    const findTask = tasks.filter((task) => task.id !== id);

    setTasks(findTask);
  }

  return (
    <>
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar novo todo"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button
              type="submit"
              data-testid="add-task-button"
              onClick={handleCreateNewTask}
            >
              <FiCheckSquare size={16} color="#fff" />
            </button>
          </div>
        </header>

        <main>
          {tasks.length === 0 && (
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>
              Nenhuma tarefa foi adicionada no momento.
            </p>
          )}
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <div
                  className={task.isComplete ? "completed" : ""}
                  data-testid="task"
                >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  <FiTrash size={16} />
                </button>
              </li>
            ))}
          </ul>
        </main>
      </section>
      <footer>
        <p>
          Feito com ❤️ por
          <a href="https://www.linkedin.com/in/ruan-valente/">Ruan Valente</a>
          👋🏽
        </p>
      </footer>
    </>
  );
}
