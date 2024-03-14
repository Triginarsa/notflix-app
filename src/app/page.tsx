import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="flex flex-col justify-center bg-black/80 w-full h-full lg:bg-black/70 items-center md:items-start">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            alt="Netflix Logo"
            width={150}
            height={50}
          />
        </nav>
        <div className="flex flex-col justify-center items-center m-auto px-6">
          <h1 className="text-white text-5xl font-bold text-center mb-2">
            Unlimited movies, TV <br /> shows, and more
          </h1>
          <h2 className="text-white mb-6">
            Starts at IDR 54,000. Cancel anytime.
          </h2>
          <Link href="/auth" className="w-full ">
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
