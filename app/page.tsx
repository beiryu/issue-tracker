import prisma from '@/prisma/client';
import IssueChart from './IssueChart';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </main>
  );
}
