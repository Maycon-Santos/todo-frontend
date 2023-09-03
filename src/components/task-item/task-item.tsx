'use client'

import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Checkbox from '../checkbox/checkbox'
import ContentEditable from '../content-editable/content-editable'
import CheckList, { CheckBox } from '../check-list/check-list'
import DialogBox from '../dialog-box/dialog-box'
import styles from './task-item.module.css'

type CheckItem = {
  id: string
  label: string
  done: boolean
}

interface TaskItemProps {
  title: string
  description: string
  isDone: boolean
  checkList?: CheckItem[]
  onOpen: () => void
  isOpen: boolean
  onBlur: () => void
  onEdit: (key: string, value: any) => void
  onDelete: () => void
}

const TaskItem: React.FC<TaskItemProps> = (props) => {
  const {
    title,
    description,
    isDone,
    checkList,
    onEdit,
    onOpen,
    onDelete,
    isOpen,
    onBlur,
  } = props
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [dialogBoxToDeleteIsOpen, setDialogBoxToDeleteIsOpen] = useState(false)

  const shortDescription =
    description.length > 100
      ? `${description.substring(0, 100)}...`
      : description

  const checkListItems: CheckBox[] =
    checkList?.map(({ id, done, label }) => ({
      id,
      label,
      checked: done,
    })) || []

  useEffect(() => {
    window.addEventListener('click', onBlur)

    return () => {
      window.removeEventListener('click', onBlur)
    }
  }, [])

  return (
    <>
      {dialogBoxToDeleteIsOpen && (
        <DialogBox
          title="Cuidado!"
          message="Tem certeza que deseja deletar esse item?"
          onConfirm={() => {
            onDelete()
          }}
          onCancel={() => {
            setDialogBoxToDeleteIsOpen(false)
          }}
          color="error"
        />
      )}
      <div
        className={classNames(styles.wrapper, {
          [styles.isDone]: isDone && !isOpen,
          [styles.isOpen]: isOpen,
        })}
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && e.currentTarget === document.activeElement) {
            if (!isOpen) onOpen()
          }
        }}
        ref={wrapperRef}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.checkBoxWrapper}>
          <Checkbox
            checked={isDone}
            onChange={(checked) => {
              if (onEdit) onEdit('done', checked)
            }}
          />
        </div>
        <div
          className={styles.contentWrapper}
          onClick={() => {
            if (!isOpen) onOpen()
          }}
        >
          <ContentEditable
            className={styles.title}
            value={title}
            disabled={!isOpen}
            placeholder="Sem título"
            onChange={(e) => {
              const value = e.currentTarget.value

              if (onEdit) onEdit('title', value)
            }}
          />
          {!isOpen && Boolean(shortDescription) && (
            <span className={styles.shortDescription}>{shortDescription}</span>
          )}
          {isOpen && (
            <ContentEditable
              className={styles.description}
              value={description}
              placeholder="Sem descrição"
              onChange={(e) => {
                const value = e.currentTarget.value

                if (onEdit) onEdit('description', value)
              }}
            />
          )}
          {isOpen && (
            <div className={styles.checkList}>
              <CheckList
                items={checkListItems}
                onEdit={(checkItems) => {
                  if (onEdit)
                    onEdit(
                      'checklist',
                      checkItems.map(({ id, label, checked }) => ({
                        id,
                        label,
                        done: checked,
                      })),
                    )
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.deleteIconWrapper}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => setDialogBoxToDeleteIsOpen(true)}
          >
            <i className={classNames('symbol', styles.deleteIcon)}>delete</i>
          </button>
        </div>
      </div>
    </>
  )
}

export default TaskItem
