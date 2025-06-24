import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="p-4 md:p-6 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <Leaf className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline text-foreground">
          EcoTrack
        </h1>
      </div>
    </header>
  );
}
