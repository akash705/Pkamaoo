
import { Language, Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    text: {
      [Language.EN]: 'I couldn\'t believe how easy it was. I started earning from the first day. This platform changed my life!',
      [Language.HI]: 'मुझे विश्वास नहीं हुआ कि यह कितना आसान था। मैंने पहले दिन से ही कमाई शुरू कर दी। इस प्लेटफॉर्म ने मेरी जिंदगी बदल दी!',
    },
    image: 'https://picsum.photos/id/1027/100/100',
  },
  {
    id: 2,
    name: 'Amit Singh',
    location: 'Delhi',
    text: {
      [Language.EN]: 'Finally, a real way to earn from home. I paid off my student loans in just 3 months. Highly recommended!',
      [Language.HI]: 'आखिरकार, घर से कमाने का एक असली तरीका मिला। मैंने सिर्फ 3 महीनों में अपना छात्र ऋण चुका दिया। अत्यधिक सिफारिश की जाती है!',
    },
    image: 'https://picsum.photos/id/1005/100/100',
  },
  {
    id: 3,
    name: 'Sunita Devi',
    location: 'Patna, Bihar',
    text: {
      [Language.EN]: 'As a housewife, I wanted to support my family. Now I earn more than my husband! Thank you PaisaKamaoo!',
      [Language.HI]: 'एक गृहिणी के रूप में, मैं अपने परिवार का समर्थन करना चाहती थी। अब मैं अपने पति से ज्यादा कमाती हूँ! धन्यवाद पैसाकमाओ!',
    },
    image: 'https://picsum.photos/id/1025/100/100',
  },
];