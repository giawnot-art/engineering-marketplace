export const metadata = {
  title: "Engineering Marketplace",
  description: "B2B Engineering Collaboration Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
