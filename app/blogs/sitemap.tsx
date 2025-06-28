import { MetadataRoute } from "next";

import contactContent from "@/app/Data/content";

const contentData: any = contactContent.contactContent;
const blogData: any = contactContent.blogContent.posts;
export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueCategories = Array.from(
    new Set(blogData.map((url: any) => url.catagory)),
  );
  const blogCatergoryURL = uniqueCategories.map((catagory: any) => ({
    url: `${contentData.baseUrl}${catagory}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  const blogURL = blogData.map((url: any) => ({
    url: `${contentData.baseUrl}${url.catagory}/${url.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as "weekly",
    priority: 1,
  }));
  return [...blogCatergoryURL, ...blogURL];
}
