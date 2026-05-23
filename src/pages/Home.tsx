import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import ButtonPrimer from '../components/ButtonPrimer';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Footer from '../components/Footer';

type ProductSize = {
    id: string;
    size: string;
    price: number;
    stock: number;
};

type ProductVariant = {
    id: string;
    name: string;
    flavor: string;
    sizes: ProductSize[];
};

type Product = {
    id: string;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    tag: string;
    tagColor: string;
    variants: ProductVariant[];
};


export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const previewProducts = products.slice(0, 8);

    const carouselItems = [
    ...previewProducts,
    {
        id: 'see-more',
        isSeeMore: true,
    },
];

    const visibleCard = 4;

    function nextSlide() {
        if (currentIndex + visibleCard < carouselItems.length) {
            setCurrentIndex((prev) => prev + 1);
        }
    }
    function prevSlide() {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await api.get('/api/products');

                setProducts(res.data.products);
            } catch (err) {
                console.error(err);
            }
        }

        fetchProducts();
    }, []);

    function getCheapestSize(variant?: ProductVariant) {
        if (!variant?.sizes?.length) return null;

        return variant.sizes.reduce((prev, curr) =>
            curr.price < prev.price ? curr : prev
        );
    }

    async function handleAddToCart(variantSizeId?: string) {
        if (!variantSizeId) {
            alert('Variant tidak tersedia');
            return;
        }

        try {
            await api.post('/api/cart', {
                variantSizeId,
                quantity: 1,
            });

            alert('Berhasil ditambahkan ke cart');
        } catch (err) {
            console.error(err);
            alert('Gagal tambah cart');
        }
    }

    return (
        <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-white">
            <Navbar />
            <main>
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center overflow-hidden">
                    {/* background */}
                    <div className="absolute inset-0 z-0">
                        <img
                            className="w-full h-full object-cover opacity-60"
                            data-alt="A high-end cinematic product shot of deep-ridged potato chips cascading through a dark, atmospheric space. Warm golden lighting highlights the textures of the spices and the crunchy ridges of the chips, set against a deep charcoal and mahogany background. The mood is premium, bold, and intensely flavorful, with soft smoke or steam adding to the sensory experience."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDtW-ggoq3Q0-2T9UcWMUq8vaTU8W-0qlQOLcilVXuJJftUGDRLCTNxDi543qPFje7N6xjWopRN4-GDbucGYlTyinRYBrpHyAu7_NZ3zUplDBG8iS90tnZAzRjk_bkioBL7GHiVRNTx_WhAAqkEbl1gssRP9s2Akngv34_9rfKcRLxzVaFMFfYO8ZomZ4jLfAfD3Qv-vC9v2Apm4nR-aj30UCw8vEg5lN31Umv4ecJsJAfuwkxpg_d8KyHvWwdMgndsY3n3GWWL6k"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
                    </div>
                    {/* background */}

                    <div className="relative z-10 w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
                        <div className="md:col-span-7 flex flex-col items-start gap-1 cursor-default">
                            <h1 className="text-headline-lg drop-shadow-2xl drop-shadow-taupe-950 md:text-display-xl font-display-xl leading-none font-semibold text-white uppercase italic tracking-tight">
                                Life Is <br />
                                <span className="text-primary">Never Flat</span>
                            </h1>
                            <p className="font-light font-body-lg text-on-surface-variant max-w-lg drop-shadow-lg mb-6">
                                Experience the ultimate crunch of the original ridged potato chips.
                                Bold flavors, signature textures, and zero compromises.
                            </p>
                            <ButtonPrimer
                                text="BELANJA SEKARANG"
                                extraClasses="active:bg-primary-container px-8 py-4"
                                onClick={() => {
                                    const shopSection = document.getElementById('shopping');
                                    if (shopSection) {
                                        shopSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            />
                        </div>
                        <div className="hidden md:flex md:col-span-5 justify-end">
                            <div className="relative">
                                <img
                                    className="w-full scale-130 max-w-md drop-shadow-2xl animate-bounce duration-3000 ease-in-out brightness-85"
                                    data-alt="img..."
                                    src="/Chitato.png"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <!-- Wavy Section Divider --> */}
                    <div className="absolute -bottom-1 left-0 w-full h-24 bg-surface-container-lowest wavy-separator"></div>
                </section>

                {/* About Section */}
                <section className="bg-surface-container-lowest py-section-gap relative overflow-hidden">
                    {/* image */}
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                        <svg className="w-full h-full fill-primary">
                            <path d="M0,50 Q25,0 50,50 T100,50 V100 H0 Z"></path>
                        </svg>
                    </div>
                    {/* image */}

                    <div className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1">
                                <div className="bg-surface-container-high p-4 rounded-lg chip-shadow border border-white/5">
                                    <img
                                        className="w-full aspect-video object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
                                        data-alt="Close up shot of fresh golden potatoes being sliced by a high-precision metal blade into perfect ridged shapes. The lighting is warm and organic, emphasizing the natural ingredients and the craft behind the production. The background is a clean, dark industrial kitchen setting, conveying a sense of quality control and modern food engineering."
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7rs24REchzum0yp_E2Q_jeiD8z8Ibt_V3o0J5RvFgSygXtA7_d_ghH0LkNlB8JGAi9dbTU_fh_y-EVy5CsCq5hov7s_UW6ICFSIHEUhBds0ujLCAhTviqk_lJpwTBtfm0y82UXqK1tONITYH9138VZlz-PYocPfmV6UBWpAXcO9zDExAGWxPXLxYg9uPAyzTC1g15deJvzZ8a2Ak6n42-tMObw65SEQtUxhGaZXEvQHCw90w282qln7i1ddBarZCCZ1qw1ox9eI"
                                    />
                                </div>
                            </div>
                            <div className="order-1 md:order-2 flex flex-col gap-6">
                                <span className="text-primary font-label-bold text-lg uppercase tracking-[0.3em]">
                                    Signature Cut
                                </span>
                                <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white">
                                    THE ART OF THE WAVE
                                </h2>
                                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                                    Every single Chitato chip is crafted with precision. Our
                                    signature wavy-cut isn't just for looks—it's engineered to hold
                                    maximum flavor particles in every ridge, delivering a sensory
                                    explosion that standard flat chips simply can't match.
                                </p>
                                <p className="font-body-md text-on-surface-variant/80 italic border-l-4 border-primary pl-6">
                                    "Life is never flat, and your snacks shouldn't be either. We
                                    celebrate the ridges, the crunch, and the intensity of living
                                    out loud."
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Flavor Showcase Section */}
                <section id="shopping" className="py-section-gap bg-background">
                    <div className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto">
                        {/* signature cut */}
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                            <div>
                                <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white mb-2">
                                    EXPLORE FLAVORS
                                </h2>
                                <p className="text-on-surface-variant max-w-md">
                                    Dari gurihnya sapi panggang hingga ledakan bumbu pedas yang
                                    intens.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={prevSlide}
                                    disabled={currentIndex === 0}
                                    className="bg-surface-container hover:bg-primary transition-colors duration-200 hover:text-on-primary active:scale-98 p-2 rounded-full text-white disabled:opacity-40"
                                >
                                    <CaretLeftIcon size={24} />
                                </button>

                                <button
                                    onClick={nextSlide}
                                    disabled={currentIndex + visibleCard >= carouselItems.length}
                                    className="bg-surface-container hover:bg-primary transition-colors duration-200 hover:text-on-primary active:scale-98 p-2 rounded-full text-white disabled:opacity-40"
                                >
                                    <CaretRightIcon size={24} />
                                </button>
                            </div>
                        </div>
                        {/* signature cut */}

                        {/* card show */}
                        <div className="overflow-hidden">
                            <div
                                className="flex gap-8 transition-transform duration-300"
                                style={{
                                    transform: `translateX(-${currentIndex * 25}%)`,
                                }}
                            >
                                {carouselItems.map((item) => {
                                    if ('isSeeMore' in item) {
                                        return (
                                            <div
                                                key={item.id}
                                                className="min-w-full md:min-w-[calc(25%-1.5rem)]"
                                            >
                                                <button
                                                    onClick={() => {
                                                        window.location.href = '/shop';
                                                    }}
                                                    className="w-full h-full min-h-125 bg-surface-container border-2 border-dashed border-primary rounded-xl flex flex-col items-center justify-center text-white hover:bg-primary-container transition-all group"
                                                >
                                                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                                        →
                                                    </div>

                                                    <h3 className="text-2xl font-bold uppercase tracking-widest">
                                                        See More
                                                    </h3>

                                                    <p className="text-on-surface-variant mt-2">
                                                        Explore all products
                                                    </p>
                                                </button>
                                            </div>
                                        );
                                    }

                                    const product = item as Product;

                                    const selectedVariant = product.variants?.[0];

                                    const selectedSize = getCheapestSize(selectedVariant);

                                    return (
                                        <div
                                            key={product.id}
                                            className="min-w-full md:min-w-[calc(25%-1.5rem)]"
                                        >
                                            <Card
                                                tag={selectedVariant?.flavor || 'Original'}
                                                colorTag={product.tagColor}
                                                img={product.imageUrl}
                                                title={product.name}
                                                description={product.description}
                                                price={selectedSize?.price || 0}
                                                addToCart={() =>
                                                    handleAddToCart(selectedSize?.id)
                                                }
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* card show */}
                    </div>
                </section>

                {/* <!-- Newsletter / CTA --> */}
                <section className="bg-primary-container py-20">
                    <div className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center flex flex-col items-center gap-3">
                        <h2 className="text-[40px] md:text-headline-lg font-headline-lg text-white uppercase italic">
                            READY FOR THE CRUNCH?
                        </h2>
                        <p className="text-on-primary-container max-w-lg">
                            Dapatkan update terbaru tentang rasa baru dan promo eksklusif langsung
                            di inbox kamu.
                        </p>
                        <form className="flex flex-col md:flex-row w-full max-w-lg gap-4 mt-4">
                            <input
                                className="grow bg-on-primary-fixed-variant border-2 border-white/20 text-white py-1 px-4 focus:border-secondary-fixed focus:ring-0 rounded-sm"
                                placeholder="Alamat Email"
                                type="email"
                            />
                            <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-2 font-label-bold text-xl tracking-widest rounded-sm hover:brightness-110 active:bg-on-primary active:text-secondary active:scale-95 transition-all duration-150">
                                GABUNG
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* <!-- Footer --> */}
            <Footer />
        </div>
    );
}
