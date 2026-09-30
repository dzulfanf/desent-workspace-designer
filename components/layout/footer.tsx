export function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
        <p>© 2026 Desent</p>

        <div className="flex gap-6">
          <a href="#" className="hover:text-neutral-950">
            About
          </a>
          <a href="#" className="hover:text-neutral-950">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
}