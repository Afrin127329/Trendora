import { Barcode, CastleIcon, ListOrderedIcon, ShoppingBagIcon, User2Icon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
const items = [
  {
    title: "Create Category",
    url: "/dashboard/admin/create-category",
    icon: <CastleIcon />,
  },
  {
    title: "Create Product",
    url: "/dashboard/admin/create-product",
    icon: <ShoppingBagIcon />,
  },
  {
    title: "All Products",
    url: "/dashboard/admin/products",
    icon: <Barcode />,
  },
  {
    title: "Orders",
    url: "/dashboard/admin/orders",
    icon: <ListOrderedIcon />,
  },
  {
    title: "Users",
    url: "/dashboard/admin/users",
    icon: <User2Icon />,
  },
]
const AdminMenu = () => {
  return (
    <div className=" text-center w-full md:w-1/4">
      <SidebarProvider className="relative">
        <SidebarTrigger className="md:hidden" />
        <Sidebar variant="inset">
          <SidebarContent className="bg-inherit mt-4 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupLabel>
                <a href="/dashboard/admin" className="text-lg font-semibold mb-4 block">
                  Admin Panel
                </a>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-4">
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default AdminMenu;
