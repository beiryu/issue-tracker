import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

interface Props {
  status: Status;
}

const statusToColorMap: Record<
  Status,
  { label: string; color: 'red' | 'orange' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'orange' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusToColorMap[status].color}>
      {statusToColorMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;
