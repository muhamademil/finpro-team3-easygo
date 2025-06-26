import { Navbar } from './Navbar';
import { Footer } from './Footer';
type MainLayoutProps = {
  children: React.ReactNode;
  user?: { name: string; photoUrl: string; verified: boolean }; // Prop user untuk Navbar
};

export const MainLayout = ({ children, user }: MainLayoutProps) => {
  return (
    <>
      <Navbar user={user} />
      <main>
        {/* 'children' di sini adalah halaman-halaman Anda (page.tsx) */}
        {children}
      </main>
      <Footer />
    </>
  );
};
