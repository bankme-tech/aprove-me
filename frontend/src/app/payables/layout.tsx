import NavigationBar from "@/components/navbar"

export default function PayablesLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className="w-full">
       <NavigationBar />
        {children}
      </main>
    )
  }