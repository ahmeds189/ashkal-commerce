import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { CollectionConfig } from "payload/types";
import { Product } from "../payload-types";
import { stripe } from "../../lib/stripe";

export const PRODUCT_CATEGORIES = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: `/products?category=ui_kits`,
        imageSrc: "/nav/ui-kits/mixed.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=ui_kits&sort=desc",
        imageSrc: "/nav/ui-kits/blue.jpg",
      },
      {
        name: "Bestsellers",
        href: "/products?category=ui_kits",
        imageSrc: "/nav/ui-kits/purple.jpg",
      },
    ],
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icon Picks",
        href: `/products?category=icons`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=icons&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Icons",
        href: "/products?category=icons",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Illustration",
    value: "illustration" as const,
    featured: [
      {
        name: "Favorite Illustration Picks",
        href: `/products?category=illustrations`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=illustrations&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Illustration",
        href: "/products?category=illustrations",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
  {
    label: "Wallpapers",
    value: "wallpapers" as const,
    featured: [
      {
        name: "Favorite Wallpapers",
        href: `/products?category=wallpapers`,
        imageSrc: "/nav/icons/picks.jpg",
      },
      {
        name: "New Arrivals",
        href: "/products?category=wallpapers&sort=desc",
        imageSrc: "/nav/icons/new.jpg",
      },
      {
        name: "Bestselling Wallpapers",
        href: "/products?category=wallpapers",
        imageSrc: "/nav/icons/bestsellers.jpg",
      },
    ],
  },
];

const addUser: BeforeChangeHook<Product> = async ({ req: { user }, data }) => {
  return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          const createProduct = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "USD",
              unit_amount: Math.round(data.price * 100),
            },
            description: data.description,
          });

          const updated: Product = {
            ...data,
            stripeId: createProduct.id,
            priceId: createProduct.default_price as string,
          };
          return updated;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updateProduct = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
            description: data.description,
          });

          const updated: Product = {
            ...data,
            stripeId: updateProduct.id,
            priceId: updateProduct.default_price as string,
          };
          return updated;
        }
      },
    ],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "credit",
      label: "Credit",
      type: "textarea",
      required: false,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      min: 0,
      max: 1000,
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Rejected",
          value: "rejected",
        },
      ],
    },
    {
      name: "priceId",
      type: "text",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      type: "text",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      label: "Product images",
      type: "array",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "image",
        plural: "images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
