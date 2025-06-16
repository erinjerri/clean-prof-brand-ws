'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useToast } from '@radix-ui/react-toast'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded! You can now{' '}
    <a target="_blank" href="/">
      visit your website
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const { toast } = useToast()

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast({
          title: 'Info',
          description: 'Database already seeded.',
        })
        return
      }
      if (loading) {
        toast({
          title: 'Info',
          description: 'Seeding already in progress.',
        })
        return
      }
      if (error) {
        toast({
          title: 'Error',
          description: 'An error occurred, please refresh and try again.',
          variant: 'destructive',
        })
        return
      }

      setLoading(true)

      try {
        const result = await fetch('/next/seed', { method: 'POST', credentials: 'include' })
        if (result.ok) {
          setSeeded(true)
          toast({
            title: 'Success',
            description: <SuccessMessage />,
          })
        } else {
          throw new Error('An error occurred while seeding.')
        }
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
        toast({
          title: 'Error',
          description: 'An error occurred while seeding.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded, error, toast],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (seeded) message = ' (done!)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        Seed your database
      </button>
      {message}
    </Fragment>
  )
}
