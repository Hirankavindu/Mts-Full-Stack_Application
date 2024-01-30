import axios, { AxiosResponse } from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/tasks";

interface Task {
  id: string;
  topic: string;
  description: string;
  date: string;
  completion: boolean;
}

export const listTask = async (): Promise<AxiosResponse<Task[]>> => {
  try {
    const response = await axios.get<Task[]>(REST_API_BASE_URL);
    return response;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const updateTaskCompletion = async (
  taskId: string,
  isCompleted: boolean
): Promise<AxiosResponse<Task>> => {
  const url = `${REST_API_BASE_URL}/${taskId}`;

  try {
    const existingTaskResponse = await axios.get<Task>(url);
    const existingTask: Task = existingTaskResponse.data;

    // Create a partial update object with only the changed values
    const partialUpdate = {
      completion: isCompleted,
      // Add other properties that might change
    };

    // Merge the partial update with the existing task
    const updatedTaskData = { ...existingTask, ...partialUpdate };

    const response = await axios.put<Task>(url, updatedTaskData);

    if (response.data) {
      const updatedTask = response.data;
      return updatedTask;
    } else {
      throw new Error("Failed to update task completion status");
    }
  } catch (error) {
    console.error("Error updating task completion:", error);
    throw new Error("Failed to update task completion status");
  }
};
