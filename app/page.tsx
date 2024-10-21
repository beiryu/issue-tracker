import Pagination from './components/Pagination';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </main>
  );
}
