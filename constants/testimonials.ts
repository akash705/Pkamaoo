
import { Language, Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    text: {
      [Language.EN]: 'I couldn\'t believe how easy it was. I started earning from the first day. This platform changed my life!',
      [Language.HI]: 'Mujhe yakeen nahi hua ki yeh kitna aasan tha. Maine pehle din se hi kamana shuru kar diya. Is platform ne meri life badal di!',
    },
    image: 'https://picsum.photos/id/1027/100/100',
  },
  {
    id: 2,
    name: 'Amit Singh',
    location: 'Delhi',
    text: {
      [Language.EN]: 'Finally, a real way to earn from home. I paid off my student loans in just 3 months. Highly recommended!',
      [Language.HI]: 'Finally, ghar se kamane ka ek asli tareeka mila. Maine sirf 3 mahino mein apna student loan chuka diya. Highly recommended!',
    },
    image: 'https://picsum.photos/id/1005/100/100',
  },
  {
    id: 3,
    name: 'Sunita Devi',
    location: 'Patna, Bihar',
    text: {
      [Language.EN]: 'As a housewife, I wanted to support my family. Now I earn more than my husband! Thank you PaisaKamaoo!',
      [Language.HI]: 'Ek housewife hone ke naate, main apni family ko support karna chahti thi. Ab main apne husband se zyada kamati hoon! Thank you PaisaKamaoo!',
    },
    image: 'https://picsum.photos/id/1025/100/100',
  },
];