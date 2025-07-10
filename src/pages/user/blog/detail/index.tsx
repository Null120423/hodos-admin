import {
  CalendarOutlined,
  HeartOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Spin, Tag } from "antd";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import useBlogDetail from "@/services/hooks/admin/blog/useBlogDetail";

export default function MobileBlogDetail() {
  const { id } = useParams();
  const { data: blog, isLoading } = useBlogDetail(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="p-3 bg-white min-h-screen">
      <div className="mb-4">
        <img
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md"
          src={blog.thumbnail || "/placeholder.svg"}
        />
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <Tag color="blue">{blog.tag}</Tag>
        <h1 className="text-lg font-semibold leading-tight">{blog.title}</h1>
        <div className="text-xs text-gray-500 flex gap-2 items-center">
          <Avatar icon={<UserOutlined />} size={20} />
          <span>{blog.createdByName || "Admin"}</span>
          <span className="mx-1">·</span>
          <CalendarOutlined />
          <span>{dayjs(blog.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>

      <Card bordered={false} className="mb-3 shadow-sm" size="small">
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className="text-sm text-gray-800"
          style={{ lineHeight: "1.7" }}
        />
      </Card>

      <div className="flex justify-between items-center px-2 mt-4">
        <Button
          className="rounded-full bg-red-500 text-white border-red-500"
          icon={<HeartOutlined />}
          size="small"
        >
          Like
        </Button>
        <Button
          className="rounded-full bg-blue-500 text-white border-blue-500"
          icon={<ShareAltOutlined />}
          size="small"
        >
          Share
        </Button>
      </div>
    </div>
  );
}
