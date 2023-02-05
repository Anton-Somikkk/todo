// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo, filterTodo } from '../../store/actions/creators/todo'

import styles from './index.module.css'

export function AddTodo() {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const onInputChange = (evt) => {
    setValue(evt.target.value)
  }

  const handleAddTodo = () => {
    dispatch(addTodo(value))
    setValue('')
  }

  const handleFilterTodo = () => {
    dispatch(filterTodo(value))
    setValue('')
  }

  return (
    <div>
      <input type="text" value={value} onChange={onInputChange} />
      <button
        type="button"
        className={styles.addButton}
        onClick={handleAddTodo}
      >
        Add todo
      </button>
      <select onChange={handleFilterTodo}>
        <option value=''>Выберите</option>
        <option value='completed'>Выполненные</option>
        <option value='not_completed'>Не выполненные</option>
      </select>
    </div>
  )
}
