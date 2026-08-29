import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    // In production this should be a strong hashed password from DB,
    // but at minimum it should NEVER be prefixed with NEXT_PUBLIC_
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'edsha_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return response;
    }
    
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
  }
}

export async function GET(request: Request) {
  // Check if authenticated
  const authCookie = request.headers.get('cookie')?.includes('edsha_auth=authenticated');
  return NextResponse.json({ isAuthenticated: !!authCookie });
}
