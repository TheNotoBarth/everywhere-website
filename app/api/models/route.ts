import { NextResponse } from 'next/server';

import { getSupportedModels } from '@/lib/pricing-models';

export async function GET() {
  const models = await getSupportedModels();

  return NextResponse.json(
    { models },
    {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    }
  );
}
