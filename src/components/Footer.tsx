import { InstagramLogoIcon, XLogoIcon } from '@phosphor-icons/react';

export default function Footer() {
    return (
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest full-width bg-surface-container-low border-t-4 border-primary">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-gutter py-section-gap max-w-container-max mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="text-headline-md font-headline-md font-black text-primary">
                        CHITATO
                    </div>
                    <p className="text-on-surface-variant text-sm leading-6">
                        Life is never flat. Embodying the spirit of energy, bold moves, and intense
                        flavors since 1990.
                    </p>
                    <div className="flex gap-4">
                        <a
                            className="w-10 h-10 flex items-center justify-center bg-surface-container hover:text-primary transition-colors border border-white/10 rounded-sm"
                            href="#"
                        >
                            <InstagramLogoIcon size={24} />
                        </a>
                        <a
                            className="w-10 h-10 flex items-center justify-center bg-surface-container hover:text-primary transition-colors border border-white/10 rounded-sm"
                            href="#"
                        >
                            <XLogoIcon size={24} />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <h4 className="text-white font-label-bold text-xl uppercase">Products</h4>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Sapi Panggang
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Ayam Bumbu
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Keju Supreme
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Indomie Goreng
                    </a>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <h4 className="text-white font-label-bold text-xl uppercase">Company</h4>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Story
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Contact Us
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Find a Store
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Career
                    </a>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                    <h4 className="text-white font-label-bold text-xl uppercase">Support</h4>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Privacy Policy
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        Terms of Service
                    </a>
                    <a
                        className="text-on-surface-variant hover:text-primary transition-colors"
                        href="#"
                    >
                        FAQ
                    </a>
                </div>
            </div>
            <div className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-8 border-t border-white/5 flex justify-center items-center">
                <span className="text-on-surface-variant/60 text-sm">
                    &copy; 2026 TUGAS AKHIR KWU.
                </span>
            </div>
        </footer>
    );
}
