export interface UserProfile {
  name: string;
  stage: 'pregnant' | 'mama';
  dueDate?: string;
  babyName?: string;
  babyBirthDate?: string;
  currentMilestone?: string;
  babyMonths?: string;
  isFirstBaby?: boolean;
}

export interface Supplement {
  id: string;
  name: string;
  icon: string;
  taken: number;
  target: number;
  unit: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  tag: string;
  title: string;
  body: string;
  image?: string;
  upvotes: number;
  commentsCount: number;
  voted?: 'up' | 'down';
  saved?: boolean;
}

export interface MilestoneItem {
  id: string;
  title: string;
  timeframe: string;
  status: 'completed' | 'soon' | 'future';
  icon: string;
  description: string;
}

export interface LearningItem {
  id: string;
  title: string;
  duration: string;
  type: string;
  tag: 'Recommended' | 'Video' | 'Article';
  image?: string;
  icon?: string;
}
