'use client'

import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useApi } from '../api-provider/api-provider'
import Button from '../button/button'
import styles from './header.module.css'
import Spacing from '../spacing/spacing'
import Container from '../container/container'

const Header: React.FC = () => {
  const { user, fetchUserData } = useApi()
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <header className={styles.wrapper}>
      <Container className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleFragment}>TO</span>
          <span className={styles.titleFragment}>DO</span>
        </h1>
        {user && (
          <div className={styles.userData}>
            <span className={styles.userName}>{user.username}</span>
            <Spacing horizontal={3} />
            <Button
              type="button"
              onClick={() => {
                Cookies.remove('token')
                router.replace('/')
              }}
            >
              Sair
            </Button>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
