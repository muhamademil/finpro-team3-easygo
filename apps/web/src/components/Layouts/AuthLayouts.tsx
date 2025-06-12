export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://res.cloudinary.com/dohpngcuj/image/upload/v1749670451/Bg-1_jzzsja.png)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
