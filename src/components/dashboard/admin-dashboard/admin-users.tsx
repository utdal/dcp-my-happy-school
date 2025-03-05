import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  ChevronLeft, 
  ChevronRight, 
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "teacher",
    department: ""
  });

  // Mock data for users
  const [usersData, setUsersData] = useState([
    { 
      id: 1, 
      name: "Michael Johnson", 
      role: "teacher", 
      email: "michael.j@example.com", 
      status: "active",
      department: "Mathematics"
    },
    { 
      id: 2, 
      name: "Sarah Williams", 
      role: "parent", 
      email: "sarah.w@example.com", 
      status: "active",
      department: ""
    },
    { 
      id: 3, 
      name: "David Brown", 
      role: "admin", 
      email: "david.b@example.com", 
      status: "active",
      department: "Administration"
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      role: "teacher", 
      email: "emily.d@example.com", 
      status: "pending",
      department: "English"
    },
    { 
      id: 5, 
      name: "Robert Wilson", 
      role: "parent", 
      email: "robert.w@example.com", 
      status: "suspended",
      department: ""
    },
    { 
      id: 6, 
      name: "Jennifer Taylor", 
      role: "teacher", 
      email: "jennifer.t@example.com", 
      status: "active",
      department: "Science"
    },
    { 
      id: 7, 
      name: "Thomas Anderson", 
      role: "parent", 
      email: "thomas.a@example.com", 
      status: "active",
      department: ""
    },
    { 
      id: 8, 
      name: "Lisa Martinez", 
      role: "teacher", 
      email: "lisa.m@example.com", 
      status: "pending",
      department: "Art"
    },
    { 
      id: 9, 
      name: "James Wilson", 
      role: "parent", 
      email: "james.w@example.com", 
      status: "active",
      department: ""
    },
    { 
      id: 10, 
      name: "Patricia Miller", 
      role: "admin", 
      email: "patricia.m@example.com", 
      status: "active",
      department: "IT"
    },
    { 
      id: 11, 
      name: "Richard Harris", 
      role: "teacher", 
      email: "richard.h@example.com", 
      status: "suspended",
      department: "Physical Education"
    },
    { 
      id: 12, 
      name: "Elizabeth Clark", 
      role: "parent", 
      email: "elizabeth.c@example.com", 
      status: "pending",
      department: ""
    }
  ]);

  // Filter users based on search query, role, and status
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Handle adding a new user
  const handleAddUser = () => {
    // Validate form
    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.role) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (usersData.some(user => user.email === newUser.email)) {
      toast({
        title: "Email already exists",
        description: "A user with this email address already exists.",
        variant: "destructive"
      });
      return;
    }

    // Create new user
    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "active",
      department: newUser.department || ""
    };

    // Add to users data
    setUsersData(prev => [user, ...prev]);

    // Reset form
    setNewUser({
      name: "",
      email: "",
      role: "teacher",
      department: ""
    });

    // Show success message
    toast({
      title: "User added",
      description: "The user has been added successfully."
    });
  };

  // Handle user status change
  const handleStatusChange = (userId, newStatus) => {
    setUsersData(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    const statusMessages = {
      active: "activated",
      suspended: "suspended",
      pending: "set to pending"
    };
    
    toast({
      title: "Status updated",
      description: `User status has been ${statusMessages[newStatus]}.`
    });
  };

  // Handle edit user
  const handleEditClick = (user) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department || ""
    });
    setIsEditDialogOpen(true);
  };

  // Handle save edited user
  const handleSaveEdit = () => {
    // Validate form
    if (!editingUser.name.trim() || !editingUser.email.trim() || !editingUser.role) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editingUser.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists (excluding the current user)
    if (usersData.some(user => user.email === editingUser.email && user.id !== editingUser.id)) {
      toast({
        title: "Email already exists",
        description: "Another user with this email address already exists.",
        variant: "destructive"
      });
      return;
    }

    // Update user
    setUsersData(prev => 
      prev.map(user => 
        user.id === editingUser.id ? { 
          ...user, 
          name: editingUser.name,
          email: editingUser.email,
          role: editingUser.role,
          department: editingUser.department || ""
        } : user
      )
    );

    // Close dialog and reset form
    setIsEditDialogOpen(false);
    setEditingUser(null);

    // Show success message
    toast({
      title: "User updated",
      description: "The user information has been updated successfully."
    });
  };

  // Handle delete user
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete user
  const confirmDelete = () => {
    if (!userToDelete) return;
    
    setUsersData(prev => prev.filter(user => user.id !== userToDelete.id));
    
    toast({
      title: "User deleted",
      description: "The user has been deleted successfully."
    });
    
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Get status badge for user
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-amber-500">Suspended</Badge>;
      default:
        return null;
    }
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-indigo-500">Administrator</Badge>;
      case "teacher":
        return <Badge className="bg-blue-500">Teacher</Badge>;
      case "parent":
        return <Badge className="bg-green-500">Parent</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage all users, approve registrations, and set permissions
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {newUser.role === "teacher" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={newUser.department}
                      onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                      className="col-span-3"
                      placeholder="Enter department"
                    />
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleAddUser}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-8 w-full md:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Role: {filterRole === "all" ? "All" : filterRole.charAt(0).toUpperCase() + filterRole.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterRole("all")}>All Users</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterRole("teacher")}>Teachers</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("parent")}>Parents</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("admin")}>Administrators</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full md:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("suspended")}>Suspended</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {paginatedUsers.length} of {filteredUsers.length} users
            </div>
          </div>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{user.department || "-"}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClick(user)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "active" ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                                <XCircle className="h-4 w-4 mr-2 text-amber-500" />
                                Suspend
                              </DropdownMenuItem>
                            ) : user.status === "suspended" ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Reactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(user)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <h3 className="font-medium">No users found</h3>
                        <p className="text-sm">
                          {searchQuery || filterRole !== "all" || filterStatus !== "all" 
                            ? "Try adjusting your search or filters" 
                            : "Add a user to get started"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information
            </DialogDescription>
          </DialogHeader>
          
          {editingUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right">
                  Role
                </Label>
                <Select 
                  value={editingUser.role} 
                  onValueChange={(value) => setEditingUser({...editingUser, role: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {editingUser.role === "teacher" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-department" className="text-right">
                    Department
                  </Label>
                  <Input
                    id="edit-department"
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter department"
                  />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              {userToDelete && <span className="font-medium"> {userToDelete.name}</span>} and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}