import Button, { ButtonProps } from '../button/button'
import styles from './dialog-box.module.css'

type DialogBoxProps = {
  title: string
  message: string
  color?: ButtonProps['color']
  onConfirm: () => void
  onCancel: () => void
}

const DialogBox: React.FC<DialogBoxProps> = (props) => {
  const { title, message, color, onConfirm, onCancel } = props

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.backdrop}
        onClick={(e) => {
          e.stopPropagation()
          onCancel()
        }}
      />
      <div className={styles.containerWrapper}>
        <div
          className={styles.container}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <span className={styles.title}>{title}</span>
          <span className={styles.message}>{message}</span>
          <div className={styles.buttonList}>
            <div className={styles.buttonItem}>
              <Button onClick={onCancel} autoFocus>
                Cancelar
              </Button>
            </div>
            <div className={styles.buttonItem}>
              <Button color={color} onClick={onConfirm}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DialogBox
