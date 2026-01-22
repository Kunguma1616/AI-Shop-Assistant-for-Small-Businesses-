import { motion } from "framer-motion";
import { 
  Share2, 
  Instagram, 
  Facebook, 
  Calendar,
  Clock,
  Image,
  Heart,
  MessageCircle,
  Plus,
  Eye,
  ThumbsUp,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const scheduledPosts = [
  {
    id: 1,
    content: "🥐 Fresh croissants just out of the oven! Come grab yours before they're gone. #LocalBakery #FreshBaked",
    platform: "instagram",
    scheduledFor: "Today, 8:00 AM",
    status: "posted",
    engagement: { likes: 45, comments: 8 },
  },
  {
    id: 2,
    content: "☕ Beat the afternoon slump with our signature house blend. 20% off all coffees from 3-5pm today!",
    platform: "facebook",
    scheduledFor: "Today, 2:30 PM",
    status: "scheduled",
    engagement: null,
  },
  {
    id: 3,
    content: "🍞 New sourdough recipe alert! Our baker has been perfecting this for months. Available this weekend only.",
    platform: "instagram",
    scheduledFor: "Tomorrow, 9:00 AM",
    status: "draft",
    engagement: null,
  },
];

const contentIdeas = [
  { id: 1, title: "Behind the scenes: Morning prep", type: "Reel/Story" },
  { id: 2, title: "Customer spotlight: Regular of the week", type: "Photo Post" },
  { id: 3, title: "Recipe tip: Perfect coffee at home", type: "Carousel" },
  { id: 4, title: "Weekend specials announcement", type: "Story" },
];

export default function SocialMediaPage() {
  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-social/10">
                <Share2 className="w-6 h-6 text-social" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Social Media Agent
              </h1>
              <Badge className="bg-green-100 text-green-700">AI Active</Badge>
            </div>
            <p className="text-muted-foreground">
              Automated posting on Instagram & Facebook with AI-generated content
            </p>
          </div>
          <Button className="gap-2 bg-social hover:bg-social/90">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Posts This Week"
            value="12"
            change="+4"
            changeType="positive"
            icon={Share2}
            iconColor="text-social"
            delay={0}
          />
          <StatCard
            title="Total Reach"
            value="2.4K"
            change="+18%"
            changeType="positive"
            icon={Eye}
            iconColor="text-primary"
            delay={0.1}
          />
          <StatCard
            title="Engagement Rate"
            value="4.8%"
            change="+0.6%"
            changeType="positive"
            icon={Heart}
            iconColor="text-red-500"
            delay={0.2}
          />
          <StatCard
            title="New Followers"
            value="+89"
            change="+23%"
            changeType="positive"
            icon={ThumbsUp}
            iconColor="text-customer"
            delay={0.3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Post Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="stat-card"
          >
            <h3 className="font-display font-bold text-foreground mb-4">Quick Post</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  Instagram
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Facebook className="w-4 h-4 text-blue-600" />
                  Facebook
                </Button>
              </div>
              
              <Textarea 
                placeholder="What's happening at your shop today?"
                className="min-h-[120px] resize-none"
              />
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Image className="w-4 h-4" />
                  Add Image
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </Button>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs font-medium text-muted-foreground mb-2">AI Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    #LocalBusiness
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    #ShopLocal
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    #FreshFood
                  </Badge>
                </div>
              </div>
              
              <Button className="w-full bg-social hover:bg-social/90 gap-2">
                <Share2 className="w-4 h-4" />
                Post Now
              </Button>
            </div>
          </motion.div>

          {/* Scheduled Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-foreground">Scheduled Posts</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            
            <div className="space-y-4">
              {scheduledPosts.map((post) => (
                <div key={post.id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {post.platform === 'instagram' ? (
                        <Instagram className="w-4 h-4 text-pink-500" />
                      ) : (
                        <Facebook className="w-4 h-4 text-blue-600" />
                      )}
                      <span className="text-xs text-muted-foreground">{post.scheduledFor}</span>
                    </div>
                    <Badge 
                      className={
                        post.status === 'posted' ? 'bg-green-100 text-green-700' :
                        post.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2">{post.content}</p>
                  {post.engagement && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.engagement.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.engagement.comments}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Content Ideas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="stat-card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="font-display font-bold text-foreground">AI Content Ideas</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your shop's activity and trending topics
            </p>
            
            <div className="space-y-3">
              {contentIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-3 rounded-lg border border-border hover:border-social/50 hover:bg-social/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{idea.title}</p>
                    <Badge variant="outline" className="text-xs">{idea.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4 gap-2">
              Generate More Ideas
            </Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
