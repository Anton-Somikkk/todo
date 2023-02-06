import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, FILTER_TODO } from '../types/todo'

let nextTodoId = 0

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    /* eslint-disable-next-line no-plusplus */
    id: ++nextTodoId,
    content,
  },
})

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
})

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
})

export const filterTodo = (content) => ({
  type: FILTER_TODO,
  payload: {
    /* eslint-disable-next-line no-plusplus */
    id: ++nextTodoId,
    content,
  },
})
