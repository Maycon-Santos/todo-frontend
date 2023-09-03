import classNames from 'classnames'
import styles from './spacing.module.css'

type sizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type SpacerProps = {
  horizontal?: sizes
  vertical?: sizes
}

const Spacing: React.FC<SpacerProps> = (props) => {
  const { horizontal, vertical } = props

  return (
    <div
      className={classNames({
        [styles[`spacing-horizontal-${horizontal}`]]: horizontal !== undefined,
        [styles[`spacing-vertical-${vertical}`]]: vertical !== undefined,
      })}
    />
  )
}

export default Spacing
