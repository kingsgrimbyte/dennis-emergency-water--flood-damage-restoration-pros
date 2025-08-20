import { NextRequest, NextResponse } from "next/server";
//  import CityData1 from "@/public/City.json";
import contactContent from "@/app/Data/content";
import subdomainContent from "@/app/Data/FinalContent";

const contentData: any = contactContent.contactContent;
const data: any = subdomainContent.subdomainData;

export async function GET(req: NextRequest) {
  const SubDomain: any = Object.keys(data);

  const SubDomainURL = SubDomain.map((location: any) => ({
    url: `https://${location}.${contentData.host}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  return new NextResponse(createSitemap(SubDomainURL), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

function createSitemap(urls: any[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map((url) => {
        return `
      <url>
        <loc>${url.url}</loc>
        <lastmod>${url.lastModified.toISOString()}</lastmod>
        <changefreq>${url.changeFrequency}</changefreq>
        <priority>${url.priority}</priority>
      </url>
    `;
      })
      .join("")}
  </urlset>`;
}
