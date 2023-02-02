import { ADD_TODO, TOGGLE_TODO, DELETE_TODO } from '../actions/types/todo'

const initialState = {
  allIds: [],
  byIds: {},
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload

      return {
        ...state,

        allIds: [...state.allIds, id],

        byIds: {
          ...state.byIds,

          [id]: {
            content,
            complete: false,
          },
        },
      }
    }

    case TOGGLE_TODO: {
      const { id } = action.payload

      const targetTodo = state.byIds[id]

      return {
        ...state,

        byIds: {
          ...state.byIds,
          [id]: {
            ...targetTodo,
            completed: !targetTodo.completed,
          },
        },
      }
    }

    case DELETE_TODO: {
      const { id, content } = action.payload
      // const targetTodo = state.byIds[id]
      const index = state.allIds.indexOf(id)
      // const allIds = [
      //   ...state.allIds.slice(0, index),
      //   ...state.allIds.slice(index),
      // ]
      
      return {
        allIds: [...state.allIds.slice(0, index), ...state.allIds.slice(index + 1)],

        byIds: {
          ...state.byIds,

          [id]: {
            content,
          },
        },
      }
    }
    default:
      return state
  }
}
export default todoReducer
