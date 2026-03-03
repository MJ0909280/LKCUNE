export type Timestamped = { id?: string; createdAt?: string; updatedAt?: string };

export type HomeContent = Timestamped & {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  aboutSnippet: string;
};

export type Program = Timestamped & { title: string; description: string; level: string };
export type Branch = Timestamped & { name: string; address: string; timings: string; mapLink: string };
export type GalleryItem = Timestamped & { imageUrl: string; category: string; caption?: string };
export type Announcement = Timestamped & { text: string; color: string; visible: boolean };

export type BeltExam = Timestamped & {
  title: string;
  examDate: string;
  description: string;
  visible: boolean;
};

export type BeltRegistration = Timestamped & {
  studentName: string;
  currentBelt: string;
  applyingBelt: string;
  parentName: string;
  schoolName: string;
  branchName: string;
  phoneNumber: string;
  feeStatus: 'Paid' | 'Not Paid';
};

export type DynamicPage = Timestamped & {
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  published: boolean;
};
