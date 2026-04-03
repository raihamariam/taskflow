"use client";

import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, completeTask } from "../lib/api";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("medium");

  async function loadTasks(currentFilter = filter) {
    try {
      setLoading(true);
      setError("");

      const data =
        currentFilter === "all"
          ? await getTasks()
          : await getTasks(currentFilter);

      setTasks(data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks(filter);
  }, [filter]);

  async function handleAddTask() {
    if (!title.trim()) return;

    try {
      setError("");

      await createTask({
        title,
        description: "",
        priority,
      });

      setTitle("");
      setPriority("medium");
      await loadTasks(filter);
    } catch {
      setError("Failed to create task");
    }
  }

  async function handleDelete(id: number) {
    try {
      setError("");
      await deleteTask(id);
      await loadTasks(filter);
    } catch {
      setError("Failed to delete task");
    }
  }

  async function handleComplete(id: number) {
    try {
      setError("");
      await completeTask(id);
      await loadTasks(filter);
    } catch {
      setError("Failed to complete task");
    }
  }

  const filterButtonStyle = (value: string) => ({
    padding: "10px 16px",
    borderRadius: "999px",
    border: filter === value ? "1px solid #111827" : "1px solid #d1d5db",
    background: filter === value ? "#111827" : "#ffffff",
    color: filter === value ? "#ffffff" : "#111827",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
  });

  const getPriorityStyle = (value: string) => ({
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 700,
    background:
      value === "high"
        ? "#fee2e2"
        : value === "medium"
        ? "#fef3c7"
        : "#dcfce7",
    color:
      value === "high"
        ? "#991b1b"
        : value === "medium"
        ? "#92400e"
        : "#166534",
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f3f4f6, #e5e7eb)",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            TaskFlow
          </h1>
          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            Organize your work and keep track of what matters.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              outline: "none",
              fontSize: "15px",
              background: "#f9fafb",
              color: "#111827",
            }}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              background: "#f9fafb",
              color: "#111827",
              fontWeight: 600,
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={handleAddTask}
            style={{
              padding: "14px 20px",
              borderRadius: "14px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Add Task
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setFilter("all")} style={filterButtonStyle("all")}>
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            style={filterButtonStyle("pending")}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            style={filterButtonStyle("completed")}
          >
            Completed
          </button>
        </div>

        {loading && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#eff6ff",
              color: "#1d4ed8",
              marginBottom: "16px",
            }}
          >
            Loading tasks...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#fef2f2",
              color: "#dc2626",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div
            style={{
              padding: "28px",
              borderRadius: "18px",
              background: "#f9fafb",
              border: "1px dashed #d1d5db",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            No tasks found.
          </div>
        )}

        <div style={{ display: "grid", gap: "14px" }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: 1, minWidth: "220px" }}>
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "10px",
                    textDecoration:
                      task.status === "completed" ? "line-through" : "none",
                    opacity: task.status === "completed" ? 0.7 : 1,
                  }}
                >
                  {task.title}
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <span
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: 700,
                      background:
                        task.status === "completed" ? "#dcfce7" : "#fef3c7",
                      color:
                        task.status === "completed" ? "#166534" : "#92400e",
                    }}
                  >
                    {task.status}
                  </span>

                  <span style={getPriorityStyle(task.priority)}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    style={{
                      padding: "10px 14px",
                      borderRadius: "12px",
                      border: "none",
                      background: "#16a34a",
                      color: "#ffffff",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task.id)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#ef4444",
                    color: "#ffffff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}