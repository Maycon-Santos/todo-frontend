import classNames from 'classnames'
import styles from './checkbox.module.css'

type CheckboxProps = {
  onChange: (checked: boolean) => void
  checked: boolean
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { onChange, checked } = props

  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        onChange={() => {
          if (onChange) {
            onChange(!checked)
          }
        }}
        className={styles.input}
        checked={checked}
      />
      <div
        className={styles.checkbox}
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            if (onChange) {
              onChange(!checked)
            }
          }
        }}
      >
        <i className={classNames('symbol', styles.checkIcon)}>check</i>
      </div>
    </label>
  )
}

export default Checkbox
