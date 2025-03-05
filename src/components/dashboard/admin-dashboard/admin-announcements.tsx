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
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  Plus, 
  Trash2,
  Edit,
  AlertCircle,
  Calendar,
  Clock
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
import { Checkbox } from "@/components/ui/checkbox";
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

export default function AdminAnnouncements() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  
  // New announcement form state
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    priority: "general",
    audience: {
      allTeachers: true,
      allParents: true,
      specificGrades: []
    }
  });

  // Mock data for announcements
  const [announcementsData, setAnnouncementsData] = useState([
    {
      id: 1,
      title: "School Closure - Weather Advisory",
      content: "Due to the severe weather warning, the school will remain closed tomorrow. All classes will be conducted online. Please check your email for further instructions.",
      priority: "urgent",
      audience: "All Teachers, All Parents",
      date: "May 18, 2025",
      time: "2:30 PM",
      author: "David Brown"
    },
    {
      id: 2,
      title: "Annual Sports Day - Schedule Change",
      content: "The Annual Sports Day has been rescheduled to June 15th due to venue availability. All previously arranged activities will proceed as planned.",
      priority: "general",
      audience: "All Teachers, All Parents",
      date: "May 15, 2025",
      time: "10:15 AM",
      author: "David Brown"
    },
    {
      id: 3,
      title: "Teacher Professional Development Day",
      content: "Reminder: The professional development workshop will be held on May 25th. All teaching staff are required to attend. The session will focus on new educational technologies.",
      priority: "staff",
      audience: "All Teachers",
      date: "May 10, 2025",
      time: "4:45 PM",
      author: "David Brown"
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      content: "The quarterly parent-teacher conferences will be held on June 5th and 6th. Please sign up for a time slot through the parent portal.",
      priority: "general",
      audience: "All Teachers, All Parents",
      date: "May 8, 2025",
      time: "4:45 PM",
      author: "David Brown"
    },
    {
      id: 5,
      title: "End of Year Ceremony",
      content: "The end of year ceremony will be held on June 20th at 10:00 AM in the school auditorium. All students and parents are invited to attend.",
      priority: "general",
      audience: "All Teachers, All Parents",
      date: "May 5, 2025",
      time: "4:45 PM",
      author: "David Brown"
    }
  ]);

  // Filter announcements based on search query and priority
  const filteredAnnouncements = announcementsData.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.audience.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || announcement.priority === filterPriority;
    
    return matchesSearch && matchesPriority;
  });

  // Pagination
  const announcementsPerPage = 5;
  const totalPages = Math.ceil(filteredAnnouncements.length / announcementsPerPage);
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * announcementsPerPage,
    currentPage * announcementsPerPage
  );

  // Handle creating a new announcement
  const handleCreateAnnouncement = () => {
    // Validate form
    if (!newAnnouncement.title.trim() || !newAnnouncement.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Determine audience string
    let audienceString = [];
    if (newAnnouncement.audience.allTeachers) audienceString.push("All Teachers");
    if (newAnnouncement.audience.allParents) audienceString.push("All Parents");
    if (newAnnouncement.audience.specificGrades.length > 0) {
      audienceString.push(`Grades: ${newAnnouncement.audience.specificGrades.join(", ")}`);
    }

    // Create new announcement
    const announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      priority: newAnnouncement.priority,
      audience: audienceString.join(", "),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      author: "David Brown" // Hardcoded for demo
    };

    // Add to announcements data
    setAnnouncementsData(prev => [announcement, ...prev]);

    // Reset form
    setNewAnnouncement({
      title: "",
      content: "",
      priority: "general",
      audience: {
        allTeachers: true,
        allParents: true,
        specificGrades: []
      }
    });

    // Show success message
    toast({
      title: "Announcement created",
      description: "The announcement has been created and sent to the selected audience."
    });
  };

  // Handle editing an announcement
  const handleEditClick = (announcement) => {
    // Parse audience string back to object structure
    const audienceObj = {
      allTeachers: announcement.audience.includes("All Teachers"),
      allParents: announcement.audience.includes("All Parents"),
      specificGrades: []
    };

    // Extract specific grades if present
    const gradesMatch = announcement.audience.match(/Grades: (.*?)(?:,|$)/);
    if (gradesMatch && gradesMatch[1]) {
      audienceObj.specificGrades = gradesMatch[1].split(", ");
    }

    setEditingAnnouncement({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      priority: announcement.priority,
      audience: audienceObj
    });
    
    setIsEditDialogOpen(true);
  };

  // Handle saving edited announcement
  const handleSaveEdit = () => {
    // Validate form
    if (!editingAnnouncement.title.trim() || !editingAnnouncement.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Determine audience string
    let audienceString = [];
    if (editingAnnouncement.audience.allTeachers) audienceString.push("All Teachers");
    if (editingAnnouncement.audience.allParents) audienceString.push("All Parents");
    if (editingAnnouncement.audience.specificGrades && editingAnnouncement.audience.specificGrades.length > 0) {
      audienceString.push(`Grades: ${editingAnnouncement.audience.specificGrades.join(", ")}`);
    }

    // Update announcement
    setAnnouncementsData(prev => 
      prev.map(announcement => 
        announcement.id === editingAnnouncement.id ? { 
          ...announcement, 
          title: editingAnnouncement.title,
          content: editingAnnouncement.content,
          priority: editingAnnouncement.priority,
          audience: audienceString.join(", ")
        } : announcement
      )
    );

    // Close dialog and reset form
    setIsEditDialogOpen(false);
    setEditingAnnouncement(null);

    // Show success message
    toast({
      title: "Announcement updated",
      description: "The announcement has been updated successfully."
    });
  };

  // Handle deleting an announcement
  const handleDeleteClick = (announcement) => {
    setAnnouncementToDelete(announcement);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete announcement
  const confirmDelete = () => {
    if (!announcementToDelete) return;
    
    setAnnouncementsData(prev => prev.filter(announcement => announcement.id !== announcementToDelete.id));
    
    toast({
      title: "Announcement deleted",
      description: "The announcement has been deleted successfully."
    });
    
    setIsDeleteDialogOpen(false);
    setAnnouncementToDelete(null);
  };

  // Get priority badge for announcement
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-500">Urgent</Badge>;
      case "staff":
        return <Badge className="bg-blue-500">Staff Only</Badge>;
      default:
        return <Badge className="bg-green-500">General</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>
              Create and manage school-wide announcements
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement to send to teachers and parents
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    className="col-span-3"
                    placeholder="Enter announcement title"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right pt-2">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    className="col-span-3 min-h-[150px]"
                    placeholder="Enter announcement content"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select 
                    value={newAnnouncement.priority} 
                    onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="staff">Staff Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">
                    Audience
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="allTeachers" 
                        checked={newAnnouncement.audience.allTeachers}
                        onCheckedChange={(checked) => 
                          setNewAnnouncement({
                            ...newAnnouncement, 
                            audience: {
                              ...newAnnouncement.audience,
                              allTeachers: checked
                            }
                          })
                        }
                      />
                      <Label htmlFor="allTeachers">All Teachers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="allParents" 
                        checked={newAnnouncement.audience.allParents}
                        onCheckedChange={(checked) => 
                          setNewAnnouncement({
                            ...newAnnouncement, 
                            audience: {
                              ...newAnnouncement.audience,
                              allParents: checked
                            }
                          })
                        }
                      />
                      <Label htmlFor="allParents">All Parents</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleCreateAnnouncement}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Send Announcement
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
                  placeholder="Search announcements..." 
                  className="pl-8 w-full md:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={filterPriority} 
                onValueChange={setFilterPriority}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="staff">Staff Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {paginatedAnnouncements.length} of {filteredAnnouncements.length} announcements
            </div>
          </div>
          
          <div className="space-y-4">
            {paginatedAnnouncements.length > 0 ? (
              paginatedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="overflow-hidden">
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{announcement.title}</CardTitle>
                        {getPriorityBadge(announcement.priority)}
                      </div>
                      <CardDescription>
                        Sent to: {announcement.audience} • {announcement.date}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEditClick(announcement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDeleteClick(announcement)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{announcement.content}</p>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {announcement.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {announcement.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No announcements found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || filterPriority !== "all" ? 
                    "No announcements match your search criteria" : 
                    "Create your first announcement to get started"}
                </p>
              </div>
            )}
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

      {/* Edit Announcement Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
            <DialogDescription>
              Update announcement details
            </DialogDescription>
          </DialogHeader>
          
          {editingAnnouncement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({...editingAnnouncement, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({...editingAnnouncement, content: e.target.value})}
                  className="col-span-3 min-h-[150px]"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-priority" className="text-right">
                  Priority
                </Label>
                <Select 
                  value={editingAnnouncement.priority} 
                  onValueChange={(value) => setEditingAnnouncement({...editingAnnouncement, priority: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">
                  Audience
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-allTeachers" 
                      checked={editingAnnouncement.audience.allTeachers}
                      onCheckedChange={(checked) => 
                        setEditingAnnouncement({
                          ...editingAnnouncement, 
                          audience: {
                            ...editingAnnouncement.audience,
                            allTeachers: checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="edit-allTeachers">All Teachers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="edit-allParents" 
                      checked={editingAnnouncement.audience.allParents}
                      onCheckedChange={(checked) => 
                        setEditingAnnouncement({
                          ...editingAnnouncement, 
                          audience: {
                            ...editingAnnouncement.audience,
                            allParents: checked
                          }
                        })
                      }
                    />
                    <Label htmlFor="edit-allParents">All Parents</Label>
                  </div>
                </div>
              </div>
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
              This action cannot be undone. This will permanently delete the announcement
              {announcementToDelete && <span className="font-medium"> "{announcementToDelete.title}"</span>} and remove it from all user dashboards.
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