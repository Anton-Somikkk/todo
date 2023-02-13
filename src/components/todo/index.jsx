// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useDispatch } from 'react-redux'
import cx from 'classnames'

import { toggleTodo, deleteTodo } from '../../store/actions/creators/todo'

import styles from './index.module.css'

export function Todo({ todo }) {
  const dispatch = useDispatch()

  const toggleTodoItem = () => {
    dispatch(toggleTodo(todo.id))
  }

  const deleteTodoItem = () => {
    dispatch(deleteTodo(todo.id))
  }

  return (
    <li className={styles.item}>
      {todo.completed ? '👌' : '👋'}{' '}
      <span
        onClick={toggleTodoItem}
        role="presentation"
        className={cx({
          [styles.completed]: todo.completed,
        })}
      >
        {todo.content}
      </span>
      <span> </span>
      <span
        className={styles.deleteItem}
        onClick={deleteTodoItem}
        role="presentation"
      >
        &#10006;
      </span>
    </li>
  )
}
