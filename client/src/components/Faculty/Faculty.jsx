import React from 'react'
import styles from './Faculty.module.css'

const Faculty = () => {
  const container = styles.container + " flex flex-col gap-8 p-8";
  return (
    <div className={container}>
      Faculty Home Page
    </div>
  )
}

export default Faculty