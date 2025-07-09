import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import NoTasksFound from "./NoTasksFound";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native L",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // Add Task
  function handleAddEditTask(newTask, isAdd) {
    // console.log("Task Added Successfully!", newTask, isAdd);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks?.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    handleCloseModal();
  }

  // Handle Edit Task
  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  // Handle Favorite
  function handleFavorite(taskId) {
    setTasks(
      tasks?.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task?.isFavorite };
        } else {
          return task;
        }
      })
    );
  }

  // Handle Search
  function handleSearch(searchTerm) {
    // console.log(searchTerm);
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...filtered]);
  }

  // Delete Task
  function handleDeleteTask(taskId) {
    const tasksAfterDelete = tasks?.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  }

  // Delete All Task
  function handleDeleteAllTask() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  // Modal Close
  function handleCloseModal() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  return (
    <section className="mb-20" id="tasks">
      {/* Add and Edit Task Modal */}
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseModal={handleCloseModal}
          taskToUpdate={taskToUpdate}
        />
      )}
      {/* End of Add and Edit Task Modal */}

      <div className="container">
        {/* Search Box */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        {/* Ends of Search Box */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          {/* Task Actions */}
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllTask={handleDeleteAllTask}
          />
          {/* End of Task Actions */}

          {/* Tasks List */}
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onFavorite={handleFavorite}
              onDelete={handleDeleteTask}
            />
          ) : (
            <NoTasksFound />
          )}
          {/* End of Tasks List */}
        </div>
      </div>
    </section>
  );
}
