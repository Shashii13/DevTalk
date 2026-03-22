import Chat from "../components/Chat";

function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Chat />
    </div>
  );
}