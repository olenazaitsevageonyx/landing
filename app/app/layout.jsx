export const metadata = {
  title: 'GEONYX — AI Recommendation Intelligence',
  description:
    'GEONYX measures how AI models recognize, recommend and cite entities, across global and sovereign models, and quantifies what to change.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
