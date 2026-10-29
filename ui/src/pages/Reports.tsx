export default function Reports() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="mb-4">
        <a href="/outputs/summary_all.csv" download className="text-blue-600 hover:text-blue-800">
          Download Summary CSV
        </a>
      </div>
      <div>
        <a href="/outputs/ai/ai_report.json" download className="text-blue-600 hover:text-blue-800">
          Download AI Report JSON
        </a>
      </div>
    </div>
  );
}
