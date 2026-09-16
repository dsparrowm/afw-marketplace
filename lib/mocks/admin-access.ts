export type AdminMemberStatus = "active" | "invited" | "inactive";

export type AdminMemberAction = "edit-role" | "revoke" | "reactivate";

export type AdminTeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleIds: string[];
  lastActive: string;
  status: AdminMemberStatus;
  action: AdminMemberAction;
};

export type AdminRoleDefinition = {
  id: string;
  title: string;
  description: string;
};

/** Team rows from Figma `72:1657` */
export const adminTeamMembers: AdminTeamMember[] = [
  {
    id: "adaeze",
    name: "Adaeze Okafor",
    email: "adaeze@africanfoodwarehouse.ca",
    role: "Owner",
    roleIds: ["owner"],
    lastActive: "Active now",
    status: "active",
    action: "edit-role",
  },
  {
    id: "tariq",
    name: "Tariq Diallo",
    email: "tariq@africanfoodwarehouse.ca",
    role: "Admin",
    roleIds: ["admin"],
    lastActive: "15 mins ago",
    status: "active",
    action: "edit-role",
  },
  {
    id: "chioma",
    name: "Chioma Nwachukwu",
    email: "chioma@africanfoodwarehouse.ca",
    role: "Manager",
    roleIds: ["manager"],
    lastActive: "2 hours ago",
    status: "active",
    action: "edit-role",
  },
  {
    id: "babajide",
    name: "Babajide Sowande",
    email: "babajide@africanfoodwarehouse.ca",
    role: "Staff",
    roleIds: ["staff"],
    lastActive: "Yesterday",
    status: "active",
    action: "edit-role",
  },
  {
    id: "eshun",
    name: "Eshun Selassie",
    email: "eshun@africanfoodwarehouse.ca",
    role: "Staff",
    roleIds: ["staff"],
    lastActive: "Never logged in",
    status: "invited",
    action: "revoke",
  },
];

/** Role definitions from Figma `72:1715` */
export const adminRoleDefinitions: AdminRoleDefinition[] = [
  {
    id: "owner",
    title: "Owner",
    description:
      "Full root control including global financial balance parameters and warehouse locations creation.",
  },
  {
    id: "admin",
    title: "Admin",
    description:
      "Complete management access, customer listing, configuration details editing, except owner billing settings.",
  },
  {
    id: "manager",
    title: "Manager",
    description:
      "Can coordinate products, physical items inventory stock levels, order logistics, and pricing adjustments.",
  },
  {
    id: "staff",
    title: "Staff",
    description:
      "Restricted access to fulfill current orders, update warehouse stock, and check dispatch status.",
  },
];
