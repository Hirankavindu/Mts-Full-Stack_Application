// Import necessary modules
"use client";
// Import necessary modules
import { useEffect, useState } from "react";
import { listTask, updateTaskCompletion } from "@/app/screens/TaskServices";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate, useNavigation } from "react-router-dom";

// Define TypeScript interface for task
interface Task {
  id: string;
  topic: string;
  description: string;
  date: string;
  completion: boolean;
}

const ListTaskComponent: React.FC = () => {
  // State to store tasks, loading state, and error state
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigator = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to mark a task as completed or not completed
  const handleMarkCompletion = async (
    taskId: string,
    completion: boolean
  ): Promise<void> => {
    try {
      await updateTaskCompletion(taskId, completion);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completion } : task
        )
      );
    } catch (error) {
      console.error(
        `Error marking task as ${completion ? "completed" : "not completed"}:`,
        error
      );
      setError(
        `Failed to mark task as ${
          completion ? "completed" : "not completed"
        }. Please try again.`
      );
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    // Fetch tasks on component mount
    listTask()
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again.");
        setLoading(false);
      });
  }, []); // Ensure the dependency array is empty to run the effect only once


  function addNewTask(){
        navigator("/add-task")
  }
  // JSX rendering
  return (
    <div className="bg-[#090B17] p-5">
      <div className="grid grid-cols-2 gap-10">
        <div className="pt-5 pb-10">
          <div className="text-[#D8D6D6] font-bold text-3xl">All Tasks</div>
          <div className="w-16 h-2 bg-[#CEF45B]"></div>
        </div>
        <div className="pt-5 pb-10 flex items-center">
          <button className="bg-[#CEF45B] px-5 py-2 rounded-lg font-semibold text-lg ml-3" onClick={addNewTask}>
            Add new task
          </button>
        </div>
      </div>

      <div>
        {/* Loading state */}
        {loading && <div className="text-white">Loading tasks...</div>}
        {/* Error state */}
        {error && <div className="text-red-500">{error}</div>}
        {/* Display tasks */}
        {!loading &&
          !error &&
          tasks.map((task) => (
            <div
              key={task.id}
              className="mb-5 p-5 bg-[#06070F] rounded-lg border-[#CEF45B]/75 border-2"
            >
              <div className="text-[#C1C1C1] font-semibold text-xl mb-2">
                {task.topic}
              </div>
              <div className="w-fit pb-2">
                <div className="text-[#C1C1C1] font-medium text-sm mb-4">
                  {task.description}
                </div>
              </div>

              {/* Date and completion */}
              <div className="grid grid-cols-2 gap-24 mb-2">
                <div className="text-[#C1C1C1] font-semibold text-base">
                  {task.date}
                </div>
                <div
                  className={
                    task.completion
                      ? "text-[#CEF45B] text-base font-semibold"
                      : "text-[#F75757] text-base font-semibold"
                  }
                >
                  {task.completion ? "Completed" : "Not Completed"}
                </div>
              </div>
              <div className="flex flex-row pb-2">
                <div className="pr-2">
                  <TrashIcon className="w-7 h-7 text-gray-400" />
                </div>
                <div>
                  <PencilSquareIcon className="w-7 h-7 text-gray-400" />
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => handleMarkCompletion(task.id, true)}
                  className="bg-[#CEF45B] text-[#010414] font-bold text-base px-2 py-2 rounded"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleMarkCompletion(task.id, false)}
                  className="bg-[#F75757] text-base font-bold text-white px-2 py-2 rounded"
                >
                  Mark as Not Completed
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListTaskComponent;
