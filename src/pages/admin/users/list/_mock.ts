export const mockUsers = [
  {
    id: "1",
    username: "nguyenvana",
    email: "nguyenvana@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    verifyAt: "2024-01-15T10:30:00Z",
    isAdmin: "false",
    isActive: true,
    isUpdateDetail: true,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    userDetail: {
      fullName: "Nguyễn Văn A",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phoneNumber: "0901234567",
      email: "nguyenvana@gmail.com",
      bio: "Yêu thích du lịch và khám phá những địa điểm mới. Đã đi qua nhiều tỉnh thành trong nước.",
      profilePictureUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      birthDate: "1990-05-15",
      gender: "Nam",
      nationality: "Việt Nam",
      travelInterests: "Ẩm thực, Văn hóa, Lịch sử",
      languages: "vi,en",
      reputationScore: 4.5,
    },
    posts: [
      {
        id: "p1",
        title: "Khám phá chợ đêm Bến Thành",
        thumbnail:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
        tag: "Ẩm thực",
        content: "Trải nghiệm tuyệt vời tại chợ đêm Bến Thành...",
        timePosted: 1642147200,
        commentCount: 15,
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        id: "p2",
        title: "Cà phê sáng tại Sài Gòn",
        thumbnail:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop",
        tag: "Văn hóa",
        content: "Văn hóa cà phê độc đáo của người Sài Gòn...",
        timePosted: 1642233600,
        commentCount: 8,
        createdAt: "2024-01-16T10:30:00Z",
      },
    ],
    totalPosts: 2,
    totalLikes: 45,
    totalComments: 23,
  },
  {
    id: "2",
    username: "tranthib",
    email: "tranthib@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    verifyAt: "2024-01-12T08:20:00Z",
    isAdmin: "false",
    isActive: true,
    isUpdateDetail: false,
    createdAt: "2024-01-08T14:20:00Z",
    updatedAt: "2024-01-18T16:30:00Z",
    userDetail: {
      fullName: "Trần Thị B",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      phoneNumber: "0907654321",
      email: "tranthib@gmail.com",
      bio: "Blogger du lịch, thích chia sẻ những trải nghiệm thú vị.",
      profilePictureUrl:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      birthDate: "1995-08-22",
      gender: "Nữ",
      nationality: "Việt Nam",
      travelInterests: "Du lịch bụi, Nhiếp ảnh",
      languages: "vi,en,fr",
      reputationScore: 4.8,
    },
    posts: [
      {
        id: "p3",
        title: "Hành trình khám phá Đà Lạt",
        thumbnail:
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        tag: "Du lịch",
        content: "Đà Lạt luôn là điểm đến yêu thích...",
        timePosted: 1642320000,
        commentCount: 25,
        createdAt: "2024-01-17T10:30:00Z",
      },
    ],
    totalPosts: 1,
    totalLikes: 67,
    totalComments: 25,
  },
  {
    id: "3",
    username: "adminuser",
    email: "admin@system.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verifyAt: "2024-01-01T00:00:00Z",
    isAdmin: "true",
    isActive: true,
    isUpdateDetail: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    userDetail: {
      fullName: "Quản trị viên",
      address: "Hệ thống",
      phoneNumber: "0900000000",
      email: "admin@system.com",
      bio: "Quản trị viên hệ thống",
      profilePictureUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      birthDate: "1985-01-01",
      gender: "Nam",
      nationality: "Việt Nam",
      travelInterests: "Quản lý hệ thống",
      languages: "vi,en",
      reputationScore: 5.0,
    },
    posts: [],
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
  },
];
