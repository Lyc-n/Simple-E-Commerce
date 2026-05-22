import { useEffect, useMemo, useState } from 'react';
import {
    CaretLeftIcon,
    CaretRightIcon,
} from '@phosphor-icons/react';

import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import api from '../lib/api';

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
    variants: ProductVariant[];
};

const ITEMS_PER_PAGE = 12;

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedFlavor, setSelectedFlavor] = useState('All');

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get('/api/products');

                setProducts(response.data.products);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (selectedFlavor === 'All') {
            return products;
        }

        return products.filter((product) =>
            product.variants.some(
                (variant) =>
                    variant.flavor.toLowerCase() ===
                    selectedFlavor.toLowerCase()
            )
        );
    }, [products, selectedFlavor]);

    const totalPages = Math.ceil(
        filteredProducts.length / ITEMS_PER_PAGE
    );

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    function handleFilter(flavor: string) {
        setSelectedFlavor(flavor);
        setCurrentPage(1);
    }

    function nextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    return (
        <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-white min-h-screen">
            <Navbar />

            <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12">
                {/* HEADER */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white mb-2">
                                The Collection
                            </h1>

                            <p className="text-on-surface-variant max-w-md">
                                Intense flavor, maximum crunch. Choose your
                                weapon and level up your snack game.
                            </p>
                        </div>

                        {/* FILTER */}
                        <div className="flex flex-wrap gap-3">
                            {[
                                'All',
                                'Original',
                                'Spicy',
                                'Nori',
                                'Beef',
                            ].map((flavor) => (
                                <button
                                    key={flavor}
                                    onClick={() => handleFilter(flavor)}
                                    className={`px-6 py-2 rounded-full border-2 transition-all duration-200 font-label-bold text-label-bold active:scale-95
                                        
                                        ${
                                            selectedFlavor === flavor
                                                ? 'bg-primary-container border-secondary-fixed text-white'
                                                : 'bg-surface-container-high border-transparent text-on-surface hover:bg-primary-container'
                                        }
                                    `}
                                >
                                    {flavor}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRODUCTS */}
                <section
                    key={currentPage + selectedFlavor}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 animate-fade"
                >
                    {loading ? (
                        <p className="text-on-surface-variant">
                            Loading products...
                        </p>
                    ) : paginatedProducts.length === 0 ? (
                        <p className="text-on-surface-variant">
                            Product tidak ditemukan.
                        </p>
                    ) : (
                        paginatedProducts.map((product) => {
                            const firstVariant =
                                product.variants?.[0];

                            const firstSize =
                                firstVariant?.sizes?.[0];

                            return (
                                <Card
                                    key={product.id}
                                    tag={
                                        firstVariant?.flavor ||
                                        'Snack'
                                    }
                                    colorTag="bg-primary-container"
                                    img={product.imageUrl}
                                    title={product.name}
                                    description={
                                        product.description
                                    }
                                    price={
                                        firstSize?.price || 0
                                    }
                                />
                            );
                        })
                    )}
                </section>

                {/* PAGINATION */}
                {!loading && totalPages > 1 && (
                    <section className="flex items-center justify-center gap-4">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="bg-surface-container hover:bg-primary transition-colors duration-200 hover:text-on-primary active:scale-95 p-3 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <CaretLeftIcon size={22} />
                        </button>

                        <div className="flex items-center gap-2">
                            {Array.from({
                                length: totalPages,
                            }).map((_, index) => {
                                const page = index + 1;

                                return (
                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`w-10 h-10 rounded-full transition-all duration-200 font-bold
                                            
                                            ${
                                                currentPage === page
                                                    ? 'bg-primary-container text-white scale-110'
                                                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="bg-surface-container hover:bg-primary transition-colors duration-200 hover:text-on-primary active:scale-95 p-3 rounded-full text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <CaretRightIcon size={22} />
                        </button>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}