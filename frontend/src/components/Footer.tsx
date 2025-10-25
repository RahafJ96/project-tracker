export default function Footer() {
  return (
    <footer className="border-t bg-white/70 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-5 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} ProjectTracker</p>
        <p className="opacity-80">Built with React + Tailwind</p>
      </div>
    </footer>
  );
}
