import { adsenseConfig } from "@/config/adsense";

export function GET() {
  return new Response(`google.com, ${adsenseConfig.sellerId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
