'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import styles from './content-editable.module.css'
import classNames from 'classnames'

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  value?: string
}

const ContentEditable: React.FC<TextareaProps> = (props) => {
  const { value = '', className, onChange, onBlur, onFocus, ...rest } = props
  const [isFocused, setIsFocused] = useState(false)
  const fakeTextareaRef = useRef<HTMLPreElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const mirrorContent = () => {
    if (!fakeTextareaRef.current || !textAreaRef.current) {
      return
    }

    fakeTextareaRef.current.style.width = textAreaRef.current.clientWidth + 'px'
    fakeTextareaRef.current.innerText = textAreaRef.current.value
    fakeTextareaRef.current.innerHTML += '<br />'
    textAreaRef.current.style.height =
      fakeTextareaRef.current.clientHeight + 'px'
  }

  useLayoutEffect(() => {
    if (!fakeTextareaRef.current || !textAreaRef.current) {
      return
    }

    const textAreaComputedStyle = textAreaRef.current.computedStyleMap()

    fakeTextareaRef.current.style.fontSize =
      textAreaComputedStyle.get('font-size')?.toString() || ''

    fakeTextareaRef.current.style.lineHeight =
      textAreaComputedStyle.get('line-height')?.toString() || ''

    fakeTextareaRef.current.style.fontFamily =
      textAreaComputedStyle.get('font-family')?.toString() || ''

    fakeTextareaRef.current.style.paddingRight =
      textAreaComputedStyle.get('padding-right')?.toString() || ''

    fakeTextareaRef.current.style.paddingLeft =
      textAreaComputedStyle.get('padding-left')?.toString() || ''

    mirrorContent()

    window.addEventListener('resize', mirrorContent)

    return () => {
      window.removeEventListener('resize', mirrorContent)
    }
  })

  return (
    <>
      <pre className={styles.fakeTextarea} ref={fakeTextareaRef}>
        {value || ' '}
        <br />
      </pre>
      <textarea
        className={classNames(className, styles.textarea)}
        ref={textAreaRef}
        value={onChange ? value : undefined}
        onChange={(e) => {
          mirrorContent()
          if (onChange) onChange(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)
          if (onFocus) onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          if (onBlur) onBlur(e)
        }}
        spellCheck={isFocused}
        {...rest}
      />
    </>
  )
}

export default ContentEditable
