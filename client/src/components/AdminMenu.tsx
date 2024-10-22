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
    <div className="text-center">
      <SidebarProvider className="min-h-0 mb-4 overflow-hidden">
        <SidebarTrigger />
        <Sidebar className="top-20 bottom-30 bg-zinc-800">
          <SidebarContent className="bg-inherit mt-4">
            <SidebarGroup className="overflow-hidden">
              <SidebarGroupLabel><a href="/dashboard/admin" className="text-lg font-semibold mb-4">Admin Panel</a></SidebarGroupLabel>
              <SidebarGroupContent >
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title} className="mb-4">
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
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
