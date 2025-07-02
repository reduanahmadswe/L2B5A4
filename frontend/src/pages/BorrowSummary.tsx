import { useGetBorrowSummaryQuery } from "../features/borrow/borrowApi";

const BorrowSummary = () => {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="p-4">Loading summary...</p>;
  if (isError) return <p className="p-4 text-red-600">Error loading summary</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Borrow Summary</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">ISBN</th>
            <th className="p-2 border">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          {summary?.map((s, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2 border">{s.book.title}</td>
              <td className="p-2 border">{s.book.isbn}</td>
              <td className="p-2 border">{s.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowSummary;
