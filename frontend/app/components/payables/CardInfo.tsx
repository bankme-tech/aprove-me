import React from 'react'

export default function CardInfo({ label, value }: { label: string, value: string | number }) {
  return (
    <p className='text-sm sm:text-lg md:text-xl'><span className='font-semibold'>{label}:</span> {value}</p>
  )
}
