
import { Puppy, Parent, ScheduleEvent, NavLink, BlogPost } from './types';

export const BREEDER_CONTACT_EMAIL = 'tracyraye@icloud.com';
export const BREEDER_PHONE = '(214) 585-2519';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/Pawsomepomskies',
  instagram: 'https://www.instagram.com/pawsomepomskies/',
  tiktok: 'https://www.tiktok.com/@pawsomepomskies?lang=en',
  // Updated Google Reviews link as requested
  reviews: 'https://www.google.com/search?q=Paw-some+Pomskies+&sca_esv=378965eda3ddb2bd&sxsrf=AE3TifOeNyYwbh2Ke9utvDjwNCfz7nRO4w%3A1766778807778&ei=t-dOafCgL_uzqtsPr5Xn-Qk&ved=0ahUKEwiw2O_5g9yRAxX7mWoFHa_KOZ8Q4dUDCBE&uact=5&oq=Paw-some+Pomskies+&gs_lp=Egxnd3Mtd2l6LXNlcnAiElBhdy1zb21lIFBvbXNraWVzIDIEECMYJzIIEAAYFhgKGB4yCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wVI5wZQ5ARY5ARwAngBkAEAmAFaoAFaqgEBMbgBA8gBAPgBAZgCA6ACbMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwEzoAfpA7IHATG4B2HCBwMyLTPIBw2ACAA&sclient=gws-wiz-serp&lqi=ChFQYXctc29tZSBQb21za2llc0j3mpyvu7yAgAhaHxAAEAEQAhgAGAEYAiIRcGF3IHNvbWUgcG9tc2tpZXOSAQtkb2dfYnJlZWRlcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyeE9kMXA2V2t4Uk1sSldURmQ0TkV4VVdsQlRWMUp6VG5wS1UwMHdSUkFC4AEA-gEFCOMBECs#lkt=LocalPoiReviews&rlimm=7512529245103108893',
  goodDog: 'https://www.gooddog.com/breeders/pawsome-pomskies-texas'
};

// Check for user-uploaded logo in local storage, otherwise use a default
const getSavedLogo = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('pawsome_site_logo');
  }
  return null;
};

/**
 * SINGLE LOCATION TO CHANGE ALL WEBSITE PHOTOS
 */
export const SITE_ASSETS = {
  branding: {
    logo: getSavedLogo() || 'https://api.dicebear.com/7.x/bottts/svg?seed=pawsome&backgroundColor=2dd4bf',
    goodDogBadge: 'https://images.gooddog.com/badges/breeder_badge_gold.png', 
  },
  sections: {
    heroBackground: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000',
    aboutMain: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=1200',
  },
  parents: {
    arctic: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
    nova: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800',
    ghost: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&q=80&w=800',
  },
  puppies: {
    chicken: 'https://images.unsplash.com/photo-1591769225440-811ad7d62ca2?auto=format&fit=crop&q=80&w=800',
    koda: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
    bella: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
    ghost: 'https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&q=80&w=800',
    nova: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800',
    defaultNew: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
  },
  blogs: {
    grooming: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    training: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    health: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800',
    defaultNew: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
  }
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Lua and Don Brasil',
    date: '2024',
    rating: 5,
    text: "Paw Some Pomskies is absolutely amazing! Tracy, the owner, and her family put their whole heart into raising these dogs, and their dedication is unmatched. You can truly see how much they love and care for every single pup as if they were part of their own family. Tracy goes above and beyond to make sure each puppy is not only healthy and happy, but also has the best possible future with their new family.",
    avatar: 'LB'
  },
  {
    id: 2,
    name: 'Ally Cat',
    date: 'January 2025',
    rating: 5,
    text: "We brought home Riot (formerly Zack) in January 2025, and the experience with Tracy at Pawsome Pomskies could not have been better. She spent well over an hour on the phone answering all of my questions, was knowledgeable, and gave us an honest picture of Riot’s projected size and temperament. Both dogs are thriving! Riot is our big, playful goofball, and Rebel is our sassy little shadow.",
    avatar: 'AC'
  },
  {
    id: 3,
    name: 'Stephane Crowder',
    date: '2024',
    rating: 5,
    text: "Couldn’t have gotten my baby from any nicer of a person. I was interested in getting a Pomsky from her, so she FaceTimed me and let me pick my baby out and then met me half way to pick her up. It didn’t matter how late it was. Tracy takes very good care of her pomskies. She is a very trust worthy person. PLUS she sends you home with lots of goodies.",
    avatar: 'SC'
  },
  {
    id: 4,
    name: 'Kathy McHugh',
    date: '2024',
    rating: 5,
    text: "We adopted one of Tracy's retired girls. What a sweet, loving dog! And SO smart! All of Tracy's dogs we encountered in the process of adopting her were beautiful, healthy and well socialized and calm. Tracy and her daughter were a joy to deal with. We consider them friends now!",
    avatar: 'KM'
  },
  {
    id: 5,
    name: 'ANGIE HELM',
    date: '2023',
    rating: 5,
    text: "Paw-some Pomskies is there for you after you pick up your pup for any advise and wants to hear about the pups adventures throughout their lives. We now have 2 Pomskies from Paw-some Pomskies. She was very helpful and sent pictures of different pups to choose from along with videos.",
    avatar: 'AH'
  },
  {
    id: 6,
    name: 'Lexy Hedgecock',
    date: '2024',
    rating: 5,
    text: "We love our Wyld from Paw-Some Pomskies! He has been the best addition to our pack. Top tier communication, and was such an easy process. 10/10 would go back again for another!",
    avatar: 'LH'
  }
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Puppies', href: '#puppies' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Blogs', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Essential Grooming Tips for Your Fluffy Pomsky',
    excerpt: 'Maintain that beautiful double coat with our professional grooming guide for Pomsky owners.',
    author: 'Sarah Jenkins',
    content: [
      "The Pomsky is famous for its thick, double-layered coat that inherits qualities from both the Siberian Husky and the Pomeranian. While stunning to look at, this coat requires dedicated maintenance to keep your pup comfortable and your home (relatively) hair-free.",
      "First and foremost, never shave your Pomsky. Their double coat acts as insulation, keeping them warm in winter and cool in summer. Shaving can permanently damage the coat's texture and lead to heatstroke or skin issues.",
      "We recommend a thorough brushing at least three times a week using a high-quality slicker brush and an undercoat rake. During shedding seasons (Spring and Fall), daily brushing is essential as they 'blow' their undercoat.",
      "When it comes to bathing, aim for once every 4-6 weeks. Over-washing can strip their skin of natural oils, leading to dryness and irritation. Always use a soap-free, oatmeal-based shampoo designed specifically for dogs with sensitive skin."
    ],
    category: 'Health',
    date: 'Oct 24, 2024',
    image: SITE_ASSETS.blogs.grooming
  },
  {
    id: 'b2',
    title: 'The Secret to Training a Stubborn Pomsky',
    excerpt: 'Pomskies are intelligent but can have a mind of their own. Learn the techniques that actually work.',
    author: 'Mike Thompson',
    content: [
      "If you've spent any time with a Pomsky, you know they are incredibly smart—sometimes a bit too smart for their own good. They quickly learn how to manipulate their owners for extra treats or playtime.",
      "The key to successful Pomsky training is consistency and positive reinforcement. Because they have a Husky's independent streak and a Pomeranian's alertness, boring or repetitive training sessions will quickly lose their interest.",
      "Keep training sessions short (5-10 minutes) and highly rewarding. Use 'high-value' treats like small bits of boiled chicken or freeze-dried liver that they don't get at any other time. This makes training the highlight of their day.",
      "Patience is your best friend. A Pomsky may understand exactly what you're asking but choose to wait a few seconds before complying to see if you're really serious. Remain calm, hold your ground, and always end every session on a successful note."
    ],
    category: 'Training',
    date: 'Oct 20, 2024',
    image: SITE_ASSETS.blogs.training
  },
  {
    id: 'b3',
    title: 'Why DNA Testing is Vital for Ethical Breeding',
    excerpt: 'Understanding the genetics behind our puppies ensures a healthy and happy life for your future companion.',
    author: 'Dr. Elena Rossi',
    content: [
      "In the world of designer breeds, transparency is everything. At Paw-some Pomskies, we believe that 'pretty' isn't enough; our puppies must be healthy from the inside out. This is where advanced DNA testing becomes our most valuable tool.",
      "Every one of our breeding sires and dams undergoes extensive genetic screening through Embark or Paw Print Genetics. This allows us to identify potential carriers of over 200 genetic health conditions, ensuring we never pair two dogs that could produce an affected litter.",
      "But DNA testing goes beyond just health. It also helps us understand coat genetics, allowing us to predict colors, patterns, and even adult sizes with much higher accuracy. This data-driven approach takes the guesswork out of breeding.",
      "When you adopt from us, you receive copies of the parents' health certifications. This is our promise to you: that your new family member has the best possible genetic foundation for a long, vibrant life."
    ],
    category: 'News',
    date: 'Oct 15, 2024',
    image: SITE_ASSETS.blogs.health
  }
];

export const INITIAL_PUPPIES: Puppy[] = [
  {
    id: '1',
    name: 'Chicken',
    gender: 'Female',
    age: '8 Weeks',
    status: 'Available',
    image: SITE_ASSETS.puppies.chicken,
    description: 'Blue eyed beauty with a playful personality. She loves to snuggle and is already showing great intelligence.',
    coatColor: 'Silver & White',
    eyeColor: 'Ice Blue',
    weight: '4.2 lbs'
  },
  {
    id: '2',
    name: 'Koda',
    gender: 'Male',
    age: '10 Weeks',
    status: 'Reserved',
    image: SITE_ASSETS.puppies.koda,
    description: 'Energetic and loves outdoor adventures. Koda is very social and gets along with everyone he meets.',
    coatColor: 'Black & White',
    eyeColor: 'Heterochromia (Blue/Brown)',
    weight: '5.1 lbs'
  },
  {
    id: '3',
    name: 'Bella',
    gender: 'Female',
    age: '9 Weeks',
    status: 'Available',
    image: SITE_ASSETS.puppies.bella,
    description: 'Gentle soul with a thick, fluffy coat. She is very calm and would be a perfect companion for a quiet home.',
    coatColor: 'Cream',
    eyeColor: 'Deep Brown',
    weight: '3.8 lbs'
  },
  {
    id: '4',
    name: 'Ghost',
    gender: 'Male',
    age: '12 Weeks',
    status: 'Available',
    image: SITE_ASSETS.puppies.ghost,
    description: 'A striking all-white Pomsky with a heart of gold. He is very affectionate and highly food-motivated.',
    coatColor: 'Pure White',
    eyeColor: 'Blue',
    weight: '4.5 lbs'
  },
  {
    id: '5',
    name: 'Nova',
    gender: 'Female',
    age: '7 Weeks',
    status: 'Available',
    image: SITE_ASSETS.puppies.nova,
    description: 'The smallest of the litter but with the biggest personality! She is brave, curious, and loves toys.',
    coatColor: 'Red & White',
    eyeColor: 'Amber',
    weight: '2.9 lbs'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: 'p1',
    name: 'Arctic',
    role: 'Sire',
    breed: 'F1 Pomsky',
    weight: '18 lbs',
    image: SITE_ASSETS.parents.arctic,
    description: 'A magnificent blue-eyed sire with a perfect mask. He is known for his calm temperament and athletic build.'
  },
  {
    id: 'p2',
    name: 'Nova',
    role: 'Dam',
    breed: 'F2 Pomsky',
    weight: '14 lbs',
    image: SITE_ASSETS.parents.nova,
    description: 'A beautiful cream and white dam with a sweet, affectionate personality. She is an amazing mother to all her litters.'
  },
  {
    id: 'p3',
    name: 'Ghost',
    role: 'Sire',
    breed: 'F1 Pomsky',
    weight: '20 lbs',
    image: SITE_ASSETS.parents.ghost,
    description: 'Our stunning all-white sire. Ghost has a playful spirit and produces some of our most striking blue-eyed puppies.'
  }
];

export const INITIAL_SCHEDULE: ScheduleEvent[] = [
  {
    period: 'Spring 2024',
    event: 'Arctic x Nova Litter',
    date: 'March 15th',
    details: 'Expectation: 4-6 Puppies, Multi-color'
  },
  {
    period: 'Summer 2024',
    event: 'Ghost x Luna Litter',
    date: 'June 20th',
    details: 'Expectation: Blue-eyed furballs'
  },
  {
    period: 'Fall 2024',
    event: 'Shadow x Bella Litter',
    date: 'October 10th',
    details: 'Expectation: Mini Pomskies'
  }
];
