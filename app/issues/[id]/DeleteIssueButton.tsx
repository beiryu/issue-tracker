import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue {issueId}</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue?
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={async () => {
                  await axios.delete(`/api/issues/${issueId}`);
                  router.push('/issues');
                  router.refresh();
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
