import { NextPage } from 'next';

const HomePage: NextPage = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-8 px-3 py-2 pt-32">
            <h1 className="text-5xl">Welcome back, visitor!</h1>

            <h2 className="text-2xl">
                This is the <b className="underline text-blue-700">BANKME</b>{' '}
                challenge.
            </h2>
        </div>
    );
};

export default HomePage;
