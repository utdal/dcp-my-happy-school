import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Calendar, 
  Clock, 
  Search,
  Star,
  StarOff,
  Trash2,
  PenSquare,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function TeacherMessages() {
  const [activeClassTab, setActiveClassTab] = useState("grade6");
  const [activeMessageTab, setActiveMessageTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // New message state
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageContent, setNewMessageContent] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [composeDialogOpen, setComposeDialogOpen] = useState(false);

  // Mock data for parents
  const parentsData = {
    grade6: [
      { id: 1, name: "John Johnson", avatar: "JJ", student: "Emma Johnson" },
      { id: 2, name: "Sarah Williams", avatar: "SW", student: "David Williams" },
      { id: 3, name: "Robert Brown", avatar: "RB", student: "Lisa Brown" }
    ],
    grade7: [
      { id: 4, name: "Mary Davis", avatar: "MD", student: "Michael Davis" },
      { id: 5, name: "James Wilson", avatar: "JW", student: "Emily Wilson" },
      { id: 6, name: "Patricia Miller", avatar: "PM", student: "Thomas Miller" }
    ],
    grade8: [
      { id: 7, name: "Jennifer Taylor", avatar: "JT", student: "Andrew Taylor" },
      { id: 8, name: "Charles Anderson", avatar: "CA", student: "Olivia Anderson" },
      { id: 9, name: "Linda Martinez", avatar: "LM", student: "Daniel Martinez" }
    ]
  };

  // Mock data for messages
  const [messagesData, setMessagesData] = useState({
    grade6: {
      inbox: [
        {
          id: 1,
          from: "John Johnson",
          avatar: "JJ",
          student: "Emma Johnson",
          subject: "Math Homework Question",
          content: "Dear Teacher,\n\nEmma is having some difficulty with the fractions homework assigned yesterday. Could you provide some additional examples or resources to help her understand the concept better?\n\nThank you for your help.\n\nBest regards,\nJohn Johnson",
          date: "May 18, 2025",
          time: "2:30 PM",
          read: true,
          starred: true
        },
        {
          id: 2,
          from: "Sarah Williams",
          avatar: "SW",
          student: "David Williams",
          subject: "Absence Notification",
          content: "Dear Teacher,\n\nI wanted to inform you that David will be absent tomorrow due to a doctor's appointment. Could you please let me know what assignments he will miss so we can make sure he stays caught up?\n\nThank you,\nSarah Williams",
          date: "May 17, 2025",
          time: "10:15 AM",
          read: false,
          starred: false
        },
        {
          id: 3,
          from: "Robert Brown",
          avatar: "RB",
          student: "Lisa Brown",
          subject: "Parent-Teacher Conference",
          content: "Dear Teacher,\n\nI would like to schedule a parent-teacher conference to discuss Lisa's progress in mathematics. I'm available any day next week after 4:00 PM.\n\nPlease let me know what times work for you.\n\nRegards,\nRobert Brown",
          date: "May 15, 2025",
          time: "4:45 PM",
          read: true,
          starred: false
        }
      ],
      sent: [
        {
          id: 101,
          to: "John Johnson",
          avatar: "JJ",
          student: "Emma Johnson",
          subject: "Re: Math Homework Question",
          content: "Dear Mr. Johnson,\n\nThank you for reaching out about Emma's difficulty with fractions. I've attached some additional practice problems and a link to a helpful video that explains the concept in a different way.\n\nPlease let me know if Emma still has questions after reviewing these materials. I'm also available for a quick meeting before or after school if needed.\n\nBest regards,\nJohn Doe",
          date: "May 18, 2025",
          time: "3:45 PM"
        },
        {
          id: 102,
          to: "All Grade 6 Parents",
          avatar: "G6",
          student: "All Students",
          subject: "Upcoming Math Quiz",
          content: "Dear Parents,\n\nThis is a reminder that we will have a math quiz on fractions this Friday. Students should review their homework from this week and the practice problems we completed in class.\n\nIf your child needs additional help, I'm available during lunch period on Wednesday and Thursday.\n\nBest regards,\nJohn Doe",
          date: "May 16, 2025",
          time: "5:20 PM"
        }
      ]
    },
    grade7: {
      inbox: [
        {
          id: 4,
          from: "Mary Davis",
          avatar: "MD",
          student: "Michael Davis",
          subject: "Missing Assignment",
          content: "Dear Teacher,\n\nI noticed that Michael has a missing assignment in the online gradebook. He insists that he turned it in last week. Could you please check if it was misplaced?\n\nThank you for your help.\n\nRegards,\nMary Davis",
          date: "May 19, 2025",
          time: "9:30 AM",
          read: false,
          starred: true
        },
        {
          id: 5,
          from: "James Wilson",
          avatar: "JW",
          student: "Emily Wilson",
          subject: "Advanced Math Opportunities",
          content: "Dear Teacher,\n\nEmily has expressed interest in more challenging math problems. Are there any advanced opportunities or math competitions that she could participate in?\n\nThank you for your consideration.\n\nBest,\nJames Wilson",
          date: "May 16, 2025",
          time: "3:45 PM",
          read: true,
          starred: false
        }
      ],
      sent: [
        {
          id: 103,
          to: "Mary Davis",
          avatar: "MD",
          student: "Michael Davis",
          subject: "Re: Missing Assignment",
          content: "Dear Mrs. Davis,\n\nI've checked my records and found Michael's assignment. It was submitted but was in a different folder. I've updated the gradebook to reflect his score.\n\nThank you for bringing this to my attention.\n\nBest regards,\nJohn Doe",
          date: "May 19, 2025",
          time: "11:20 AM"
        }
      ]
    },
    grade8: {
      inbox: [
        {
          id: 6,
          from: "Jennifer Taylor",
          avatar: "JT",
          student: "Andrew Taylor",
          subject: "Extra Credit Opportunity",
          content: "Dear Teacher,\n\nAndrew is very interested in improving his grade before the end of the semester. Are there any extra credit opportunities available?\n\nThank you,\nJennifer Taylor",
          date: "May 18, 2025",
          time: "7:15 PM",
          read: true,
          starred: false
        },
        {
          id: 7,
          from: "Charles Anderson",
          avatar: "CA",
          student: "Olivia Anderson",
          subject: "Algebra Tutoring",
          content: "Dear Teacher,\n\nOlivia is struggling with the recent algebra concepts. Do you offer any tutoring sessions or can you recommend a good tutor?\n\nThank you for your help.\n\nRegards,\nCharles Anderson",
          date: "May 17, 2025",
          time: "2:10 PM",
          read: false,
          starred: false
        }
      ],
      sent: [
        {
          id: 104,
          to: "Jennifer Taylor",
          avatar: "JT",
          student: "Andrew Taylor",
          subject: "Re: Extra Credit Opportunity",
          content: "Dear Mrs. Taylor,\n\nI do have an extra credit assignment available for students who want to improve their grades. Andrew can create a presentation on a real-world application of the algebra concepts we've been studying.\n\nThe assignment details are attached. The deadline is next Friday.\n\nBest regards,\nJohn Doe",
          date: "May 19, 2025",
          time: "8:30 AM"
        }
      ]
    }
  });

  const filteredMessages = (grade, folder) => {
    const messages = messagesData[grade][folder];
    if (!searchQuery) return messages;
    
    return messages.filter(msg => 
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (folder === "inbox" ? msg.from.toLowerCase().includes(searchQuery.toLowerCase()) : 
                           msg.to.toLowerCase().includes(searchQuery.toLowerCase())) ||
      msg.student.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const unreadCount = (grade) => {
    return messagesData[grade].inbox.filter(msg => !msg.read).length;
  };

  const totalUnreadCount = () => {
    return unreadCount("grade6") + unreadCount("grade7") + unreadCount("grade8");
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    
    // Mark as read if it's from inbox and unread
    if (activeMessageTab === "inbox" && !message.read) {
      setMessagesData(prev => {
        const updatedMessages = { ...prev };
        const gradeInbox = [...updatedMessages[activeClassTab].inbox];
        
        const index = gradeInbox.findIndex(msg => msg.id === message.id);
        if (index !== -1) {
          gradeInbox[index] = { ...gradeInbox[index], read: true };
        }
        
        updatedMessages[activeClassTab].inbox = gradeInbox;
        return updatedMessages;
      });
    }
  };

  const handleStarMessage = (messageId, isStarred) => {
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      const gradeInbox = [...updatedMessages[activeClassTab].inbox];
      
      const index = gradeInbox.findIndex(msg => msg.id === messageId);
      if (index !== -1) {
        gradeInbox[index] = { ...gradeInbox[index], starred: isStarred };
      }
      
      updatedMessages[activeClassTab].inbox = gradeInbox;
      return updatedMessages;
    });
  };

  const handleDeleteMessage = (messageId) => {
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      const folder = activeMessageTab;
      updatedMessages[activeClassTab][folder] = updatedMessages[activeClassTab][folder].filter(
        msg => msg.id !== messageId
      );
      return updatedMessages;
    });
    
    setSelectedMessage(null);
    
    toast({
      title: "Message deleted",
      description: "The message has been moved to trash.",
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }
    
    const newReply = {
      id: Date.now(),
      to: selectedMessage.from || selectedMessage.to,
      avatar: selectedMessage.avatar,
      student: selectedMessage.student,
      subject: selectedMessage.subject.startsWith("Re:") ? 
        selectedMessage.subject : 
        `Re: ${selectedMessage.subject}`,
      content: replyText,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(/(\d+)(st|nd|rd|th)/, '$1'),
      time: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      updatedMessages[activeClassTab].sent = [
        newReply,
        ...updatedMessages[activeClassTab].sent
      ];
      return updatedMessages;
    });
    
    setReplyText("");
    setActiveMessageTab("sent");
    setSelectedMessage(newReply);
    
    toast({
      title: "Message sent",
      description: "Your reply has been sent successfully.",
    });
  };

  const handleSendNewMessage = () => {
    if (!selectedParent) {
      toast({
        title: "No recipient selected",
        description: "Please select a parent to send this message to.",
        variant: "destructive"
      });
      return;
    }

    if (!newMessageSubject.trim()) {
      toast({
        title: "Missing subject",
        description: "Please enter a subject for your message.",
        variant: "destructive"
      });
      return;
    }

    if (!newMessageContent.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }
    
    let parent;
    if (selectedParent === "all") {
      parent = {
        name: `All ${activeClassTab === "grade6" ? "Grade 6" : activeClassTab === "grade7" ? "Grade 7" : "Grade 8"} Parents`,
        avatar: activeClassTab === "grade6" ? "G6" : activeClassTab === "grade7" ? "G7" : "G8",
        student: "All Students"
      };
    } else {
      parent = parentsData[activeClassTab].find(p => p.id.toString() === selectedParent);
    }
    
    const newMessage = {
      id: Date.now(),
      to: parent.name,
      avatar: parent.avatar,
      student: parent.student,
      subject: newMessageSubject,
      content: newMessageContent,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).replace(/(\d+)(st|nd|rd|th)/, '$1'),
      time: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
    
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      updatedMessages[activeClassTab].sent = [
        newMessage,
        ...updatedMessages[activeClassTab].sent
      ];
      return updatedMessages;
    });
    
    // Reset form
    setNewMessageSubject("");
    setNewMessageContent("");
    setSelectedParent("");
    setComposeDialogOpen(false);
    
    // Switch to sent tab and show the new message
    setActiveMessageTab("sent");
    setSelectedMessage(newMessage);
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${parent.name}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Parent Communication</CardTitle>
            <CardDescription>
              Communicate with parents about student progress
            </CardDescription>
          </div>
          <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <PenSquare className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Send a message to parents
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="parent" className="text-right">
                    To
                  </Label>
                  <div className="col-span-3">
                    <Select value={selectedParent} onValueChange={setSelectedParent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {activeClassTab === "grade6" ? "Grade 6" : activeClassTab === "grade7" ? "Grade 7" : "Grade 8"} Parents</SelectItem>
                        {parentsData[activeClassTab].map(parent => (
                          <SelectItem key={parent.id} value={parent.id.toString()}>
                            {parent.name} ({parent.student})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={newMessageSubject}
                    onChange={(e) => setNewMessageSubject(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="message" className="text-right pt-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={newMessageContent}
                    onChange={(e) => setNewMessageContent(e.target.value)}
                    className="col-span-3 min-h-[150px]"
                    placeholder="Type your message here..."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  onClick={handleSendNewMessage}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs value={activeClassTab} onValueChange={setActiveClassTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="grade6">
                Grade 6
                {unreadCount("grade6") > 0 && (
                  <Badge className="ml-2 bg-green-500">{unreadCount("grade6")}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="grade7">
                Grade 7
                {unreadCount("grade7") > 0 && (
                  <Badge className="ml-2 bg-green-500">{unreadCount("grade7")}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="grade8">
                Grade 8
                {unreadCount("grade8") > 0 && (
                  <Badge className="ml-2 bg-green-500">{unreadCount("grade8")}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/3">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <Tabs value={activeMessageTab} onValueChange={setActiveMessageTab}>
                  <TabsList className="mb-4 grid grid-cols-2">
                    <TabsTrigger value="inbox">
                      Inbox
                      {unreadCount(activeClassTab) > 0 && (
                        <Badge className="ml-2 bg-green-500">{unreadCount(activeClassTab)}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="inbox" className="m-0">
                    <div className="border rounded-md overflow-hidden">
                      {filteredMessages(activeClassTab, "inbox").length > 0 ? (
                        <div className="divide-y">
                          {filteredMessages(activeClassTab, "inbox").map((message) => (
                            <div 
                              key={message.id}
                              className={`p-3 cursor-pointer hover:bg-muted ${
                                selectedMessage?.id === message.id ? 'bg-muted' : ''
                              } ${!message.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                              onClick={() => handleMessageClick(message)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback>{message.avatar}</AvatarFallback>
                                  </Avatar>
                                  <span className={`font-medium ${!message.read ? 'font-bold' : ''}`}>
                                    {message.from}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStarMessage(message.id, !message.starred);
                                    }}
                                    className="text-muted-foreground hover:text-amber-500"
                                  >
                                    {message.starred ? (
                                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    ) : (
                                      <StarOff className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Re: {message.student}
                              </div>
                              <h4 className={`text-sm ${!message.read ? 'font-semibold' : ''}`}>
                                {message.subject}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {message.content.split('\n')[0]}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {message.date}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {message.time}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium">No messages found</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "No messages match your search" : "Your inbox is empty"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sent" className="m-0">
                    <div className="border rounded-md overflow-hidden">
                      {filteredMessages(activeClassTab, "sent").length > 0 ? (
                        <div className="divide-y">
                          {filteredMessages(activeClassTab, "sent").map((message) => (
                            <div 
                              key={message.id}
                              className={`p-3 cursor-pointer hover:bg-muted ${
                                selectedMessage?.id === message.id ? 'bg-muted' : ''
                              }`}
                              onClick={() => handleMessageClick(message)}
                            >
                              <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarFallback>{message.avatar}</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">To: {message.to}</span>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground mb-1">
                                Re: {message.student}
                              </div>
                              <h4 className="text-sm">{message.subject}</h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {message.content.split('\n')[0]}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {message.date}
                                </div>
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {message.time}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <h3 className="text-lg font-medium">No sent messages</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "No messages match your search" : "You haven't sent any messages yet"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="md:w-2/3">
                {selectedMessage ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{selectedMessage.subject}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span className="mr-4">
                              {activeMessageTab === "inbox" ? "From:" : "To:"} {activeMessageTab === "inbox" ? selectedMessage.from : selectedMessage.to}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {selectedMessage.date}
                            </span>
                            <span className="flex items-center ml-4">
                              <Clock className="h-3 w-3 mr-1" />
                              {selectedMessage.time}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Student: {selectedMessage.student}
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="border-t pt-4 mb-6">
                        <div className="whitespace-pre-line">
                          {selectedMessage.content}
                        </div>
                      </div>
                      
                      {activeMessageTab === "inbox" && (
                        <div>
                          <h4 className="font-medium mb-2">Reply</h4>
                          <Textarea 
                            placeholder="Type your reply here..."
                            className="min-h-[120px] mb-4"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="flex justify-end">
                            <Button 
                              onClick={handleSendReply}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-64 border rounded-lg">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Select a message</h3>
                      <p className="text-muted-foreground">
                        Choose a message from the list to view its contents
                      </p>
                      <Button 
                        className="mt-4 bg-green-600 hover:bg-green-700"
                        onClick={() => setComposeDialogOpen(true)}
                      >
                        <PenSquare className="h-4 w-4 mr-2" />
                        Compose New Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Communication Guidelines</CardTitle>
          <CardDescription>Tips for effective teacher-parent communication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">Be Clear and Specific</h4>
                <p className="text-sm text-muted-foreground">
                  When communicating with parents, be specific about their child's progress, challenges, and achievements. Use concrete examples and clear language.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-medium">Timely Responses</h4>
                <p className="text-sm text-muted-foreground">
                  Aim to respond to parent messages within 24-48 hours during school days. For urgent matters, consider a phone call instead of a message.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}