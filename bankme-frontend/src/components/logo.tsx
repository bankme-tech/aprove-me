import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <Image
            fill
            quality={80}
            priority
            src="/logo-bankme.png"
            alt="Logo"
            className="!relative object-contain"
        />
    );
};

export { Logo };
