export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  initial: string;
};

/** Homepage testimonials — Figma `6:2981`, copy from `main-content.xml` */
export const testimonialsContent = {
  nodeId: "6:2981",
  badge: "Customer Stories",
  title: "Loved by Homes Across Canada",
  description:
    "Read the genuine feedback of our wonderful community experiencing premium organic African flavours coast-to-coast.",
  items: [
    {
      id: "adewale",
      quote:
        "The taste of the Elubo white yam flour was exactly what we had been searching for. Absolute premium quality, it brought back instant childhood memories of Sunday family lunch. Highly recommend African Food Warehouse!",
      author: "Adewale O.",
      location: "Toronto, ON",
      initial: "A",
    },
    {
      id: "nneka",
      quote:
        "I was highly skeptical about getting fresh scotch bonnets and plantains in northern Alberta, but everything arrived perfectly cooled and beautifully firm. The red palm oil is pure and unadulterated.",
      author: "Nneka E.",
      location: "Edmonton, AB",
      initial: "N",
    },
    {
      id: "sarah",
      quote:
        "Exceptional service and quick shipping across provinces. African Food Warehouse is now our weekly go-to for healthy organic swallows, garri, and authentic seasonings. My Canadian husband absolutely loves the Jollof mix!",
      author: "Sarah M.",
      location: "Vancouver, BC",
      initial: "S",
    },
  ] satisfies Testimonial[],
};
