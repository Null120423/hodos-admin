import {
  BookOutlined,
  CalendarOutlined,
  EyeOutlined,
  FacebookOutlined,
  HeartOutlined,
  LinkedinOutlined,
  LinkOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  TagOutlined,
  TwitterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Avatar,
  BackTop,
  Button,
  Card,
  Divider,
  message,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Page404 } from "@/routes";
import useBlogDetail from "@/services/hooks/admin/blog/useBlogDetail";

dayjs.extend(relativeTime);

const { Text } = Typography;

export default function BlogDetail() {
  const data = useParams();
  const { data: blog, isLoading } = useBlogDetail(data?.id as string);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [viewCount] = useState(1234);
  const [readingTime, setReadingTime] = useState(0);

  // Calculate reading time
  useEffect(() => {
    if (!blog?.content) return;
    const text = blog.content.replace(/<[^>]*>/g, "");
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const time = Math.ceil(wordCount / wordsPerMinute);

    setReadingTime(time);
  }, [isLoading, blog]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog.title;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        message.success("Link copied to clipboard!");

        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getTagColor = (tag: string) => {
    const colors = {
      Travel: "blue",
      Technology: "green",
      Lifestyle: "purple",
      Sports: "orange",
      Food: "red",
    };

    return colors[tag as keyof typeof colors] || "default";
  };

  // set meta data
  useEffect(() => {
    if (!blog) return;
    document.title = blog.title || "Blog Detail";
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", blog.summary || "");
    } else {
      const meta = document.createElement("meta");

      meta.name = "description";
      meta.content = blog.summary || "";
      document.head.appendChild(meta);
    }
  }, [blog]);

  if (!data?.id) {
    return <Page404 />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {blog && (
        <Fragment>
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Article Header */}
            <Card className="mb-8 overflow-hidden">
              {/* Featured Image */}
              <div className="group relative h-96 mb-6 rounded-lg overflow-hidden">
                <img
                  alt={blog.title}
                  className="w-full h-full object-cover"
                  src={blog.thumbnail || "/placeholder.svg"}
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=400&width=800";
                  }}
                />
                <div className="absolute group-hover:bg-transparent inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Tag className="mb-2" color={getTagColor(blog.tag)}>
                    <TagOutlined className="mr-1" />
                    {blog.tag}
                  </Tag>
                  <h1
                    className="text-white mb-0 text-shadow text-xxl"
                    style={{
                      fontSize: "2.5rem",
                    }}
                  >
                    {blog.title}
                  </h1>
                </div>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b">
                <Space wrap>
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <Text strong>{blog.createdByName || "Admin User"}</Text>
                      <br />
                      <Text className="text-sm" type="secondary">
                        <CalendarOutlined className="mr-1" />
                        {dayjs(blog.createdAt).format("MMMM DD, YYYY")}
                      </Text>
                    </div>
                  </Space>

                  <Divider type="vertical" />

                  <Space>
                    <Text type="secondary">
                      <BookOutlined className="mr-1" />
                      {readingTime} min read
                    </Text>
                    <Text type="secondary">
                      <EyeOutlined className="mr-1" />
                      {viewCount.toLocaleString()} views
                    </Text>
                  </Space>
                </Space>

                <Space>
                  <Button
                    className={isLiked ? "bg-red-500 border-red-500" : ""}
                    icon={<HeartOutlined />}
                    type={isLiked ? "primary" : "default"}
                    onClick={handleLike}
                  >
                    {likeCount}
                  </Button>

                  <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                    Print
                  </Button>

                  <Button
                    icon={<ShareAltOutlined />}
                    type="primary"
                    onClick={() => handleShare("copy")}
                  >
                    Share
                  </Button>
                </Space>
              </div>

              {/* Social Share Buttons */}
              <div className="flex gap-2 mb-6">
                <Button
                  className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  icon={<FacebookOutlined />}
                  onClick={() => handleShare("facebook")}
                >
                  Facebook
                </Button>
                <Button
                  className="bg-blue-400 text-white border-blue-400 hover:bg-blue-500"
                  icon={<TwitterOutlined />}
                  onClick={() => handleShare("twitter")}
                >
                  Twitter
                </Button>
                <Button
                  className="bg-blue-700 text-white border-blue-700 hover:bg-blue-800"
                  icon={<LinkedinOutlined />}
                  onClick={() => handleShare("linkedin")}
                >
                  LinkedIn
                </Button>
                <Button
                  icon={<LinkOutlined />}
                  onClick={() => handleShare("copy")}
                >
                  Copy Link
                </Button>
              </div>
            </Card>

            {/* Article Content */}
            <Card className="mb-8">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="prose prose-lg max-w-none"
                style={{
                  lineHeight: "1.8",
                  fontSize: "16px",
                  color: "#374151",
                }}
              />

              {/* Article Footer */}
              <Divider />
              <div className="flex items-center justify-between">
                <div>
                  <Text type="secondary">
                    Last updated:{" "}
                    {dayjs(blog.updatedAt).format("MMMM DD, YYYY")}
                  </Text>
                </div>
                <Space>
                  <Button
                    className={isLiked ? "bg-red-500 border-red-500" : ""}
                    icon={<HeartOutlined />}
                    type={isLiked ? "primary" : "default"}
                    onClick={handleLike}
                  >
                    {isLiked ? "Liked" : "Like"} ({likeCount})
                  </Button>
                </Space>
              </div>
            </Card>
          </div>

          {/* Floating Action Buttons */}
          <Affix style={{ position: "fixed", bottom: 24, right: 24 }}>
            <Space direction="vertical">
              <Tooltip title="Share Article">
                <Button
                  icon={<ShareAltOutlined />}
                  shape="circle"
                  size="large"
                  type="primary"
                  onClick={() => handleShare("copy")}
                />
              </Tooltip>
              <BackTop>
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  ↑
                </div>
              </BackTop>
            </Space>
          </Affix>
        </Fragment>
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-screen w-screen bg-black/50 fixed top-0 left-0 z-50">
          <Spin
            className="flex items-center justify-center h-screen"
            size="large"
          />
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          .ant-affix,
          .ant-back-top,
          button,
          .no-print {
            display: none !important;
          }

          .prose {
            font-size: 12pt !important;
            line-height: 1.5 !important;
          }

          .ant-card {
            box-shadow: none !important;
            border: none !important;
          }
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .prose h1,
        .prose h2,
        .prose h3,
        .prose h4,
        .prose h5,
        .prose h6 {
          color: #1f2937;
          font-weight: 600;
          margin-top: 2em;
          margin-bottom: 1em;
        }

        .prose p {
          margin-bottom: 1.5em;
        }

        .prose a {
          color: #3b82f6;
          text-decoration: none;
        }

        .prose a:hover {
          text-decoration: underline;
        }

        .prose blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          background: #f8fafc;
          padding: 1rem;
          border-radius: 0.375rem;
        }

        .prose ul,
        .prose ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
