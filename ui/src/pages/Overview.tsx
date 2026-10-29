import type { LucideIcon } from 'lucide-react';
import { Folder, GitBranch, Code, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { useSummaryData } from '../data/fetchers';

type MetricCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  isLoading: boolean;
};

const MetricCard = ({ title, value, icon: Icon, isLoading }: MetricCardProps) => (
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{isLoading ? 'Loading...' : value}</div>
    </CardContent>
  </Card>
);

export default function Overview() {
  const { data, isLoading, error } = useSummaryData();

  if (isLoading) return <div>Loading overview data...</div>;
  if (error) return <div>Error loading data: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Repository" value={data?.repo_name || 'N/A'} icon={Folder} isLoading={isLoading} />
        <MetricCard title="Languages" value={data?.languages || 'N/A'} icon={GitBranch} isLoading={isLoading} />
        <MetricCard title="Authored LOC" value={data?.authored_loc?.toLocaleString() || 'N/A'} icon={Code} isLoading={isLoading} />
        <MetricCard title="Security Status" value={data?.security_findings || 'N/A'} icon={ShieldAlert} isLoading={isLoading} />
      </div>
    </div>
  );
}
