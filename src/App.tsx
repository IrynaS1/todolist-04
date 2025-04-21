import "./App.css";
import { useState } from "react";
import { v1 } from "uuid";
import { TodolistItem } from "./TodolistItem";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValues = "all" | "active" | "completed";

export const App = () => {
  const [filter, setFilter] = useState<FilterValues>("all");

  const [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(filteredTasks);
  };

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter);
  };

  const changeIsDone = (taskId: string, isDone: boolean) => {
    setTasks(
      tasks.map((el) => (el.id === taskId ? { ...el, isDone: isDone } : el))
    );

    /*  1й способ 

	 tasks.map((task) => {
      if (task.id === taskId) {
        task.isDone = isDone;
      }
      return task;
    });
	  setTasks([...tasks]);

	  2й способ

       const currentTask = tasks.find((el) => el.id === taskId);
    if (currentTask) {
      currentTask.isDone = isDone;
    }
    setTasks([...tasks]); */
  };

  let filteredTasks = tasks;
  if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.isDone);
  }
  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.isDone);
  }

  const createTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask={createTask}
        changeIsDone={changeIsDone}
      />
    </div>
  );
};
