"use client";
import Image from "next/image";
import ListTaskComponent from "./ListTaskComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskComponent from "./screens/TaskComponent";

export default function Home() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path="/" element={<ListTaskComponent />}></Route>
          {/* //http://localhost:3000/tasks */}
          <Route path="/tasks" element={ <ListTaskComponent />}></Route>
          {/* //http://localhost:3000/add-task */}
          <Route path="/add-task" element={ <TaskComponent />}></Route>
        </Routes>
        <ListTaskComponent />
      </BrowserRouter>
    </>
  );
}
