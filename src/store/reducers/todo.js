import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  FILTER_TODO,
} from '../actions/types/todo'

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
      const { id } = action.payload
      const index = state.allIds.indexOf(id)

      return {
        allIds: [
          ...state.allIds.slice(0, index),
          ...state.allIds.slice(index + 1),
        ],

        byIds: {
          ...Object.fromEntries(Object.entries(state.byIds).slice(0, index)),
          ...Object.fromEntries(Object.entries(state.byIds).slice(index + 1)),
        },
      }
    }

    case FILTER_TODO: {
      // const { id } = action.payload

      // const byIdsCompleted = 
      //   Object.entries(state.byIds).filter((byIdsComplete) =>
      //     byIdsComplete[id].completed !== true) 
        
      
      console.log(state.byIds[1]?.completed || false)
      return {
        ...state
        
      }
    }

    default:
      return state
  }
}
export default todoReducer
