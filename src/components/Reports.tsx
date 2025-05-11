const data = [
  { name: "Week 1", claims: 5 },
  { name: "Week 2", claims: 8 },
  // …
];

export default function Reports() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Protection Added</p>
          <p className="text-xl font-semibold">480</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Claims Created</p>
          <p className="text-xl font-semibold">12</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Customer Satisfaction</p>
          <p className="text-xl font-semibold">92%</p>
        </div>
      </div>
      <div className="h-40">
        {/* <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="claims" barSize={20} />
          </BarChart>
        </ResponsiveContainer> */}
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-600">
            <th>Claim</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {[
            { id: "C-1003", date: "10/15/2023", status: "Resolved" },
            { id: "C-1002", date: "10/14/2023", status: "Pending" },
            { id: "C-1001", date: "10/03/2023", status: "Approved" },
          ].map((r, i) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
