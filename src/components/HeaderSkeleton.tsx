export const HeaderSkeleton = () => {
  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="w-32 h-8 bg-muted rounded animate-pulse"></div>
        <nav className="flex space-x-4">
          <div className="w-24 h-10 bg-muted rounded animate-pulse"></div>
          <div className="w-24 h-10 bg-muted rounded animate-pulse"></div>
        </nav>
      </div>
    </header>
  );
};
