import { NextRequest, NextResponse } from "next/server";
import contentData from "@/components/Content/ContactInfo.json";
import subdomainUrl from "@/components/Content/subDomainUrlContent.json";

export async function GET(req: NextRequest) {
  try {
    // Fetch base URL from contentData or use a default
    const baseUrl = contentData.baseUrl || "https://example.com/";
    const subDomains = subdomainUrl ? Object.keys(subdomainUrl) : [];

    // Extract the subdomain from the host header
    const host = req.headers.get("host") || "";
    const subdomainMatch = host.split(".")[0];
    const isSubdomain = subDomains.includes(subdomainMatch);

    // Define the main pages that are allowed for each subdomain
    const mainPages = [
      "/services",
      "/about",
      "/contact",
      "/locations",
      "/our-brands",
    ];

    // Generate allowed paths for subdomains and their respective main pages
    const subdomainAllowPaths = subDomains.flatMap((subdomain) => [
      `/${subdomain}`,
      ...mainPages.map((page) => `/${subdomain}${page}`),
    ]);

    // Default allowed and disallowed paths
    let allow = [
      "/",
      "/about",
      "/services",
      "/contact",
      "/locations",
      "/our-brands",
      "/_blogs",
      "/_next/image",
      ...subdomainAllowPaths,
    ];

    let disallow = [
      "/private/",
      "/api/",
      "/_next/",
      "/static/",
      "/*.json$",
      "/*.xml$",
      ...subDomains.map((subdomain) => `/${subdomain}/${subdomain}`),
    ];

    // Adjust the allow and disallow paths if on a subdomain
    if (isSubdomain) {
      allow = ["/", ...mainPages]; // Allow only main pages on subdomains
      disallow = [
        "/private/",
        "/api/",
        "/_next/",
        "/static/",
        "/*.json$",
        "/*.xml$",
      ];
    }

    // Construct the robots.txt content dynamically
    const robotsTxt = [
      `User-agent: *`,  // Apply rules to all user agents
      ...allow.map((path) => `Allow: ${path}`),  // Add allowed paths
      ...disallow.map((path) => `Disallow: ${path}`),  // Add disallowed paths
      `Sitemap: ${baseUrl}sitemap.xml`,  // Point to the sitemap
      `Host: ${baseUrl}`,  // Specify the base host URL
    ].join("\n");

    // Return the robots.txt file
    return new NextResponse(robotsTxt, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    // Catch errors and return a fallback robots.txt if an issue occurs
    console.error("Error generating robots.txt:", error);

    const fallback = `User-agent: *\nDisallow:`;
    return new NextResponse(fallback, {
      headers: { "Content-Type": "text/plain" },
      status: 500,  // Internal Server Error in case of failure
    });
  }
}
