import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';

export default function Navbar() {
    return (
        <div className="bg-surface/80 backdrop-blur-md dark:bg-surface/80 docked full-width top-0 sticky z-50 shadow-md border-b border-white/10 h-15">
            <nav className="flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-full">
                <div className="text-4xl mt-1.5 font-headline-md font-black italic text-primary tracking-normal cursor-default">
                    CHITATO
                </div>
                <div className="md:flex items-center gap-8">
                    <a
                        className="text-on-surface hover:text-primary transition-colors font-semibold text-label-bold hover:scale-105 transition-all duration-150"
                        href="#"
                    >
                        Shop
                    </a>
                    <a
                        className="text-on-surface hover:text-primary transition-colors text-label-bold font-semibold hover:scale-105 transition-all duration-150"
                        href="#"
                    >
                        Flavors
                    </a>
                    <a
                        className="text-on-surface hover:text-primary transition-colors text-label-bold font-semibold hover:scale-105 transition-all duration-150"
                        href="#"
                    >
                        Story
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer text-on-surface hover:text-primary transition-all duration-150 active:scale-95">
                        <ShoppingCartIcon size={24} />
                    </button>
                    <button className="cursor-pointer text-on-surface hover:text-primary transition-all duration-150 active:scale-95">
                        <UserCircleIcon size={24} />
                    </button>
                </div>
            </nav>
        </div>
    );
}
