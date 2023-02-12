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
      const byIds = {
        ...state.byIds,

        [id]: {
          content,
          complete: false,
        },
      }

      localStorage.setItem('stateByIds', JSON.stringify(byIds))

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

      const byIds = {
        ...state.byIds,
        [id]: { ...targetTodo, completed: !targetTodo.completed },
      }
      localStorage.setItem('stateByIds', JSON.stringify(byIds))

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
      const byIds = {
        ...Object.fromEntries(Object.entries(state.byIds).slice(0, index)),
        ...Object.fromEntries(Object.entries(state.byIds).slice(index + 1)),
      }
      localStorage.setItem('stateByIds', JSON.stringify(byIds))

      return {
        allIds: [
          ...state.allIds.slice(0, index),
          ...state.allIds.slice(index + 1),
        ],

        byIds: {
          ...byIds,
        },
      }
    }

    case FILTER_TODO: {
      const byIdsSave = JSON.parse(localStorage.getItem('stateByIds'))
      const byIdsCompleted = Object.fromEntries(
        Object.entries(byIdsSave).filter((item) => item[1].completed)
      )

      const byIdsUnCompleted = Object.fromEntries(
        Object.entries(byIdsSave).filter((item) => !item[1].completed)
      )

      if (action.payload.content === 'true') {
        localStorage.setItem('byIdsComplete', JSON.stringify(byIdsCompleted))
      }
      if (action.payload.content === 'false' || !action.payload.content) {
        localStorage.setItem('byIdsComplete', JSON.stringify(byIdsUnCompleted))
      }
      if (action.payload.content === 'all') {
        localStorage.setItem(
          'byIdsComplete',
          JSON.stringify({ ...byIdsCompleted, ...byIdsUnCompleted })
        )
      }
      const byIdsComplete = JSON.parse(localStorage.getItem('byIdsComplete'))
      const allIdsComplete = Object.entries(byIdsComplete).map(
        (element) => element[0]
      )

      return {
        ...state,
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
