import NavigationBar from "@/components/navbar"

export default function RegisterPayableLayout({
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