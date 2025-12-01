import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { insertUserSchema } from '@shared/schema'

export async function GET() {
  try {
    // This would typically get all users or implement pagination
    return NextResponse.json({ message: 'Users API endpoint' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertUserSchema.parse(body)
    
    const user = await storage.createUser(validatedData)
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    )
  }
}