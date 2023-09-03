import { v4 as uuidv4 } from 'uuid'
import ContentEditable from '../content-editable/content-editable'
import styles from './check-list.module.css'
import classNames from 'classnames'

export type CheckBox = {
  id: string
  checked: boolean
  label: string
}

type CheckListProps = {
  items: CheckBox[]
  onEdit: (checkList: CheckBox[]) => void
}

const CheckList: React.FC<CheckListProps> = (props) => {
  const { items, onEdit } = props

  const addItem: React.EventHandler<any> = (e) => {
    if (e.currentTarget.value.trim() === '') {
      return
    }

    const newItems = items.map(({ id, label, checked }) => ({
      id,
      label,
      checked,
    }))

    newItems.push({
      id: uuidv4(),
      label: e.currentTarget.value.trim(),
      checked: false,
    })

    e.currentTarget.value = ''

    onEdit(newItems)
  }

  const removeItem = (idToRemove: string) => {
    const newItems = items
      .map(({ id, label, checked }) => ({
        id,
        label,
        checked,
      }))
      .filter(({ id }) => id !== idToRemove)

    onEdit(newItems)
  }

  return (
    <div className={styles.list}>
      {items.map(({ id, checked, label }) => (
        <div className={styles.item} key={id}>
          <input
            type="checkbox"
            checked={checked}
            className={styles.checkbox}
            id={id}
            onChange={() => {
              const newItems = items.map(
                ({
                  id: newItemID,
                  label: newItemLabel,
                  checked: newItemChecked,
                }) => ({
                  id: newItemID,
                  label: newItemLabel,
                  checked: newItemID === id ? !newItemChecked : newItemChecked,
                }),
              )

              onEdit(newItems)
            }}
          />
          <label className={styles.fakeCheckbox} tabIndex={0} htmlFor={id}>
            <i className={classNames('symbol', styles.checkIcon)}>check</i>
          </label>
          <ContentEditable
            className={styles.label}
            value={label}
            onChange={(e) => {
              const newItems = items.map(
                ({ id: newItemID, label, checked: newItemChecked }) => ({
                  id: newItemID,
                  label: newItemID === id ? e.currentTarget.value : label,
                  checked: newItemChecked,
                }),
              )

              onEdit(newItems)
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              e.preventDefault()
              if (e.currentTarget.value.trim() === '') {
                console.log('aqui')
                removeItem(id)
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.value.trim() === '') {
                removeItem(id)
              }
            }}
          />
        </div>
      ))}
      <div className={styles.item}>
        <input type="checkbox" className={styles.checkbox} />
        <div className={styles.fakeCheckbox}>
          <i className={classNames('symbol', styles.checkIcon)}>check</i>
        </div>
        <ContentEditable
          className={styles.label}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            e.preventDefault()
            addItem(e)
          }}
          onBlur={addItem}
          placeholder="Adicione um novo item"
        />
      </div>
    </div>
  )
}

export default CheckList
