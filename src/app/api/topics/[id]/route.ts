import connectMongoDB from '@/libs/mongodb'
import Topic from '@/models/topic'
import { NextRequest, NextResponse } from 'next/server'

// ✅ interface 버전 (당신 스타일)
interface ParamsPromise {
  params: Promise<{ id: string }>
}

// ✅ PUT /api/topics/[id]
export async function PUT(request: NextRequest, context: ParamsPromise) {
  try {
    const { id } = await context.params
    const { newTitle: title, newDescription: description } =
      await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title과 Description 모두 필요합니다.' },
        { status: 400 }
      )
    }

    await connectMongoDB()
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    )

    if (!updatedTopic) {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 })
    }

    return NextResponse.json(
      { message: 'Topic updated', topic: updatedTopic },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// ✅ GET /api/topics/[id]
export async function GET(request: NextRequest, context: ParamsPromise) {
  try {
    const { id } = await context.params
    await connectMongoDB()

    const topic = await Topic.findOne({ _id: id })
    if (!topic) {
      return NextResponse.json(
        { message: 'Topic이 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ topic }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/topics/[id]:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
