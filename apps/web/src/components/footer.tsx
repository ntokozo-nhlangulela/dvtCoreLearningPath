// apps/web/src/components/footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-white text-slate-500 text-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} DVT Core Learning Path. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs">
          <span className="hover:text-slate-800 transition-colors">Privacy</span>
          <span className="hover:text-slate-800 transition-colors">Terms</span>
          <span className="hover:text-slate-800 transition-colors">Support</span>
        </div>
      </div>
    </footer>
  );
}