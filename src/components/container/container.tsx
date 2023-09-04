import { PropsWithChildren } from 'react'
import classNames from 'classnames'
import styles from './container.module.css'

type ContainerProps = {
  component?: string
  className?: string
}

const Container: React.FC<PropsWithChildren<ContainerProps>> = (props) => {
  const { component, className, children } = props

  const Component = component || ('div' as any)

  return (
    <Component className={classNames(styles.container, className)}>
      {children}
    </Component>
  )
}

export default Container
