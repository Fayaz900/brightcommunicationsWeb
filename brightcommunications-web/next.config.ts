import type { NextConfig } from "next";
import { isIndexableDeployment } from "./lib/seo";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.33", "10.0.0.1"],
  async headers() {
    return [
      { source: "/:path*", headers: [{ key: "Link", value: '</llms.txt>; rel="describedby"' }] },
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      ...(!isIndexableDeployment() ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }] : []),
    ];
  },
};

export default nextConfig;
