import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) { // 指定path缓存失效
    revalidatePath(path);
    return Response.json({
      revalidated: true,
      now: Date.now(),
      path
    })
  }
  // 全部缓存失效
  revalidatePath('/', 'layout');
  return Response.json({
    revalidated: true,
    now: Date.now(),
  })
}
