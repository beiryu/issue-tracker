import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('../_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <div className="max-w-xl">
      <IssueForm />
    </div>
  );
};

export default NewIssuePage;
