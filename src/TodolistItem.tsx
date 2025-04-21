import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (title: string) => void;
  changeIsDone: (taskId: string, isDone: boolean) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeIsDone,
}: Props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const createTaskHandler = () => {
    if (taskTitle.trim()) {
      createTask(taskTitle.trim());
      setTaskTitle("");
    } else {
      setError("Title is required!");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTaskHandler();
    }
  };

  const changeFilterTasksHandler = (filter: FilterValues) => {
    changeFilter(filter);
    setFilter(filter);
  };

  const onChangeHandler = (taskId: string, checked: boolean) => {
    changeIsDone(taskId, checked);
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
        {error && <div className="errorMessage">{error}</div>}
      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };

            return (
              <li key={task.id} className={task.isDone ? "isDone" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) =>
                    onChangeHandler(task.id, e.currentTarget.checked)
                  }
                />
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button
          title={"All"}
          className={filter === "all" ? "activeFilter" : ""}
          onClick={() => changeFilterTasksHandler("all")}
        />
        <Button
          title={"Active"}
          className={filter === "active" ? "activeFilter" : ""}
          onClick={() => changeFilterTasksHandler("active")}
        />
        <Button
          title={"Completed"}
          className={filter === "completed" ? "activeFilter" : ""}
          onClick={() => changeFilterTasksHandler("completed")}
        />
      </div>
    </div>
  );
};
