export const api = {
  getAllTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
  },
  getTask(id) {

  },
  createTask(taskData) {
    localStorage.setItem('tasks', JSON.stringify([...this.getAllTasks(), taskData]))
  },
  editTask(newData) {
    const tasks = this.getAllTasks()
    const idx = tasks.findIndex((task => task.id === newData.id))
    tasks[idx] = {
      ...tasks[idx],
      ...newData
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },
  deleteTask(id) {

  }
}
