import classNames from 'classnames'
import styles from './input.module.css'

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  const { className, ...rest } = props

  return <input className={classNames(styles.input, className)} {...rest} />
}

export default Input
