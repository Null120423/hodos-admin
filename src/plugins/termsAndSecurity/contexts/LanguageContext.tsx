import React, { createContext, ReactNode, useContext, useState } from "react";

export type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations = {
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.terms": "Điều khoản sử dụng",
    "nav.privacy": "Chính sách bảo mật",
    "nav.contact": "Liên hệ",

    // Common
    "common.effective_date": "Có hiệu lực từ",
    "common.contact_info": "Thông tin liên hệ",
    "common.email": "Email",
    "common.address": "Địa chỉ",
    "common.phone": "Điện thoại",

    // Terms of Service
    "terms.title": "Điều Khoản Sử Dụng",
    "terms.subtitle": "Ứng dụng hỗ trợ du lịch tại TP.HCM",
    "terms.intro":
      "Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng ứng dụng. Khi sử dụng ứng dụng, bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản này.",

    "terms.section1.title": "1. Đối Tượng Áp Dụng",
    "terms.section1.content": "Ứng dụng dành cho:",
    "terms.section1.item1":
      "Người dùng vãng lai: Truy cập các thông tin cơ bản mà không cần đăng ký tài khoản.",
    "terms.section1.item2":
      "Người dùng đăng ký: Có thể sử dụng các tính năng nâng cao như lập kế hoạch du lịch, nhận đề xuất AI, trải nghiệm ảnh 360°, chia sẻ trải nghiệm...",
    "terms.section1.item3":
      "Quản trị viên: Quản lý nội dung hệ thống, đảm bảo tính chính xác và an toàn thông tin.",

    "terms.section2.title": "2. Quyền Lợi Người Dùng",
    "terms.section2.item1": "Truy cập thông tin địa điểm, văn hóa",
    "terms.section2.item2": "Nhận hỗ trợ cá nhân hóa từ AI chatbot",
    "terms.section2.item3":
      "Tìm kiếm, khám phá địa danh, ẩm thực qua hình ảnh hoặc bản đồ",
    "terms.section2.item4": "Tham gia cộng đồng du lịch, chia sẻ kinh nghiệm",
    "terms.section2.item5": "Quản lý tài khoản cá nhân và nâng cấp gói dịch vụ",

    "terms.section3.title": "3. Nghĩa Vụ Người Dùng",
    "terms.section3.item1":
      "Không đăng tải thông tin sai sự thật, vi phạm pháp luật Việt Nam",
    "terms.section3.item2":
      "Không can thiệp, phá hoại hệ thống hoặc xâm phạm quyền lợi người khác",
    "terms.section3.item3": "Tự chịu trách nhiệm về nội dung mình đăng tải",

    "terms.section4.title": "4. Giới Hạn Trách Nhiệm",
    "terms.section4.content":
      "Ứng dụng chỉ đóng vai trò hỗ trợ tham khảo. Chúng tôi không chịu trách nhiệm đối với:",
    "terms.section4.item1":
      "Thiệt hại, rủi ro phát sinh từ việc sử dụng thông tin trong ứng dụng",
    "terms.section4.item2": "Nội dung do người dùng khác chia sẻ",

    "terms.section5.title": "5. Quyền Sở Hữu Trí Tuệ",
    "terms.section5.item1":
      "Tất cả nội dung, công nghệ, AI, hệ thống thuộc quyền sở hữu của đơn vị phát triển ứng dụng",
    "terms.section5.item2":
      "Người dùng không được sao chép, khai thác dưới bất kỳ hình thức nào nếu chưa được phép",

    "terms.section6.title": "6. Quy Định Về Tài Khoản",
    "terms.section6.item1":
      "Người dùng cam kết cung cấp thông tin chính xác khi đăng ký",
    "terms.section6.item2":
      "Trường hợp phát hiện hành vi vi phạm, chúng tôi có quyền khóa hoặc xóa tài khoản",

    "terms.section7.title": "7. Thay Đổi Điều Khoản",
    "terms.section7.content":
      "Chúng tôi có quyền cập nhật, điều chỉnh Điều Khoản Sử Dụng bất cứ lúc nào mà không cần báo trước. Phiên bản cập nhật sẽ được đăng công khai trên ứng dụng.",

    "terms.section8.title": "8. Liên Hệ",
    "terms.section8.content": "Mọi thắc mắc vui lòng liên hệ:",

    // Privacy Policy
    "privacy.title": "Chính Sách Bảo Mật",
    "privacy.subtitle": "Ứng dụng hỗ trợ du lịch tại TP.HCM",
    "privacy.intro":
      "Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.",

    "privacy.section1.title": "1. Thông Tin Chúng Tôi Thu Thập",
    "privacy.section1.content":
      "Chúng tôi có thể thu thập các loại thông tin sau:",
    "privacy.section1.item1":
      "Thông tin cá nhân: Tên, email, số điện thoại khi bạn đăng ký tài khoản",
    "privacy.section1.item2":
      "Thông tin vị trí: Để cung cấp đề xuất địa điểm phù hợp",
    "privacy.section1.item3":
      "Thông tin sử dụng: Lịch sử tìm kiếm, địa điểm yêu thích",
    "privacy.section1.item4":
      "Thông tin thiết bị: Loại thiết bị, hệ điều hành, địa chỉ IP",

    "privacy.section2.title": "2. Cách Chúng Tôi Sử Dụng Thông Tin",
    "privacy.section2.item1": "Cung cấp và cải thiện dịch vụ du lịch",
    "privacy.section2.item2": "Cá nhân hóa trải nghiệm người dùng",
    "privacy.section2.item3": "Gửi thông báo về địa điểm mới, sự kiện đặc biệt",
    "privacy.section2.item4": "Phân tích và cải thiện ứng dụng",
    "privacy.section2.item5": "Đảm bảo an toàn và bảo mật",

    "privacy.section3.title": "3. Chia Sẻ Thông Tin",
    "privacy.section3.content":
      "Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn. Thông tin chỉ được chia sẻ trong các trường hợp:",
    "privacy.section3.item1": "Với sự đồng ý của bạn",
    "privacy.section3.item2": "Để tuân thủ pháp luật",
    "privacy.section3.item3":
      "Với các đối tác dịch vụ đáng tin cậy (chỉ thông tin cần thiết)",

    "privacy.section4.title": "4. Bảo Mật Thông Tin",
    "privacy.section4.content": "Chúng tôi áp dụng các biện pháp bảo mật:",
    "privacy.section4.item1": "Mã hóa SSL/TLS cho tất cả dữ liệu truyền tải",
    "privacy.section4.item2": "Hệ thống xác thực hai yếu tố",
    "privacy.section4.item3": "Kiểm tra bảo mật định kỳ",
    "privacy.section4.item4": "Giới hạn quyền truy cập nhân viên",

    "privacy.section5.title": "5. Quyền Của Bạn",
    "privacy.section5.item1": "Truy cập và xem thông tin cá nhân",
    "privacy.section5.item2": "Chỉnh sửa hoặc cập nhật thông tin",
    "privacy.section5.item3": "Xóa tài khoản và dữ liệu",
    "privacy.section5.item4": "Từ chối nhận thông báo marketing",
    "privacy.section5.item5": "Yêu cầu sao chép dữ liệu",

    "privacy.section6.title": "6. Cookies và Công Nghệ Theo Dõi",
    "privacy.section6.content": "Chúng tôi sử dụng cookies để:",
    "privacy.section6.item1": "Ghi nhớ tùy chọn của bạn",
    "privacy.section6.item2": "Phân tích lưu lượng truy cập",
    "privacy.section6.item3": "Cải thiện trải nghiệm người dùng",
    "privacy.section6.item4": "Bạn có thể tắt cookies trong trình duyệt",

    "privacy.section7.title": "7. Lưu Trữ Dữ Liệu",
    "privacy.section7.content": "Dữ liệu của bạn được lưu trữ:",
    "privacy.section7.item1": "Tại các trung tâm dữ liệu an toàn",
    "privacy.section7.item2": "Trong thời gian cần thiết để cung cấp dịch vụ",
    "privacy.section7.item3": "Tuân thủ các quy định về bảo vệ dữ liệu",

    "privacy.section8.title": "8. Thay Đổi Chính Sách",
    "privacy.section8.content":
      "Chúng tôi có thể cập nhật chính sách này để phản ánh các thay đổi trong dịch vụ hoặc pháp luật. Bạn sẽ được thông báo về các thay đổi quan trọng.",

    "privacy.section9.title": "9. Liên Hệ",
    "privacy.section9.content":
      "Nếu bạn có câu hỏi về chính sách bảo mật này, vui lòng liên hệ:",

    // Contact Info
    "contact.email": "support@saigontourism.vn",
    "contact.address": "Quận 1, TP. Hồ Chí Minh, Việt Nam",
    "contact.phone": "+84 28 1234 5678",
    "contact.effective_date": "15/12/2024",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.terms": "Terms of Service",
    "nav.privacy": "Privacy Policy",
    "nav.contact": "Contact",

    // Common
    "common.effective_date": "Effective Date",
    "common.contact_info": "Contact Information",
    "common.email": "Email",
    "common.address": "Address",
    "common.phone": "Phone",

    // Terms of Service
    "terms.title": "Terms of Service",
    "terms.subtitle": "Ho Chi Minh City Tourism Support App",
    "terms.intro":
      "Please read these terms carefully before using the app. By using the app, you agree to comply with and be bound by these terms.",

    "terms.section1.title": "1. Applicable Users",
    "terms.section1.content": "The app is designed for:",
    "terms.section1.item1":
      "Guest users: Access basic information without account registration.",
    "terms.section1.item2":
      "Registered users: Can use advanced features like trip planning, AI recommendations, 360° experiences, experience sharing...",
    "terms.section1.item3":
      "Administrators: Manage system content, ensure information accuracy and security.",

    "terms.section2.title": "2. User Rights",
    "terms.section2.item1": "Access location and cultural information",
    "terms.section2.item2": "Receive personalized support from AI chatbot",
    "terms.section2.item3":
      "Search and explore landmarks, cuisine through images or maps",
    "terms.section2.item4": "Join tourism community, share experiences",
    "terms.section2.item5":
      "Manage personal account and upgrade service packages",

    "terms.section3.title": "3. User Obligations",
    "terms.section3.item1":
      "Do not post false information or violate Vietnamese law",
    "terms.section3.item2":
      "Do not interfere with, damage the system or infringe on others' rights",
    "terms.section3.item3": "Take responsibility for your posted content",

    "terms.section4.title": "4. Limitation of Liability",
    "terms.section4.content":
      "The app serves only as reference support. We are not responsible for:",
    "terms.section4.item1":
      "Damages or risks arising from using information in the app",
    "terms.section4.item2": "Content shared by other users",

    "terms.section5.title": "5. Intellectual Property Rights",
    "terms.section5.item1":
      "All content, technology, AI, systems are owned by the app development unit",
    "terms.section5.item2":
      "Users may not copy or exploit in any form without permission",

    "terms.section6.title": "6. Account Regulations",
    "terms.section6.item1":
      "Users commit to provide accurate information when registering",
    "terms.section6.item2":
      "If violations are detected, we have the right to lock or delete accounts",

    "terms.section7.title": "7. Terms Changes",
    "terms.section7.content":
      "We have the right to update and modify the Terms of Service at any time without prior notice. Updated versions will be publicly posted on the app.",

    "terms.section8.title": "8. Contact",
    "terms.section8.content": "For any questions, please contact:",

    // Privacy Policy
    "privacy.title": "Privacy Policy",
    "privacy.subtitle": "Ho Chi Minh City Tourism Support App",
    "privacy.intro":
      "We are committed to protecting your personal information. This policy explains how we collect, use, and protect your data.",

    "privacy.section1.title": "1. Information We Collect",
    "privacy.section1.content":
      "We may collect the following types of information:",
    "privacy.section1.item1":
      "Personal information: Name, email, phone number when you register an account",
    "privacy.section1.item2":
      "Location information: To provide suitable location recommendations",
    "privacy.section1.item3":
      "Usage information: Search history, favorite locations",
    "privacy.section1.item4":
      "Device information: Device type, operating system, IP address",

    "privacy.section2.title": "2. How We Use Information",
    "privacy.section2.item1": "Provide and improve tourism services",
    "privacy.section2.item2": "Personalize user experience",
    "privacy.section2.item3":
      "Send notifications about new locations, special events",
    "privacy.section2.item4": "Analyze and improve the app",
    "privacy.section2.item5": "Ensure safety and security",

    "privacy.section3.title": "3. Information Sharing",
    "privacy.section3.content":
      "We do not sell or rent your personal information. Information is only shared in cases:",
    "privacy.section3.item1": "With your consent",
    "privacy.section3.item2": "To comply with law",
    "privacy.section3.item3":
      "With trusted service partners (only necessary information)",

    "privacy.section4.title": "4. Information Security",
    "privacy.section4.content": "We apply security measures:",
    "privacy.section4.item1": "SSL/TLS encryption for all data transmission",
    "privacy.section4.item2": "Two-factor authentication system",
    "privacy.section4.item3": "Regular security audits",
    "privacy.section4.item4": "Limited staff access rights",

    "privacy.section5.title": "5. Your Rights",
    "privacy.section5.item1": "Access and view personal information",
    "privacy.section5.item2": "Edit or update information",
    "privacy.section5.item3": "Delete account and data",
    "privacy.section5.item4": "Refuse marketing notifications",
    "privacy.section5.item5": "Request data copy",

    "privacy.section6.title": "6. Cookies and Tracking Technologies",
    "privacy.section6.content": "We use cookies to:",
    "privacy.section6.item1": "Remember your preferences",
    "privacy.section6.item2": "Analyze traffic",
    "privacy.section6.item3": "Improve user experience",
    "privacy.section6.item4": "You can disable cookies in your browser",

    "privacy.section7.title": "7. Data Storage",
    "privacy.section7.content": "Your data is stored:",
    "privacy.section7.item1": "At secure data centers",
    "privacy.section7.item2": "For the time necessary to provide services",
    "privacy.section7.item3": "In compliance with data protection regulations",

    "privacy.section8.title": "8. Policy Changes",
    "privacy.section8.content":
      "We may update this policy to reflect changes in services or law. You will be notified of significant changes.",

    "privacy.section9.title": "9. Contact",
    "privacy.section9.content":
      "If you have questions about this privacy policy, please contact:",

    // Contact Info
    "contact.email": "support@saigontourism.vn",
    "contact.address": "District 1, Ho Chi Minh City, Vietnam",
    "contact.phone": "+84 28 1234 5678",
    "contact.effective_date": "December 15, 2024",
  },
};
