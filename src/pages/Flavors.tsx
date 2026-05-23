// import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for the flavors. 
// Later, this could be fetched from your Supabase/Prisma backend!
const flavorData = [
    {
        id: 'f1',
        name: 'Sapi Panggang',
        subtitle: 'Beef Barbeque',
        description: 'The legendary classic. Deep, smoky barbeque notes layered with savory beef extract perfectly embedded in every crinkle.',
        color: 'border-orange-500/50',
        badge: 'SAVORY',
        badgeColor: 'bg-orange-500',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm4urF7AXlhJm138JKyk6IlVon8u0ZnCtyaxjM-z0QZTbF-f7XGVA6bz2-15RfWzhe3F2QdEC-Dr4p3ROaHa6XQHVR-haW2slg9V4EtS3VF25jG1WaqlDbkkMVSjiT79c1dtJVIF2q48x9PLBh7QhsirHeO2sLZ_WTgfH96_jB2C7-RtxFk4_Xq0al3wGNtzm547WWGLf3VXFbyvckdZX6fI38r1y17uT-LxalKI9npdw-a9WUwVPTD-k8H2XaKNro_yZ0HxHzo-s',
        imageAlt: 'Chitato Sapi Panggang brown packaging',
        spiciness: 1,
    },
    {
        id: 'f2',
        name: 'Ayam Bumbu',
        subtitle: 'Spicy Chicken',
        description: 'A bold kick of exotic spices and savory roasted chicken flavor. Designed for those who crave a little heat.',
        color: 'border-red-500/50',
        badge: 'SPICY',
        badgeColor: 'bg-red-500',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFv-ujkitwuErnWZBnxYIAwsuB-MrlBdpNhFNgxbpOK9WWObcXQy3RILIvnGlYdMY5WoBrGcpKjni6v4JcOvxj14u3whz_jR0OdO4Ky-G7yqr3FwJlcBcT9BNz6tEBmetbIagqOZtKxFGcP6HtvPj6rxIfu4ouP5K-0jj-AuMwlzAZcEfpd_5lK9qJLpCjKLMTIkC-oNM72lehhir9WpzIJEMlvmQhR1vaACVkG__6DOYsI55n4qtYrgabiSu5IZqtCXyyyYUUmWQ',
        imageAlt: 'Chitato Ayam Bumbu red packaging',
        spiciness: 3,
    },
    {
        id: 'f3',
        name: 'Keju Supreme',
        subtitle: 'Supreme Cheese',
        description: 'Rich, creamy, and undeniably cheesy. A thick coating of premium cheese dust that melts in your mouth.',
        color: 'border-yellow-500/50',
        badge: 'PREMIUM',
        badgeColor: 'bg-yellow-500',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAS2i8-pVijj-0qQ7INAoMHGTb5J7ecd885mHjQvy2Omalqi_X_0XtdMNYJtDoZs9UkZekv4a2qj9SwR1fQ4wbFGtp95zzMPlZwidXX1MI-bObdLvw1Kxk-fhVsj1oHEeEWKlQ8q8cNcV95nhJpqKIk_4y8PcNk58LqvbmXwUB0c0Nuh3WMqqp0Bp9qC_f092OZI3RZMW-zKqAzITdGFLU5fVeu1mIESZ_ebWj3JHC5wRgqjzsLmzL3bzXv6Ugz-2QlrIMGPxS3dg',
        imageAlt: 'Chitato Keju Supreme yellow packaging',
        spiciness: 0,
    },
    {
        id: 'f4',
        name: 'Indomie Goreng',
        subtitle: 'Special Collaboration',
        description: 'Two legends collide. The unmistakable, savory perfection of Indomie Mi Goreng packed into crunchy potato chips.',
        color: 'border-red-600/50',
        badge: 'LIMITED',
        badgeColor: 'bg-red-600',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNQF6nyZbzaebio5ep2sN_ti1qBEM2Nj-PmxmguAReSQfpQR7Hy0yN5dlmAdp1bnp_JaGNgzkbI4uO093gjnPuESn_yrRnDDOmep5VaHJa9IPdR4uQ5U-SrYM-bSVxqkM9jcTaMJ6uJ7MAEmuXc36MyngJVLKZjYVMcvREmiZCZ-8K3NfouttYrI-y3e2aITkUM8PBVwxbf80K0LXeiywOFV3tJqloqNQ-YY7bYTlWNg7O5_dqXsThgLcPUcUGiVPcJ6byMR_6lx0', 
        imageAlt: 'Chitato Indomie Goreng packaging',
        spiciness: 2,
    }
];

export default function Flavors() {
    return (
        <div className="min-h-screen bg-background text-on-surface font-body-md selection:bg-primary selection:text-on-primary">
            
            {/* Added Navbar */}
            <Navbar />
            
            {/* Main content with padding moved here */}
            <main className="max-w-7xl mx-auto pt-24 pb-16 px-6 md:px-12">
                {/* Page Header */}
                <header className="max-w-4xl mx-auto text-center mb-16 space-y-4">
                    <h1 className="font-display-xl text-5xl md:text-7xl font-bold text-primary-fixed italic uppercase tracking-tight">
                        Our Flavors
                    </h1>
                    <p className="font-headline-md text-xl md:text-2xl text-on-surface-variant uppercase tracking-widest">
                        Discover your crunch.
                    </p>
                    <div className="w-24 h-1 bg-primary mx-auto kick-shadow-yellow rounded-full mt-4"></div>
                </header>

                {/* Flavors Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                    {flavorData.map((flavor) => (
                        <article 
                            key={flavor.id} 
                            className={`group relative flex flex-col bg-surface-container-lowest border-2 ${flavor.color} rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 kick-shadow-yellow`}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 bg-surface-container-high flex items-center justify-center p-4 overflow-hidden">
        
                                {/* Floating Badge */}
                                <div className={`absolute top-0 right-4 z-10 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase rounded-b-md shadow-md ${flavor.badgeColor}`}>
                                    {flavor.badge}
                                </div>

                                {/* The Internet Image */}
                                <img
                                    src={flavor.imageUrl}
                                    alt={flavor.imageAlt}
                                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-6 flex flex-col grow bg-linear-to-t from-surface-container-low to-transparent">
                                <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-1 uppercase">
                                    {flavor.name}
                                </h2>
                                <span className="text-secondary-fixed text-sm font-label-bold tracking-widest uppercase mb-4 block">
                                    {flavor.subtitle}
                                </span>
                                
                                <p className="text-on-surface-variant text-sm grow mb-6">
                                    {flavor.description}
                                </p>

                                {/* Spiciness Indicator */}
                                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-surface-variant">
                                    <span className="text-xs uppercase tracking-wider font-bold text-on-surface-variant">Spiciness:</span>
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-2 h-2 rounded-full ${i < flavor.spiciness ? 'bg-red-500' : 'bg-surface-variant'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>

            {/* Added Footer */}
            <Footer />

        </div>
    );
}