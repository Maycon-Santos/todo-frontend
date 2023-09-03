import React from 'react'
import styles from './header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>
        <span className={styles.titleFragment}>TO</span>
        <span className={styles.titleFragment}>DO</span>
      </h1>
    </header>
  )
}

export default Header
