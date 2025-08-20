import { MetadataRoute } from 'next'
//  import CityData1 from "@/public/City.json";
 import contentData from "@/components/Content/ContactInfo.json"
import data from "@/components/Content/subDomainUrlContent.json";


export default function sitemap(): MetadataRoute.Sitemap {
  const BaseUrl = contentData.baseUrl
  const SubDomain:any = Object.keys(data)


  const statePages = [
    "about",
    "contact",
    "our-brands",
    "services",
  ];
  
  const SubDomainURL = SubDomain.flatMap((location: any) => [
    {
      url: `https://${location}.${contentData.host}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...statePages.map((page) => ({
      url: `https://${location}.${contentData.host}/${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ]);

  // Add URLs for the pages under app/(State)
 


  return [
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
      url: `${contentData.baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}