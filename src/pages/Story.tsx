// import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Story() {
    return (
        <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary flex flex-col">
            
            <Navbar />
            
            <main className="flex-grow">
                {/* Cinematic Hero Header */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b-4 border-primary/20">
                    <div className="absolute inset-0 z-0">
                        <img
                            className="w-full h-full object-cover opacity-30 grayscale-[0.3]"
                            alt="Cinematic dark background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDtW-ggoq3Q0-2T9UcWMUq8vaTU8W-0qlQOLcilVXuJJftUGDRLCTNxDi543qPFje7N6xjWopRN4-GDbucGYlTyinRYBrpHyAu7_NZ3zUplDBG8iS90tnZAzRjk_bkioBL7GHiVRNTx_WhAAqkEbl1gssRP9s2Akngv34_9rfKcRLxzVaFMFfYO8ZomZ4jLfAfD3Qv-vC9v2Apm4nR-aj30UCw8vEg5lN31Umv4ecJsJAfuwkxpg_d8KyHvWwdMgndsY3n3GWWL6k"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 text-center px-6">
                        <h1 className="font-display-xl text-6xl md:text-8xl font-bold text-primary-fixed italic uppercase tracking-tight mb-4 drop-shadow-2xl">
                            Our Story
                        </h1>
                        <p className="font-headline-md text-xl md:text-2xl text-secondary-fixed uppercase tracking-widest max-w-2xl mx-auto">
                            Because life is never flat.
                        </p>
                    </div>
                </section>

                {/* Narrative Content Section */}
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-32">
                    
                    {/* Story Block 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <div className="w-16 h-1 bg-primary kick-shadow-yellow rounded-full"></div>
                            <h2 className="font-headline-lg text-4xl text-white uppercase italic tracking-wide">
                                The Origin of Crunch
                            </h2>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                It started with a simple idea: a potato chip shouldn't just be a snack; it should be an experience. We grew tired of the thin, fragile, and flavorless chips that dominated the shelves. We wanted something that hit back.
                            </p>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                By selecting only the highest-grade golden potatoes and slicing them thicker, we created a foundation built for extreme crunch. No compromises.
                            </p>
                        </div>
                        <div className="bg-surface-container-lowest border-2 border-white/5 rounded-2xl overflow-hidden h-96 flex items-center justify-center p-8 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNQF6nyZbzaebio5ep2sN_ti1qBEM2Nj-PmxmguAReSQfpQR7Hy0yN5dlmAdp1bnp_JaGNgzkbI4uO093gjnPuESn_yrRnDDOmep5VaHJa9IPdR4uQ5U-SrYM-bSVxqkM9jcTaMJ6uJ7MAEmuXc36MyngJVLKZjYVMcvREmiZCZ-8K3NfouttYrI-y3e2aITkUM8PBVwxbf80K0LXeiywOFV3tJqloqNQ-YY7bYTlWNg7O5_dqXsThgLcPUcUGiVPcJ6byMR_6lx0" 
                                alt="Golden Potatoes" 
                                className="object-cover w-full h-full rounded-xl opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                            />
                        </div>
                    </div>

                    {/* Story Block 2 (Reversed Layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 bg-surface-container-lowest border-2 border-white/5 rounded-2xl overflow-hidden h-96 shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary-fixed/10 to-transparent z-10"></div>
                            <img 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7rs24REchzum0yp_E2Q_jeiD8z8Ibt_V3o0J5RvFgSygXtA7_d_ghH0LkNlB8JGAi9dbTU_fh_y-EVy5CsCq5hov7s_UW6ICFSIHEUhBds0ujLCAhTviqk_lJpwTBtfm0y82UXqK1tONITYH9138VZlz-PYocPfmV6UBWpAXcO9zDExAGWxPXLxYg9uPAyzTC1g15deJvzZ8a2Ak6n42-tMObw65SEQtUxhGaZXEvQHCw90w282qln7i1ddBarZCCZ1qw1ox9eI" 
                                alt="Wavy cut engineering process" 
                                className="object-cover w-full h-full opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                            />
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <div className="w-16 h-1 bg-secondary-fixed kick-shadow-gold rounded-full"></div>
                            <h2 className="font-headline-lg text-4xl text-white uppercase italic tracking-wide">
                                Engineered for Flavor
                            </h2>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                The wavy cut isn't just an aesthetic choice. It is a precision-engineered flavor delivery system. The deep ridges exponentially increase the surface area of every single chip, allowing our bold, intense seasonings to settle securely into the grooves. 
                            </p>
                            <p className="text-on-surface-variant text-lg leading-relaxed">
                                When you bite into a Chitato, you aren't just tasting the seasoning on the surface; you are experiencing a blast of savory perfection locked deep into the architecture of the chip itself.
                            </p>
                        </div>
                    </div>

                </section>
            </main>

            <Footer />
            
        </div>
    );
}