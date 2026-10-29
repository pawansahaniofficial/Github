import { useSummaryData } from '../data/fetchers';

interface Project {
  name: string;
  repositories: number;
  decision: string;
  status: string;
  lastAnalyzed: string;
  failedRules: number;
}

export default function Projects() {
  const { data, isLoading, error } = useSummaryData();

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {(error as Error).message}</div>;

  // Check if project data is available in the summary data
  if (!data || !data.projects || data.projects.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            Project-level data is unavailable. This feature requires project analysis which is not currently supported.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Repositories</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Decision</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Analyzed</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Failed Rules</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data.projects.map((project: Project) => (
              <tr key={project.name}>
                <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.repositories}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    project.decision === 'ACCEPT' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>{project.decision}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{project.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.lastAnalyzed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{project.failedRules}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}