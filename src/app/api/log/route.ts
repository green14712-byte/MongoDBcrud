import connectMongoDB from '@/libs/mongodb'
import Log from '@/models/log'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    await connectMongoDB()
    await Log.create({ email })
    return NextResponse.json({ message: '로그인 이벤트등록' }, { status: 201 })
  } catch (error) {
    console.error('로그인등록에러:', error)
  }
}
