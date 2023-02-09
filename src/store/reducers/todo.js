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
      // const index = state.allIds.indexOf(id)

      const byIdsCompleted = Object.fromEntries(
        Object.entries(state.byIds).filter(
          (item) => item[1].completed
        )
      )

      const byIdsUnCompleted = Object.fromEntries(
        Object.entries(state.byIds).filter(
          (item) => item[1].completed === 'false'
        )
      )
      let byIdsComplete = {}

      if (action.payload.content === 'true') {
        byIdsComplete = { ...byIdsCompleted }
        return byIdsComplete
      }
      if (action.payload.content === 'false') {
        byIdsComplete = { ...byIdsUnCompleted }
        return byIdsComplete
      }
      if (action.payload.content === 'all') {
        byIdsComplete = { ...state.byIds }
        return byIdsComplete
      }

      const allIdsComplete = Object.entries(byIdsComplete).map(
        (element) => element[0]
      )

      console.log('1', allIdsComplete)
      console.log('2', byIdsComplete)
      console.log('3', action.payload.content)

      return {
        allIds: [...allIdsComplete],
        byIds: {
          ...byIdsComplete,
        },
      }
    }

    default:
      return state
  }
}
export default todoReducer
