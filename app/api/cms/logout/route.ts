import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ success: true, message: 'Logged out' });
  res.cookies.delete('cms-session');
  return res;
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'Logout endpoint' });
}
