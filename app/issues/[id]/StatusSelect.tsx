'use client';

import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const StatusSelect = ({ issue }: { issue: Issue }) => {
  const router = useRouter();

  const assignIssueStatus = async (status: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: status === 'unset' ? null : status,
      });
      router.refresh();
    } catch (error) {
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <div>
      <Select.Root
        defaultValue={issue.status}
        onValueChange={(status) => assignIssueStatus(status)}
      >
        <Select.Trigger style={{ width: '100%' }} placeholder="Status..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Statuses</Select.Label>
            <Select.Item value={'unset'}>Unset</Select.Item>
            {Object.values(Status)?.map((status) => (
              <Select.Item key={status} value={status}>
                <IssueStatusBadge status={status} />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </div>
  );
};

export default StatusSelect;
