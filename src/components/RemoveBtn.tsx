'use client'
import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from 'react-icons/hi'
export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter()
  async function removeTopic() {
    const confirmed = confirm(`Are you sure to delete the topic of ${id}? `)
    if (confirmed) {
      const res = await fetch(`/api/topics?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        router.refresh()
        router.push('/')
      }
    }
  }
  return (
    <button className="text-red-400" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  )
}
