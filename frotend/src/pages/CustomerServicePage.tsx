import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Send, 
  Phone,
  MessageSquare,
  Bot,
  User,
  Clock,
  CheckCheck,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const conversations = [
  {
    id: 1,
    name: "John Smith",
    platform: "whatsapp",
    lastMessage: "Do you have any organic eggs?",
    time: "2 min ago",
    unread: true,
    avatar: "JS",
  },
  {
    id: 2,
    name: "Sarah Connor",
    platform: "telegram",
    lastMessage: "I'd like to order 2 coffees for pickup",
    time: "15 min ago",
    unread: true,
    avatar: "SC",
  },
  {
    id: 3,
    name: "Mike Wilson",
    platform: "sms",
    lastMessage: "What time do you close today?",
    time: "32 min ago",
    unread: false,
    avatar: "MW",
  },
  {
    id: 4,
    name: "Emma Davis",
    platform: "whatsapp",
    lastMessage: "Thanks! See you tomorrow",
    time: "1 hr ago",
    unread: false,
    avatar: "ED",
  },
];

const chatMessages = [
  { id: 1, sender: "user", message: "Hi, do you have any organic eggs?", time: "10:30 AM" },
  { id: 2, sender: "bot", message: "Hello John! Yes, we have Free Range Organic Eggs (12 pack) in stock for £4.50. Would you like me to set one aside for you?", time: "10:30 AM" },
  { id: 3, sender: "user", message: "Yes please! What time are you open until?", time: "10:31 AM" },
  { id: 4, sender: "bot", message: "We're open today until 8pm. I've reserved the eggs for you - just mention your name at pickup. Anything else I can help with?", time: "10:31 AM" },
  { id: 5, sender: "user", message: "Do you have any sourdough bread left?", time: "10:32 AM" },
];

export default function CustomerServicePage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");

  return (
    <Layout>
      <div className="p-8 h-[calc(100vh-0px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-customer/10">
                <MessageCircle className="w-6 h-6 text-customer" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Customer Service Agent
              </h1>
              <Badge className="bg-green-100 text-green-700">AI Active</Badge>
            </div>
            <p className="text-muted-foreground">
              24/7 support via WhatsApp, Telegram & SMS powered by AI
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Messages Today"
            value="156"
            change="+23"
            changeType="positive"
            icon={MessageCircle}
            iconColor="text-customer"
            delay={0}
          />
          <StatCard
            title="Avg Response Time"
            value="< 1 min"
            icon={Clock}
            iconColor="text-green-500"
            delay={0.1}
          />
          <StatCard
            title="Orders via Chat"
            value="34"
            change="+12%"
            changeType="positive"
            icon={MessageSquare}
            iconColor="text-primary"
            delay={0.2}
          />
          <StatCard
            title="Satisfaction Rate"
            value="98.5%"
            change="+0.5%"
            changeType="positive"
            icon={CheckCheck}
            iconColor="text-inventory"
            delay={0.3}
          />
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card h-[calc(100vh-380px)] flex"
        >
          {/* Conversations List */}
          <div className="w-80 border-r border-border flex flex-col">
            <Tabs defaultValue="all" className="p-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex-1">WhatsApp</TabsTrigger>
                <TabsTrigger value="telegram" className="flex-1">Telegram</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/50 ${
                    selectedConversation.id === conv.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-foreground truncate">{conv.name}</p>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {conv.platform === 'whatsapp' && <Phone className="w-3 h-3 text-green-500" />}
                        {conv.platform === 'telegram' && <Send className="w-3 h-3 text-blue-500" />}
                        {conv.platform === 'sms' && <MessageSquare className="w-3 h-3 text-gray-500" />}
                        <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                    {conv.unread && (
                      <span className="w-2 h-2 rounded-full bg-customer" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                  {selectedConversation.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{selectedConversation.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Online via {selectedConversation.platform}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="gap-1">
                <Bot className="w-3 h-3" />
                AI Responding
              </Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-customer text-white rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {msg.sender === 'bot' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-70">{msg.time}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border flex gap-3">
              <Input
                placeholder="Type a message or let AI respond..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-customer hover:bg-customer/90 gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
