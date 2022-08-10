import React, { useMemo } from 'react'
import cls from 'clsx'
import { createNamespace } from '../../utils'

type SkuRowPropItemProps = {
  multiple?: boolean
  skuValue: Record<any, any>
  selectedProp: Record<any, any>
  skuKeyStr: string
  onSkuPropSelected?: (params: any) => void
}

const [bem] = createNamespace('sku-row')

const SkuRowPropItem: React.FC<SkuRowPropItemProps> = props => {
  const choosed = useMemo(() => {
    const { selectedProp, skuKeyStr, skuValue } = props

    if (selectedProp && selectedProp[skuKeyStr]) {
      return selectedProp[skuKeyStr].indexOf(skuValue.id) > -1
    }

    return false
  }, [
    JSON.stringify(props.selectedProp),
    JSON.stringify(props.skuValue),
    props.skuKeyStr,
  ])

  const onSelect = () => {
    props.onSkuPropSelected({
      ...props.skuValue,
      skuKeyStr: props.skuKeyStr,
      multiple: props.multiple,
    })
  }

  return (
    <span
      className={cls(
        bem('item', {
          active: choosed,
        })
      )}
      onClick={onSelect}
    >
      <span className={cls(bem('item-name'))}>{props.skuValue?.name}</span>
    </span>
  )
}

export default SkuRowPropItem
