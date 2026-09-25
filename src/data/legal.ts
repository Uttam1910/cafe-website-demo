import type { LegalSection } from '../types'

export interface LegalPageData {
  slug: 'privacy' | 'terms' | 'shipping' | 'returns'
  title: string
  metaTitle: string
  summary: string
  sections: LegalSection[]
}

export const legalPages: LegalPageData[] = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy',
    summary: 'How a café like MORNING THEORY might handle your information. Sample policy for demonstration only.',
    sections: [
      {
        heading: 'About this sample policy',
        body: [
          'This is a sample privacy policy written for a website demo. It is not legal advice and does not describe a real business. A café using this template should have its own policy reviewed by a qualified professional.',
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'When you place an order, request a table, join our loyalty club or sign up for our newsletter, we would collect the details you give us — typically your name, phone number, email and, for delivery, your address.',
          'In this demo, nothing you type is sent anywhere. Forms work entirely inside your browser and are cleared when you leave the page.',
        ],
      },
      {
        heading: 'How it would be used',
        body: [
          'To prepare and deliver your order, confirm reservations, send occasional updates you have asked for, and improve our service. We would never sell your personal information.',
        ],
      },
      {
        heading: 'Your choices',
        body: [
          'You could unsubscribe from emails at any time and ask us to correct or delete your information by contacting the café.',
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions',
    metaTitle: 'Terms & Conditions',
    summary: 'Sample terms for using a café website. Demo content, not legal advice.',
    sections: [
      {
        heading: 'Demo website',
        body: [
          'This website is a concept demo for a fictional café. Menu items, prices, locations, contact details and policies are illustrative. No purchase, reservation or membership created here is real or binding.',
        ],
      },
      {
        heading: 'Orders',
        body: [
          'In a live version, orders would be confirmed once accepted by the café. Prices would include applicable taxes as shown at checkout, and items could occasionally sell out — in that case the café would contact you to offer a swap or refund.',
        ],
      },
      {
        heading: 'Reservations',
        body: [
          'Table requests would be held for 15 minutes past the booked time. Larger groups might be asked for a small deposit, refundable with 24 hours’ notice.',
        ],
      },
      {
        heading: 'Content',
        body: [
          'Photography on this site is licensed from Unsplash and credited on the Credits page. The MORNING THEORY name and copy are part of this demo concept.',
        ],
      },
    ],
  },
  {
    slug: 'shipping',
    title: 'Delivery Policy',
    metaTitle: 'Shipping & Delivery Policy',
    summary: 'How delivery could work for a neighbourhood café. Sample policy for demonstration only.',
    sections: [
      {
        heading: 'Delivery area',
        body: [
          'Sample policy: the café would deliver within roughly 4 km of its Bandra West kitchen, using its own delivery riders. No third-party delivery partner is implied by this demo.',
        ],
      },
      {
        heading: 'Fees and timing',
        body: [
          'Delivery would cost ₹49 and be free on orders over ₹799. Most orders would arrive in 35–45 minutes; hot drinks are sealed and packed upright.',
        ],
      },
      {
        heading: 'Packaging',
        body: [
          'Cups, boxes and bags would be compostable or recyclable. You could opt out of cutlery and napkins in the delivery notes.',
        ],
      },
    ],
  },
  {
    slug: 'returns',
    title: 'Returns & Refunds',
    metaTitle: 'Returns & Refunds Policy',
    summary: 'A sample refund policy for food and drink orders. Demo content, not legal advice.',
    sections: [
      {
        heading: 'Something not right?',
        body: [
          'Food and drinks cannot be returned, but in a live version the café would always want to make it right. If an item is missing, incorrect or not up to standard, you would contact the café within 2 hours of your order.',
        ],
      },
      {
        heading: 'Refunds',
        body: [
          'Depending on the issue, the café could remake the item, offer store credit, or refund the item to the original payment method within 5–7 working days.',
        ],
      },
      {
        heading: 'Merchandise',
        body: [
          'Unused retail items such as coffee beans or cups could be returned within 7 days with proof of purchase.',
        ],
      },
    ],
  },
]
