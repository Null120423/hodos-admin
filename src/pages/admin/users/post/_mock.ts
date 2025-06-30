export const mockPosts = [
  {
    id: "p1",
    title: "Khám phá ẩm thực đường phố Sài Gòn",
    thumbnail:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
    imgs: JSON.stringify([
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
    ]),
    tag: "Ẩm thực",
    content: `
        <h2>Khám phá ẩm thực đường phố Sài Gòn</h2>
        <p>Sài Gòn nổi tiếng với nền ẩm thực đường phố phong phú và đa dạng. Từ những món ăn truyền thống như phở, bánh mì đến các món ăn vặt độc đáo.</p>
        <p>Những địa điểm nổi tiếng:</p>
        <ul>
          <li>Chợ Bến Thành - Trung tâm ẩm thực</li>
          <li>Phố Bùi Viện - Khu vực sôi động</li>
          <li>Quận 1 - Nhiều quán ăn ngon</li>
        </ul>
      `,
    timePosted: 1642147200,
    commentCount: 25,
    userId: "user1",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    // Moderation fields
    moderationStatus: "approved", // pending, approved, rejected, flagged
    moderationReason: null,
    moderatedBy: "admin1",
    moderatedAt: "2024-01-15T11:00:00Z",
    harmfulContentScore: 0.1, // 0-1 scale
    flagCount: 0,
    isPublished: true,
    viewCount: 1250,
    likeCount: 89,
    shareCount: 12,
    // User info
    user: {
      id: "user1",
      username: "nguyenvana",
      fullName: "Nguyễn Văn A",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isVerified: true,
      reputationScore: 4.5,
    },
  },
  {
    id: "p2",
    title: "Bài viết có nội dung không phù hợp",
    thumbnail:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=300&h=200&fit=crop",
    imgs: JSON.stringify([]),
    tag: "Khác",
    content: `
        <p>Đây là một bài viết có chứa nội dung không phù hợp, có thể gây tổn hại hoặc vi phạm quy định cộng đồng.</p>
        <p>Nội dung này cần được kiểm duyệt và có thể bị từ chối.</p>
      `,
    timePosted: 1642233600,
    commentCount: 3,
    userId: "user2",
    createdAt: "2024-01-16T08:20:00Z",
    updatedAt: "2024-01-16T08:20:00Z",
    // Moderation fields
    moderationStatus: "flagged",
    moderationReason: "Nội dung có thể gây tổn hại, cần xem xét kỹ",
    moderatedBy: null,
    moderatedAt: null,
    harmfulContentScore: 0.8,
    flagCount: 5,
    isPublished: false,
    viewCount: 45,
    likeCount: 2,
    shareCount: 0,
    // User info
    user: {
      id: "user2",
      username: "usertest",
      fullName: "User Test",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      isVerified: false,
      reputationScore: 2.1,
    },
  },
  {
    id: "p3",
    title: "Hướng dẫn du lịch Đà Lạt chi tiết",
    thumbnail:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    imgs: JSON.stringify([
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    ]),
    tag: "Du lịch",
    content: `
        <h2>Hướng dẫn du lịch Đà Lạt</h2>
        <p>Đà Lạt là thành phố ngàn hoa với khí hậu mát mẻ quanh năm, là điểm đến lý tưởng cho những chuyến du lịch nghỉ dưỡng.</p>
        <h3>Những địa điểm nên thăm:</h3>
        <ul>
          <li>Hồ Xuân Hương</li>
          <li>Dinh Bảo Đại</li>
          <li>Thác Elephant</li>
          <li>Chợ Đà Lạt</li>
        </ul>
      `,
    timePosted: 1642320000,
    commentCount: 18,
    userId: "user3",
    createdAt: "2024-01-17T14:15:00Z",
    updatedAt: "2024-01-17T14:15:00Z",
    // Moderation fields
    moderationStatus: "pending",
    moderationReason: null,
    moderatedBy: null,
    moderatedAt: null,
    harmfulContentScore: 0.05,
    flagCount: 0,
    isPublished: false,
    viewCount: 0,
    likeCount: 0,
    shareCount: 0,
    // User info
    user: {
      id: "user3",
      username: "traveler123",
      fullName: "Trần Thị C",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isVerified: true,
      reputationScore: 4.2,
    },
  },
];
