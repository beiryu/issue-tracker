import { Button } from '@radix-ui/themes';

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return <Button color="red">Delete Issue {issueId}</Button>;
};

export default DeleteIssueButton;
