import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
"use client"

import { ChevronDownIcon } from "@radix-ui/react-icons";

import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import axiosInstance from "../../lib/axiosInstance";
import AdminLayout from "./AdminLayout";
const AdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  const getAllAdmins = async () => {
    try {
      const token = auth?.token;
      const { data } = await axiosInstance.get("/api/v1/auth/all-admin", {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      if (data?.success) {
        setAdmins(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAdmins()
  }, [])
  //@ts-ignore
  const [auth] = useAuth();

  return (
    <Layout title="Trendora - Admin Dashboard">
      <div className="container mx-auto my-6 p-3">
        <AdminLayout>
          <div className="w-full md:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Invite your team members to collaborate.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {admins?.map((admin: any) => (
                  <div className="flex items-center justify-between space-x-4" key={admin?._id}>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="Image" />
                        <AvatarFallback>{admin?.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{admin?.name == auth?.user?.name ? auth?.user?.name + "(You)" : admin?.name}</p>
                        <p className="text-sm text-muted-foreground">{admin?.email}</p>
                        <p className="text-sm text-muted-foreground">{admin?.phone}</p>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Owner{" "}
                          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="end">
                        <Command>
                          <CommandInput placeholder="Select new role..." />
                          <CommandList>
                            <CommandEmpty>No roles found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                <p>Viewer</p>
                                <p className="text-sm text-muted-foreground">
                                  Can view and comment.
                                </p>
                              </CommandItem>
                              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                <p>Developer</p>
                                <p className="text-sm text-muted-foreground">
                                  Can view, comment and edit.
                                </p>
                              </CommandItem>
                              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                <p>Billing</p>
                                <p className="text-sm text-muted-foreground">
                                  Can view, comment and manage billing.
                                </p>
                              </CommandItem>
                              <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                                <p>Owner</p>
                                <p className="text-sm text-muted-foreground">
                                  Admin-level access to all resources.
                                </p>
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </AdminLayout>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
