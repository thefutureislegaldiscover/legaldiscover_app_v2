import React from 'react';
import { CheckCircle, Copy, Edit, Watch, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskHeaderProps {
    title: string;
    code: string;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ title, code }) => (
    <div className="flex items-center space-x-3 border-b border-gray-200 pb-4">
        <CheckCircle className="w-4 h-4 text-blue-600" />
        <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {title}
            </h2>
            <div className="text-sm text-gray-500">{code}</div>
        </div>
    </div>
);

interface SectionProps {
    title: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">{title}</h3>
        {children}
    </div>
);

interface ActionButtonProps {
    icon: LucideIcon;
    label: string;
    variant?: 'primary' | 'secondary';
}

const ActionButton: React.FC<ActionButtonProps> = ({
    icon: Icon,
    label,
    variant = 'secondary',
}) => (
    <Button
        className={`hover:text-white px-4 py-2 ${variant === 'primary'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-50 text-gray-600'
            }`}
    >
        <Icon />
        <span>{label}</span>
    </Button>
);

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
        <div className="space-y-3">{children}</div>
    </div>
);

interface InfoRowProps {
    label: string;
    value: React.ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        {value}
    </div>
);

export const PrepareDiscoveryDoc: React.FC = () => (
    <div className="bg-white w-full mx-auto">
        <TaskHeader
            title="Review contract terms for TechCorp acquisition"
            code="LEG-001"
        />

        <div className="grid pt-6 grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Section title="Description">
                    <p className="text-gray-700">
                        Comprehensive review of all contract terms and conditions for the
                        TechCorp acquisition deal.
                    </p>
                </Section>

                <Section title="Acceptance Criteria">
                    <p className="text-gray-700">
                        All contract terms reviewed and documented with recommendations
                    </p>
                </Section>

                <div className="border-t border-gray-200 pt-6 flex space-x-6">
                    <ActionButton icon={Edit} label="Edit" variant="primary" />
                    <ActionButton icon={Copy} label="Clone" />
                    <ActionButton icon={Watch} label="Watch" />
                </div>
            </div>

            <div className="space-y-6">
                <Card title="Task Details">
                    <InfoRow
                        label="Status:"
                        value={
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                in progress
                            </span>
                        }
                    />
                    <InfoRow
                        label="Priority:"
                        value={
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                high
                            </span>
                        }
                    />
                    <InfoRow
                        label="Assignee:"
                        value={<span className="text-sm font-medium">Sarah Johnson</span>}
                    />
                    <InfoRow
                        label="Reporter:"
                        value={<span className="text-sm font-medium">Michael Chen</span>}
                    />
                    <InfoRow
                        label="Due Date:"
                        value={<span className="text-sm font-medium">20/01/2024</span>}
                    />
                </Card>

                <Card title="Time Tracking">
                    <InfoRow label="Estimated:" value={<span className="font-medium">16h</span>} />
                    <InfoRow label="Actual:" value={<span className="font-medium">8h</span>} />
                    <InfoRow label="Story Points:" value={<span className="font-medium">8</span>} />
                </Card>

                <Card title="Labels">
                    <div className="flex flex-wrap gap-2">
                        {['contract-review', 'acquisition', 'high-priority'].map(label => (
                            <span
                                key={label}
                                className="inline-flex px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </Card>

                <Card title="Components">
                    <span className="block text-sm text-gray-700">Legal Research</span>
                    <span className="block text-sm text-gray-700">Contract Analysis</span>
                </Card>
            </div>
        </div>
    </div>
)
