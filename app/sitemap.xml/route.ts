import { NextApiRequest, NextApiResponse } from "next";
import contentData from "@/components/Content/ContactInfo.json";
import data from "@/components/Content/subDomainUrlContent.json";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const BaseUrl = contentData.baseUrl;
  const SubDomain: any = Object.keys(data);

  const SubDomainURL = SubDomain.map((location: any) => ({
    url: `https://${location}.${contentData.host}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));

  const urls = [
    ...SubDomainURL,
    {
      url: `${contentData.baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}locations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${contentData.baseUrl}subdomains/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  res.setHeader("Content-Type", "application/xml");
  res.status(200).send(createSitemap(urls));
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
