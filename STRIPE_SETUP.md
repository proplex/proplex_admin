# Stripe Integration Setup Guide

This document outlines the Stripe integration for the Proplex landing page payment system.

## Current Implementation

The current implementation includes:

1. **LandingPage Component** (`src/pages/LandingPage.tsx`)
   - Proplex introduction and feature showcase
   - Subscription plans with monthly/yearly billing options
   - Integrated paywall system
   - KYB wizard integration

2. **KYB Wizard Component** (`src/components/wizard/KYBWizard.tsx`)
   - Multi-step business verification process
   - Wallet generation functionality
   - Investment policy configuration
   - Document upload interface

3. **Stripe Service** (`src/services/stripe.ts`)
   - Mock implementation for demo purposes
   - Payment intent creation
   - Subscription management
   - Utility functions for pricing

## Production Setup Requirements

To implement this in production, you'll need to:

### 1. Install Stripe Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### 2. Environment Variables

Add to your `.env` file:

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
```

### 3. Backend API Endpoints

Create the following backend endpoints:

- `POST /api/create-payment-intent` - Create payment intent for one-time payments
- `POST /api/create-subscription` - Create subscription for recurring billing
- `POST /api/webhook/stripe` - Handle Stripe webhook events
- `GET /api/subscription/:id` - Get subscription details
- `POST /api/cancel-subscription/:id` - Cancel subscription

### 4. Stripe Dashboard Configuration

1. Create subscription products in Stripe Dashboard
2. Set up webhook endpoints
3. Configure tax settings if required
4. Set up customer portal for subscription management

### 5. Security Considerations

- Never expose secret keys in frontend code
- Validate all payments on the backend
- Implement proper error handling
- Use HTTPS in production
- Validate webhook signatures

## Current Mock Implementation

The current implementation uses mock functions to simulate Stripe functionality:

- `mockConfirmCardPayment()` - Simulates payment confirmation
- `mockCreatePaymentMethod()` - Simulates payment method creation
- `mockRedirectToCheckout()` - Simulates redirect to Stripe Checkout

## Subscription Plans

Current plans configured:

1. **Starter** - $29/month
   - Access to 5 investment opportunities
   - Basic portfolio analytics
   - Standard support

2. **Professional** - $79/month (Most Popular)
   - Access to all investment opportunities
   - Advanced portfolio analytics
   - Priority support
   - API access

3. **Enterprise** - $199/month
   - Unlimited investment opportunities
   - White-label solutions
   - 24/7 premium support
   - Custom integrations

## KYB Wizard Flow

1. **Business Information** - Company details and registration
2. **Contact Details** - Authorized representative information
3. **Document Upload** - Required verification documents
4. **Wallet Generation** - Secure blockchain wallet creation
5. **Investment Policy** - Risk tolerance and compliance agreements
6. **Completion** - Verification submission and confirmation

## Integration Points

- Router configuration updated to use LandingPage as homepage
- KYB wizard triggers after subscription selection
- Wallet generation integrated into verification flow
- Policy creation as final step before completion

## Next Steps for Production

1. Replace mock Stripe functions with real Stripe API calls
2. Implement backend payment processing endpoints
3. Add proper error handling and loading states
4. Implement webhook handling for subscription events
5. Add customer portal for subscription management
6. Integrate with actual KYB/AML verification services
7. Implement real wallet generation with secure key management

## Testing

For testing purposes, you can use Stripe's test mode with test card numbers:

- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Insufficient funds: 4000 0000 0000 9995

## Support

For Stripe-specific questions, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe React Integration](https://stripe.com/docs/stripe-js/react)
- [Stripe Subscriptions Guide](https://stripe.com/docs/billing/subscriptions)