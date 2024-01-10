import Form from "@/components/form/form"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { currentUser } from "@/lib/api"
import { Scroll, User, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { logout } from "./actions"
import { Button } from "@/components/ui/button"

export default async function Layout ({ children }: { children: React.ReactNode }) {
	const user = await currentUser()

	return (
		<div className="flex h-screen">
			<aside className="bg-[#005FFF] text-white p-4 max-w-xs w-full relative child:animate-fade-in overflow-hidden max-h-screen">
				<h2 className="text-2xl mb-4">Bankme</h2>

				<ul className="flex flex-col gap-4">
					<li>
						<Link href="/assignors" className="flex gap-2 items-center"><Users size="20" /> Cedentes</Link>
					</li>
					<li>
						<Link href="/payables" className="flex gap-2 items-center"><Scroll size="20" /> Recebíveis</Link>
					</li>
				</ul>

				<Image
					alt=""
					src="/img/effects/circle.svg"
					width="1000" height="1000"
					className="absolute bottom-[10px] right-[50%]"
				/>
			</aside>

			<div className="w-full">
				<nav className="flex justify-between py-2 px-4">
					<div />

					<DropdownMenu>
						<DropdownMenuTrigger>
							<div className="flex gap-2 items-center">
								{user?.login}

								<div className="bg-slate-100 rounded-full p-1 flex justify-center items-center">
									<User />
								</div>
							</div>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem>
								<Form action={logout} className="w-full">
									<Button className="w-full">Sair</Button>
								</Form>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>

				<main className="child:animate-fade-in">{children}</main>
			</div>
		</div>
	)
}