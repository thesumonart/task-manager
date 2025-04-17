import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditModal from "./assets/components/EditModal";

const App = () => {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      text: "Buy groceries",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Finish writing report",
      isCompleted: true,
    },
    {
      id: 3,
      text: "Schedule meeting with team",
      isCompleted: false,
    },
    {
      id: 4,
      text: "Walk the dog",
      isCompleted: true,
    },
    {
      id: 5,
      text: "Clean the house",
      isCompleted: false,
    },
    {
      id: 6,
      text: "Reply to client emails",
      isCompleted: false,
    },
    {
      id: 7,
      text: "Read 30 pages of the new book",
      isCompleted: false,
    },
  ]);
  const [taskInputText, setTaskInputText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleTaskAdd = () => {
    const newTask = {
      id: Date.now(),
      text: taskInputText,
      isCompleted: false,
    };
    if (taskInputText.trim() === "") return;
    setTaskList((prevTasks) => [...prevTasks, newTask]);
    resetTaskInputText();
  };

  const handleDelete = (id) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleCompleted = (id) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const resetTaskInputText = () => {
    setTaskInputText("");
  };

  const handleEdit = (taskId) => {
    const editingTask = taskList.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditingText(editingTask.text);
    setIsEditModalOpen(true);
  };

  const isEditingTextNull = editingText.trim() === "";

  const saveEdit = () => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingText } : task
      )
    );
    setIsEditModalOpen(false);
    setEditingTaskId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingTaskId(null);
    setEditingText("");
  };

  return (
    <div className="px-8 sm:px-0 sm:max-w-2/3 w-full mx-auto">
      <h1 className="text-center text-4xl sm:text-5xl font-bold mt-8">
        Task Manager
      </h1>
      <span className="border-b-2 border-dashed border-slate-300 h-px sm:max-w-2/4 mx-auto w-full flex my-8"></span>

      <div className="flex items-center w-full lg:w-2/4 mx-auto gap-4">
        <Input
          className="h-10 font-medium font-mono border-gray-300"
          type="text"
          placeholder="Enter task name"
          value={taskInputText}
          onChange={(e) => {
            setTaskInputText(e.target.value);
          }}
        />
        <Button
          variant="outline"
          className="cursor-pointer h-10 font-medium font-mono border-gray-300 flex items-center justify-center"
          onClick={handleTaskAdd}
        >
          Add task
        </Button>
      </div>

      <div className="flex justify-center mt-5">
        <ul className="flex flex-col gap-2 w-full lg:w-2/4 h-[calc(100vh-224px)] p-2 overflow-y-auto scrollbar-hidden">
          {taskList.map((task) => {
            return (
              <li
                key={`task-${task.id}`}
                className={`flex flex-col sm:flex-row justify-between  sm:items-center gap-4 px-4 py-3 rounded-md shadow-md transition border border-slate-100 ${
                  task.isCompleted
                    ? "bg-slate-200 text-slate-400 line-through"
                    : "bg-white text-gray-800 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.isCompleted}
                    onCheckedChange={() => toggleCompleted(task.id)}
                    className="border-blue-200 data-[state=checked]:bg-green-600 data-[state=checked]:text-primary-foreground data-[state=checked]:border-green-600 cursor-pointer"
                  />

                  <p className="text-base">{task.text}</p>
                </div>
                <div className="action-btns flex gap-2 justify-start">
                  <Button
                    className="border border-blue-400 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium cursor-pointer px-2 py-1 rounded shadow-sm transition"
                    title="Edit"
                    onClick={() => handleEdit(task.id)}
                  >
                    <FaRegEdit />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger
                      className="border border-red-400 bg-red-100 text-red-700 hover:bg-red-200 font-medium cursor-pointer px-2 py-1 rounded shadow-sm transition "
                      title="Delete"
                    >
                      <FaTrashCan />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Deleting this task will
                          permanently remove it from your list and our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600 text-red-100 cursor-pointer"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    className={`border px-2 py-1 rounded shadow-sm font-medium cursor-pointer transition ${
                      task.isCompleted
                        ? "border-green-400 bg-green-100 text-green-700 hover:bg-green-200"
                        : "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleCompleted(task.id)}
                    title={
                      task.isCompleted
                        ? "Mark as Incomplete"
                        : "Mark as Complete"
                    }
                  >
                    {task.isCompleted ? (
                      <IoCheckmarkCircle />
                    ) : (
                      <IoCheckmarkCircleOutline />
                    )}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {isEditModalOpen && (
        <EditModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          editingText={editingText}
          setEditingText={setEditingText}
          handleCancelEdit={handleCancelEdit}
          saveEdit={saveEdit}
          isEditingTextNull={isEditingTextNull}
        />
      )}
    </div>
  );
};

export default App;
