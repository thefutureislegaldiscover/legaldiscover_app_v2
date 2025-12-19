import { FeatureItem } from '@/types/platformfeature';
import { Headphones, Database, Shield, Globe, Brain, Server } from 'lucide-react';

export const featuresData: FeatureItem[] = [
  {
    icon: Brain,
    name: 'AI Legal Assistant',
    description: 'Claude 3.5 Sonnet integration',
    status: 'ACTIVE',
  },
  {
    icon: Headphones,
    name: 'Voice Processing',
    description: 'Real-time transcription',
    status: 'ACTIVE',
  },
  {
    icon: Database,
    name: 'Database Integration',
    description: 'Westlaw & LexisNexis',
    status: 'ACTIVE',
  },
  {
    icon: Globe,
    name: 'VR Courtrooms',
    description: 'Virtual proceedings',
    status: 'BETA',
  },
  {
    icon: Shield,
    name: 'Enterprise Security',
    description: 'HIPAA & SOX compliant',
    status: 'ACTIVE',
  },
  {
    icon: Server,
    name: 'Infrastructure',
    description: 'AWS Cloud Platform',
    status: 'ACTIVE',
  },
];
