import prisma from '@/prisma/client';
import IssueChart from './IssueChart';
import { Flex, Grid } from '@radix-ui/themes';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid columns={{ initial: '1', md: '2' }}>
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </main>
  );
}
