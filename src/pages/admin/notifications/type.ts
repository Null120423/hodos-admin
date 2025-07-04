export enum NotificationType {
  INFO = "info",
  REMINDER = "reminder",
  ALERT = "alert",
  RECOMMENDATION = "recommendation",
  TRIP_UPDATE = "trip_update",
  NEW_CONTENT = "new_content",
}

export enum NotificationChannel {
  IN_APP = "in_app",
  EMAIL = "email",
  PUSH = "push",
}

export enum ScheduledNotificationStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SENT = "sent",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface ScheduledNotification {
  id: string;
  userId?: string;
  user?: User;
  title: string;
  message: string;
  notificationType: NotificationType;
  channels: NotificationChannel[];
  scheduledTime: string;
  status: ScheduledNotificationStatus;
  payload?: Record<string, any>;
  processedAt?: string;
  errorMessage?: string;
  retryAttempts: number;
  createdAt: string;
  updatedAt: string;
  isAllUser?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  user: User;
  scheduledNotificationId?: string;
  scheduleNotification?: ScheduledNotification;
  title: string;
  message: string;
  isRead: boolean;
  readAt?: string;
  type: NotificationType;
  sentAt: string;
  linkTo?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScheduledNotificationRequest {
  userId?: string;
  title: string;
  message: string;
  notificationType: NotificationType;
  channels: NotificationChannel[];
  scheduledTime: string;
  payload?: Record<string, any>;
}

export interface UpdateScheduledNotificationRequest
  extends Partial<CreateScheduledNotificationRequest> {
  status?: ScheduledNotificationStatus;
}
