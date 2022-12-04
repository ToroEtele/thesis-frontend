import React from 'react'

const styles = {
  faculty: 'h-[100%] w-[100%] flex flex-row',
  faculty__panel: 'h-[100%] w-[33%]',
  panel__header: 'h-[10%] w-[100%] flex flex-row justify-center'
}

const Faculty = () => {
  return (
    <div className={styles.faculty}>
      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}>
          <h1>Get a faculty</h1>
        </div>
      </div>
      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}>
          <h1>Add a new Faculty</h1>
        </div>
      </div>
      <div className={styles.faculty__panel}>
        <div className={styles.panel__header}></div>
      </div>
    </div>
  )
}

export default Faculty