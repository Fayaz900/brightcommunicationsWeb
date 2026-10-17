import { revalidatePath } from "next/cache";

export function revalidateDiscovery() {
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
}
