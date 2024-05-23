import Image from "next/image";

export default function BankmeLogo() {
    return (
        <Image className="w-10 h-10" src="/logo-bankme.png" alt="Bankme Logo" width={200} height={200} />
    )
}