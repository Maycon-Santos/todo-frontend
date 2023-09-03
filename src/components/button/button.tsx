import classNames from 'classnames'
import styles from './button.module.css'

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset' | undefined
  color?: 'primary' | 'error'
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, type = 'button', color, className, ...rest } = props

  return (
    <button
      className={classNames(styles.button, {
        [styles[`color-${color}`]]: color !== undefined,
      })}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
