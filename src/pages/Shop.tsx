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
    tag: string;
    tagColor: string;
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
                    variant.flavor === selectedFlavor
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

    const pages = getPagination(currentPage, totalPages);

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

    function hashString(str: string) {
        let hash = 0;

        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }

        return Math.abs(hash);
    }

    function pickStableRandom<T>(arr: T[], seed: string) {
        if (!arr.length) return undefined;

        const index = hashString(seed) % arr.length;
        return arr[index];
    }

    function getPagination(current: number, total: number) {
        const delta = 1; // kiri kanan
        const range: number[] = [];

        const start = Math.max(1, current - delta);
        const end = Math.min(total, current + delta);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    }

    async function handleAddToCart(variantSizeId: string) {
        try {
            await api.post('/api/cart', {
                variantSizeId,
                quantity: 1,
            });

            alert('Berhasil ditambahkan ke cart');
        } catch (err: any) {
            console.error(err);

            if (err.response?.status === 401) {
                alert('Login dulu');
            }
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
                                ...new Set(
                                    products.flatMap((product) =>
                                        product.variants.map(
                                            (variant) => variant.flavor
                                        )
                                    )
                                ),
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
                            const filteredVariants =
                                selectedFlavor === 'All'
                                    ? product.variants : product.variants.filter(
                                        (v) => v.flavor === selectedFlavor
                                    );

                            const selectedVariant = pickStableRandom(
                                filteredVariants,
                                product.id + selectedFlavor
                            );

                            const selectedSize = selectedVariant?.sizes?.reduce(
                                (main, curr) => (curr.price < main.price ? curr : main),
                                selectedVariant?.sizes?.[0]
                            );

                            return (
                                <Card
                                    key={product.id}
                                    tag={selectedVariant?.flavor || 'No Flavor'}
                                    colorTag={product.tagColor}
                                    img={product.imageUrl}
                                    title={product.name}
                                    description={product.description}
                                    price={selectedSize?.price || 0}
                                    addToCart={() => handleAddToCart(selectedSize?.id || '')}
                                />
                            );
                        })
                    )}
                </section>

                {/* PAGINATION */}
                {!loading && totalPages > 1 && (
                    <section className="flex items-center justify-center gap-3">

                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-surface-container disabled:opacity-40"
                        >
                            <CaretLeftIcon size={22} />
                        </button>

                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-full transition-all
                                    ${
                                        currentPage === page
                                            ? 'bg-primary-container text-white scale-110'
                                            : 'bg-surface-container text-white'
                                    }
                                `}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full bg-surface-container disabled:opacity-40"
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