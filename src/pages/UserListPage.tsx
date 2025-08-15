import { useState, useEffect, useCallback } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Search, Trash2 } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { Pagination } from "../components/common/Pagination";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  signupDate: string;
  subscriptionStatus: "Active" | "Inactive";
}

interface UsersResponse {
  users: User[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}

// Mock API calls
const fetchUsers = async (page = 1, search = ""): Promise<UsersResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const allUsers: User[] = [
    {
      id: "1",
      name: "Ricardo Mathew",
      email: "ricardomathew@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "08 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "2",
      name: "Ricardo Mathew",
      email: "ricardomathew@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "07 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "3",
      name: "Ricardo Mathew",
      email: "ricardomathew@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "06 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "4",
      name: "John Smith",
      email: "smithjohn@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "05 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "5",
      name: "John Smith",
      email: "smithjohn@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "04 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "6",
      name: "Dyne Orwell",
      email: "dyneorwell@hotmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "01 Aug, 10:30",
      subscriptionStatus: "Active",
    },
    {
      id: "7",
      name: "Dyne Orwell",
      email: "dyneorwell@hotmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "01 Aug, 10:30",
      subscriptionStatus: "Inactive",
    },
    {
      id: "8",
      name: "Sarah Johnson",
      email: "sarah.johnson@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "31 Jul, 15:45",
      subscriptionStatus: "Active",
    },
    {
      id: "9",
      name: "Mike Wilson",
      email: "mike.wilson@yahoo.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "30 Jul, 09:20",
      subscriptionStatus: "Inactive",
    },
    {
      id: "10",
      name: "Emma Davis",
      email: "emma.davis@outlook.com",
      avatar: "/placeholder.svg?height=40&width=40",
      signupDate: "29 Jul, 14:10",
      subscriptionStatus: "Active",
    },
  ];

  // Filter users based on search
  let filteredUsers = allUsers;
  if (search) {
    filteredUsers = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Pagination
  const usersPerPage = 7;
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    totalPages: Math.ceil(filteredUsers.length / usersPerPage),
    currentPage: page,
    totalUsers: filteredUsers.length,
  };
};

const deleteUser = async (userId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Deleting user ${userId}`);
};

export function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const loadUsers = useCallback(async (page: number, search: string) => {
    setIsLoading(true);
    try {
      const response = await fetchUsers(page, search);
      setUsers(response.users);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setTotalUsers(response.totalUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load users when component mounts or search/page changes
  useEffect(() => {
    loadUsers(currentPage, debouncedSearchTerm);
  }, [loadUsers, currentPage, debouncedSearchTerm]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) return;
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, searchTerm, currentPage]);

  const handleDeleteUser = async (userId: string) => {
    setDeletingUserId(userId);
    try {
      await deleteUser(userId);
      // Reload users after deletion
      await loadUsers(currentPage, debouncedSearchTerm);
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          User Management
        </h1>
        <p className="text-gray-600">Show all Users</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search .."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium text-gray-700">
                <div className="flex items-center gap-1">
                  Name
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Signup Date
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Subscription Status
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              [...Array(7)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
                        <div className="h-3 bg-gray-200 rounded w-40 animate-pulse" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 bg-gray-200 rounded w-8 animate-pulse" />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {user.signupDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.subscriptionStatus === "Active"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        user.subscriptionStatus === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          user.subscriptionStatus === "Active"
                            ? "bg-green-500"
                            : "bg-gray-500"
                        }`}
                      />
                      {user.subscriptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={deletingUserId === user.id}
                      className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && users.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
