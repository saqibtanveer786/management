import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function GET(request) {
    const tag = request.nextUrl.searchParams.get('tag')
    await revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
}