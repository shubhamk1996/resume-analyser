export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number; // ₹19
  durationDays: number; // 7 days
  gstRate: number; // 18%
  taxAmount: number; // ₹3.42
  totalAmount: number; // ₹22.42
  currency: 'INR';
  description: string;
  isPopular?: boolean;
  features: string[];
}

export interface UserEntitlement {
  userId: string;
  hasFreeExportAvailable: boolean; // 1 lifetime free document export
  freeExportUsedAt?: string;
  freeExportDocumentTitle?: string;
  isSubscribed: boolean;
  subscriptionPlanId?: string;
  subscriptionStartedAt?: string;
  subscriptionExpiresAt?: string;
  totalExportsCount: number;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  planId: string;
  baseAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: 'INR';
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  createdAt: string;
  completedAt?: string;
}
