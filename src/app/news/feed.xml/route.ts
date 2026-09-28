import { getNews } from "@/lib/news";
import { brand } from "@/data/brand";

const escapeXml=(value:string)=>value.replace(/[<>&'\"]/g,char=>({"<":"&lt;",">":"&gt;","&":"&amp;","'":"&apos;",'"':"&quot;"})[char]||char);
export const dynamic="force-dynamic";
export async function GET(){
  const feed=await getNews();
  const items=feed.items.map(item=>`<item><title>${escapeXml(item.title)}</title><link>${escapeXml(item.url)}</link><guid isPermaLink="true">${escapeXml(item.url)}</guid><pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate><category>${escapeXml(item.publisher)}</category><description>${escapeXml(`${item.publisher} · ${item.topic}. Read the original article at the publisher.`)}</description></item>`).join("");
  const xml=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(brand.name)} AI News</title><link>${escapeXml(`${brand.siteUrl}/news`)}</link><description>Official-source AI headlines curated by ${escapeXml(brand.name)}.</description><lastBuildDate>${new Date(feed.checkedAt).toUTCString()}</lastBuildDate>${items}</channel></rss>`;
  return new Response(xml,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, s-maxage=3600, stale-while-revalidate=86400"}});
}
