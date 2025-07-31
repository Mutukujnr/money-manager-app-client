import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Simple line chart
export const CustomLineChartData = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="h-64 flex items-center justify-center text-gray-500">No data</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#59168B" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChartData;