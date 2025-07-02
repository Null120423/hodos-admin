import { GetProp, UploadProps } from "antd";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ADMIN_ROUTES } from "@/routes/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type BreadcrumbItem = { title: string; path?: string };

const routeNameMap: Record<string, string> = {
  [ADMIN_ROUTES.DASHBOARD]: "Dashboard",
  [ADMIN_ROUTES.BLOG_MANAGER]: "Blog Manager",
  [ADMIN_ROUTES.BLOG_MANAGER_CREATE]: "Create Blog",
  [ADMIN_ROUTES.BLOG_MANAGER_CREATE_PREVIEW]: "Preview Blog",
  [ADMIN_ROUTES.LOCATION_MANAGER]: "Location Manager",
  [ADMIN_ROUTES.LOG_BUILD]: "Build Logs",
  [ADMIN_ROUTES.LOG_ERROR]: "Error Logs",
  [ADMIN_ROUTES.SETTING]: "Settings",
};

export function getBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  let path = "";
  const items: BreadcrumbItem[] = [{ title: "Admin", path: "/" }];

  segments.forEach((seg) => {
    path += `/${seg}`;
    const title =
      routeNameMap[path] || seg.charAt(0).toUpperCase() + seg.slice(1);

    items.push({ title, path });
  });

  return items;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
