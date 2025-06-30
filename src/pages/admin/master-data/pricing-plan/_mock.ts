// Enums
export enum BillingCycle {
  MONTHLY = "monthly",
  YEARLY = "yearly",
  QUARTERLY = "quarterly",
  ONE_TIME = "one_time",
  CUSTOM = "custom",
}

// Mock data for pricing plans
export const mockPricingPlans = [
  {
    id: "1",
    name: "Basic Plan",
    planCode: "basic_monthly",
    description: "Perfect for individuals starting their travel journey",
    price: 9.99,
    currency: "USD",
    billingCycle: BillingCycle.MONTHLY,
    features: ["5 trips per month", "Basic analytics", "Email support"],
    isActive: true,
    trialPeriodDays: 7,
    displayOrder: 1,
    limits: { maxTripsPerMonth: 5, maxCollaboratorsPerTrip: 2 },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "2",
    name: "Premium Plan",
    planCode: "premium_monthly",
    description:
      "Access to all premium features, including unlimited trips and advanced analytics",
    price: 19.99,
    currency: "USD",
    billingCycle: BillingCycle.MONTHLY,
    features: [
      "Unlimited trips",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    isActive: true,
    trialPeriodDays: 14,
    displayOrder: 2,
    limits: { maxTripsPerMonth: -1, maxCollaboratorsPerTrip: 10 },
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-21T11:20:00Z",
  },
  {
    id: "3",
    name: "Enterprise Plan",
    planCode: "enterprise_yearly",
    description: "Complete solution for large organizations",
    price: 199.99,
    currency: "USD",
    billingCycle: BillingCycle.YEARLY,
    features: [
      "Everything in Premium",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    isActive: false,
    trialPeriodDays: 30,
    displayOrder: 3,
    limits: { maxTripsPerMonth: -1, maxCollaboratorsPerTrip: -1 },
    createdAt: "2024-01-17T14:30:00Z",
    updatedAt: "2024-01-22T16:45:00Z",
  },
];

export const billingCycleOptions = [
  { label: "Monthly", value: BillingCycle.MONTHLY, color: "blue" },
  { label: "Yearly", value: BillingCycle.YEARLY, color: "green" },
  { label: "Quarterly", value: BillingCycle.QUARTERLY, color: "orange" },
  { label: "One Time", value: BillingCycle.ONE_TIME, color: "purple" },
  { label: "Custom", value: BillingCycle.CUSTOM, color: "red" },
];

export const currencyOptions = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "VND", value: "VND" },
  { label: "GBP", value: "GBP" },
];
