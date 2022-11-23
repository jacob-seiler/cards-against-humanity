import '../styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
