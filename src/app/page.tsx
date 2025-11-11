import TopicsList from '@/components/TopicsList'
import React from 'react'

export default function HomePeage() {
  return (
    <div>
      <h1 className="text-3x1 font-bold">WebDev Topics</h1>
      <p className="mb-4">MongoDB CRUD example</p>
      <TopicsList />
    </div>
  )
}
