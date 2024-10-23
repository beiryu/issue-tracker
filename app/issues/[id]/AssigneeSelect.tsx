'use client';

import { Skeleton } from '@/app/components';
import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'next-auth';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assigIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === 'unasigned' ? null : userId,
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <div>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={(userId) => assigIssue(userId)}
      >
        <Select.Trigger style={{ width: '100%' }} placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={'unasigned'}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </div>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
};

export default AssigneeSelect;
