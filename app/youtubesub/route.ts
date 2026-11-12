import { env } from "cloudflare:workers";
import { after } from 'next/server'
import { verifyHmac, processYoutubeHook } from "@/lib/youtubehook";
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
})

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const hubMode = url.searchParams.get("hub.mode");
  const hubChallenge = url.searchParams.get("hub.challenge");

  if ((hubMode === "subscribe" || hubMode === "unsubscribe") && hubChallenge) {
    // 허브에서 보낸 챌린지 코드를 평문(text/plain) 그대로 200 상태코드로 반환해야 인증이 완료됩니다.
    return new Response(hubChallenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });
  }
  return new Response("Missing WebSub verification parameters", { status: 400 });
}

export async function POST(request: Request) {
  const raw = await request.text();                       // raw body for signature checks
  const signature = request.headers.get('x-hub-signature') || '';
  if (!(await verifyHmac(raw, signature, env.WEBHOOK_SECRET))) {
    return new Response('Invalid signature', { status: 401 });
  }

  let feed: YtFeed | undefined;
  try {
    feed = (parser.parse(raw) as { feed?: YtFeed }).feed;
  } catch {
    return new Response('ignored', { status: 200 })
  }

  // Respond fast; finish the work in the background
  after(async () => {
    await processYoutubeHook(feed as YtFeed) // 어케해야 이 as YtFeed를 없앨 수 있을까
  })
  return new Response('OK', { status: 200 });
}

