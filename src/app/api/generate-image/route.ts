import { NextResponse } from 'next/server';
import { HfInference } from "@huggingface/inference";

export async function POST(req: Request) {
  try {
    const { prompt, token } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Use user-provided token or fall back to server environment variable
    const hfToken = token || process.env.HF_TOKEN;

    if (!hfToken) {
      return NextResponse.json({ error: 'Hugging Face Token is missing' }, { status: 401 });
    }

    const hf = new HfInference(hfToken);

    // Using FLUX.1-schnell via HfInference library for more robustness
    const blob = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
      parameters: {
        wait_for_model: true
      }
    });

    const arrayBuffer = await (blob as any).arrayBuffer();
    
    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': (blob as any).type || 'image/png',
      },
    });
  } catch (error: any) {
    console.error('Inference API Error:', error);
    const errorMessage = error?.message || 'Failed to generate image';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
