import Pagination from './components/Pagination';

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </main>
  );
}
