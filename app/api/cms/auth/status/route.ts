import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = cookieStore.get('cms-session');
  
  return NextResponse.json({
    isAuthenticated: !!session,
    user: session ? { username: 'admin' } : null,
  });
}
