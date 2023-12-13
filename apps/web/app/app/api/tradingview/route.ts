export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: Request) {
  const formData = await request.formData();
  const watchList = formData.get('watchList');
  return new Response(watchList, {
    headers: {
      'Content-Disposition': 'attachment; filename=Binance.txt',
      'Content-Type': 'application/text',
    },
  });
}
