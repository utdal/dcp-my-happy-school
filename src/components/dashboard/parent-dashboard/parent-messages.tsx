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
  ChevronDown,
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

export default function ParentMessages() {
  const [activeChildTab, setActiveChildTab] = useState("emma");
  const [activeMessageTab, setActiveMessageTab] = useState("inbox");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // New message state
  const [newMessageSubject, setNewMessageSubject] = useState("");
  const [newMessageContent, setNewMessageContent] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [composeDialogOpen, setComposeDialogOpen] = useState(false);

  // Mock data for teachers
  const teachersData = {
    emma: [
      { id: 1, name: "Ms. Wilson", avatar: "MW", subject: "Mathematics" },
      { id: 2, name: "Mr. Thompson", avatar: "MT", subject: "Science" },
      { id: 3, name: "Ms. Garcia", avatar: "MG", subject: "English" }
    ],
    michael: [
      { id: 4, name: "Mr. Davis", avatar: "MD", subject: "Social Studies" },
      { id: 5, name: "Ms. Johnson", avatar: "MJ", subject: "Science" },
      { id: 6, name: "Mr. Roberts", avatar: "MR", subject: "Mathematics" },
      { id: 7, name: "Ms. Adams", avatar: "MA", subject: "English" }
    ]
  };

  // Mock data for messages
  const [messagesData, setMessagesData] = useState({
    emma: {
      inbox: [
        {
          id: 1,
          from: "Ms. Wilson",
          avatar: "MW",
          subject: "Math Quiz Results",
          content: "Dear Parent,\n\nI wanted to let you know that Emma did exceptionally well on her recent math quiz, scoring 92%. She has shown great improvement in understanding fractions.\n\nPlease continue to encourage her practice at home.\n\nBest regards,\nMs. Wilson",
          date: "May 18, 2025",
          time: "2:30 PM",
          read: true,
          starred: true
        },
        {
          id: 2,
          from: "Mr. Thompson",
          avatar: "MT",
          subject: "Science Project Reminder",
          content: "Dear Parent,\n\nThis is a reminder that Emma's science project on plant life cycles is due next Friday. Students should have their diagrams completed by then.\n\nPlease let me know if you have any questions or if Emma needs additional support.\n\nRegards,\nMr. Thompson",
          date: "May 17, 2025",
          time: "10:15 AM",
          read: false,
          starred: false
        },
        {
          id: 3,
          from: "Ms. Garcia",
          avatar: "MG",
          subject: "Reading Assignment Update",
          content: "Dear Parent,\n\nI wanted to update you on Emma's progress with her reading assignments. She has been doing very well with comprehension exercises and actively participates in class discussions.\n\nFor next week, we'll be starting a new book. Please ensure she completes the pre-reading worksheet I sent home today.\n\nThank you,\nMs. Garcia",
          date: "May 15, 2025",
          time: "4:45 PM",
          read: true,
          starred: false
        }
      ],
      sent: [
        {
          id: 101,
          to: "Ms. Wilson",
          avatar: "MW",
          subject: "Re: Math Quiz Results",
          content: "Dear Ms. Wilson,\n\nThank you for letting us know about Emma's performance. We're very proud of her progress and will continue to support her math practice at home.\n\nBest regards,\nJohn Johnson",
          date: "May 18, 2025",
          time: "5:20 PM"
        }
      ]
    },
    michael: {
      inbox: [
        {
          id: 4,
          from: "Mr. Davis",
          avatar: "MD",
          subject: "Missing History Assignment",
          content: "Dear Parent,\n\nI wanted to bring to your attention that Michael has not submitted his history essay that was due yesterday. This assignment accounts for a significant portion of his grade this quarter.\n\nPlease encourage him to complete and submit it as soon as possible. Late submissions will be accepted with a small penalty until Friday.\n\nRegards,\nMr. Davis",
          date: "May 19, 2025",
          time: "9:30 AM",
          read: false,
          starred: true
        },
        {
          id: 5,
          from: "Ms. Johnson",
          avatar: "MJ",
          subject: "Science Class Behavior",
          content: "Dear Parent,\n\nI wanted to discuss Michael's recent behavior in science class. While he is very bright and understands the material well, he has been distracting other students during lab work.\n\nI would appreciate if you could speak with him about the importance of focused work during laboratory sessions for everyone's safety and learning.\n\nPlease let me know if you'd like to schedule a call to discuss this further.\n\nBest regards,\nMs. Johnson",
          date: "May 16, 2025",
          time: "3:45 PM",
          read: true,
          starred: false
        },
        {
          id: 6,
          from: "Mr. Roberts",
          avatar: "MR",
          subject: "Math Improvement",
          content: "Dear Parent,\n\nI wanted to share some positive news about Michael's progress in mathematics. His recent quiz score showed significant improvement, and he's been more engaged during class discussions.\n\nThe extra practice appears to be helping. Please continue to encourage him to complete the optional homework problems I've been assigning.\n\nBest regards,\nMr. Roberts",
          date: "May 14, 2025",
          time: "11:20 AM",
          read: true,
          starred: false
        }
      ],
      sent: [
        {
          id: 102,
          to: "Mr. Davis",
          avatar: "MD",
          subject: "Re: Missing History Assignment",
          content: "Dear Mr. Davis,\n\nThank you for bringing this to our attention. We'll make sure Michael completes his history essay tonight and submits it tomorrow.\n\nWe appreciate your flexibility with the late submission.\n\nBest regards,\nJohn Johnson",
          date: "May 19, 2025",
          time: "12:45 PM"
        },
        {
          id: 103,
          to: "Ms. Johnson",
          avatar: "MJ",
          subject: "Re: Science Class Behavior",
          content: "Dear Ms. Johnson,\n\nThank you for letting us know about Michael's behavior in science class. We've spoken with him about the importance of being respectful and focused during lab work.\n\nHe understands the safety concerns and has promised to improve his behavior. Please let us know if you notice any further issues.\n\nBest regards,\nJohn Johnson",
          date: "May 17, 2025",
          time: "7:30 PM"
        }
      ]
    }
  });

  const filteredMessages = (child, folder) => {
    const messages = messagesData[child][folder];
    if (!searchQuery) return messages;
    
    return messages.filter(msg => 
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (folder === "inbox" ? msg.from.toLowerCase().includes(searchQuery.toLowerCase()) : 
                           msg.to.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const unreadCount = (child) => {
    return messagesData[child].inbox.filter(msg => !msg.read).length;
  };

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    
    // Mark as read if it's from inbox and unread
    if (activeMessageTab === "inbox" && !message.read) {
      setMessagesData(prev => {
        const updatedMessages = { ...prev };
        const childInbox = [...updatedMessages[activeChildTab].inbox];
        
        const index = childInbox.findIndex(msg => msg.id === message.id);
        if (index !== -1) {
          childInbox[index] = { ...childInbox[index], read: true };
        }
        
        updatedMessages[activeChildTab].inbox = childInbox;
        return updatedMessages;
      });
    }
  };

  const handleStarMessage = (messageId, isStarred) => {
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      const childInbox = [...updatedMessages[activeChildTab].inbox];
      
      const index = childInbox.findIndex(msg => msg.id === messageId);
      if (index !== -1) {
        childInbox[index] = { ...childInbox[index], starred: isStarred };
      }
      
      updatedMessages[activeChildTab].inbox = childInbox;
      return updatedMessages;
    });
  };

  const handleDeleteMessage = (messageId) => {
    setMessagesData(prev => {
      const updatedMessages = { ...prev };
      const folder = activeMessageTab;
      updatedMessages[activeChildTab][folder] = updatedMessages[activeChildTab][folder].filter(
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
      updatedMessages[activeChildTab].sent = [
        newReply,
        ...updatedMessages[activeChildTab].sent
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
    if (!selectedTeacher) {
      toast({
        title: "No recipient selected",
        description: "Please select a teacher to send this message to.",
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
    
    const teacher = teachersData[activeChildTab].find(t => t.id.toString() === selectedTeacher);
    
    const newMessage = {
      id: Date.now(),
      to: teacher.name,
      avatar: teacher.avatar,
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
      updatedMessages[activeChildTab].sent = [
        newMessage,
        ...updatedMessages[activeChildTab].sent
      ];
      return updatedMessages;
    });
    
    // Reset form
    setNewMessageSubject("");
    setNewMessageContent("");
    setSelectedTeacher("");
    setComposeDialogOpen(false);
    
    // Switch to sent tab and show the new message
    setActiveMessageTab("sent");
    setSelectedMessage(newMessage);
    
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${teacher.name}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Teacher Messages</CardTitle>
            <CardDescription>
              Communicate with your children's teachers
            </CardDescription>
          </div>
          <Dialog open={composeDialogOpen} onOpenChange={setComposeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-rose-600 hover:bg-rose-700">
                <PenSquare className="h-4 w-4 mr-2" />
                Compose Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
                <DialogDescription>
                  Send a message to {activeChildTab === "emma" ? "Emma's" : "Michael's"} teacher
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    To
                  </Label>
                  <div className="col-span-3">
                    <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        {teachersData[activeChildTab].map(teacher => (
                          <SelectItem key={teacher.id} value={teacher.id.toString()}>
                            {teacher.name} ({teacher.subject})
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
                  className="bg-rose-600 hover:bg-rose-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs value={activeChildTab} onValueChange={setActiveChildTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="emma">
                Emma Johnson
                {unreadCount("emma") > 0 && (
                  <Badge className="ml-2 bg-rose-500">{unreadCount("emma")}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="michael">
                Michael Johnson
                {unreadCount("michael") > 0 && (
                  <Badge className="ml-2 bg-rose-500">{unreadCount("michael")}</Badge>
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
                      {unreadCount(activeChildTab) > 0 && (
                        <Badge className="ml-2 bg-rose-500">{unreadCount(activeChildTab)}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="inbox" className="m-0">
                    <div className="border rounded-md overflow-hidden">
                      {filteredMessages(activeChildTab, "inbox").length > 0 ? (
                        <div className="divide-y">
                          {filteredMessages(activeChildTab, "inbox").map((message) => (
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
                      {filteredMessages(activeChildTab, "sent").length > 0 ? (
                        <div className="divide-y">
                          {filteredMessages(activeChildTab, "sent").map((message) => (
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
                              className="bg-rose-600 hover:bg-rose-700"
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
                        className="mt-4 bg-rose-600 hover:bg-rose-700"
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
          <CardDescription>Tips for effective parent-teacher communication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded-full mr-3">
                <MessageSquare className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h4 className="font-medium">Be Specific and Concise</h4>
                <p className="text-sm text-muted-foreground">
                  When messaging teachers, clearly state your concerns or questions. Include relevant details but keep messages concise.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start">
              <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded-full mr-3">
                <Clock className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h4 className="font-medium">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  Teachers typically respond within 24-48 hours during school days. For urgent matters, please call the school office directly.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}