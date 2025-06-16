'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { TextFieldClientProps } from 'payload'
import { cn } from '@/utilities/ui'

import { formatSlug } from './formatSlug'
import './index.scss'

type SlugComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const SlugComponent: React.FC<SlugComponentProps> = ({
  field,
  fieldToUse,
  checkboxFieldPath: checkboxFieldPathFromProps,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label } = field
  const [value, setValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [targetFieldValue, setTargetFieldValue] = useState('')

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)
        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()
      setCheckboxValue(!checkboxValue)
    },
    [checkboxValue],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <label htmlFor={`field-${path}`} className="field-label">
          {typeof label === 'string' ? label : label?.default || ''}
        </label>

        <button
          className={cn(
            'lock-button',
            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
          )}
          onClick={handleLock}
        >
          {checkboxValue ? 'Unlock' : 'Lock'}
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        id={`field-${path}`}
        name={path || field.name}
        readOnly={Boolean(readOnly)}
        className={cn(
          'w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700',
          'bg-white dark:bg-gray-900',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      />
    </div>
  )
}
