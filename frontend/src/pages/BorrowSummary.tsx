import { useGetBorrowSummaryQuery } from "../features/borrow/borrowApi";

const BorrowSummary = () => {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="p-4">Loading summary...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading summary</p>;

 return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Borrow Summary</h1>
      
      {summary?.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">No books have been borrowed yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary?.map((s, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
