import Papa from 'papaparse';
import { useQuery } from '@tanstack/react-query';

interface SummaryData {
  repo_name: string;
  authored_loc: number;
  non_authored_loc: number;
  loc_comment: number;
  loc_blank: number;
  loc_files: number;
  lang_count: number;
  languages: string;
  security_findings: string;
  documentation_quality: string;
  repo_rating_score: number;
  repo_rating_label: string;
  projects?: any[]; // Added for future extension
}

const parseCSV = (csvText: string): SummaryData => {
  const results = Papa.parse(csvText, { header: true });
  const data = results.data as any[];

  if (data.length === 0) {
    throw new Error('CSV file is empty');
  }

  const firstRow = data[0];

  return {
    repo_name: firstRow.repo_name || 'Unknown',
    authored_loc: parseInt(firstRow.authored_loc) || 0,
    non_authored_loc: parseInt(firstRow.non_authored_loc) || 0,
    loc_comment: parseInt(firstRow.loc_comment) || 0,
    loc_blank: parseInt(firstRow.loc_blank) || 0,
    loc_files: parseInt(firstRow.loc_files) || 0,
    lang_count: parseInt(firstRow.lang_count) || 0,
    languages: firstRow.languages || '',
    security_findings: firstRow.security_findings || 'Unknown',
    documentation_quality: firstRow.documentation_quality || 'Unknown',
    repo_rating_score: parseFloat(firstRow.repo_rating_score) || 0,
    repo_rating_label: firstRow.repo_rating_label || 'Unknown',
  };
};

export const fetchSummaryData = async (): Promise<SummaryData> => {
  try {
    const response = await fetch('/outputs/summary_all.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch summary data: ${response.status} ${response.statusText}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error('Error fetching summary data:', error);
    throw error;
  }
};

export const useSummaryData = () => {
  return useQuery({
    queryKey: ['summaryData'],
    queryFn: fetchSummaryData,
    retry: false,
  });
};
