'use client';

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open, color: 'red' },
    { label: 'In Progress', value: inProgress, color: 'yellow' },
    { label: 'Closed', value: closed, color: 'green' },
  ];

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            barSize={60}
            dataKey="value"
            style={{ fill: 'var(--accent-9)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
