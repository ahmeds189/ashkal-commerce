import { Access, CollectionConfig } from "payload/types";

const userOrders: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user?.role === "admin") return true;
  return {
    user: {
      equals: user?.id,
    },
  };
};
export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your orders",
    description: "List of all your orders.",
  },
  access: {
    read: userOrders,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role === "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
