import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { cardData } from '../data/cardData';

export default function Shop() {
    return (
        <div className="bg-background text-on-surface font-body-md selection:bg-primary-container selection:text-white">
            <Navbar />
            <main className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-12">
                {/* <!-- Catalog Header & Filters --> */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-white mb-2">
                                The Collection
                            </h1>
                            <p className="text-on-surface-variant max-w-md">
                                Intense flavor, maximum crunch. Choose your weapon and level up your
                                snack game.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-2 bg-primary-container text-white font-label-bold text-label-bold rounded-full transition-all border-2 border-transparent hover:border-secondary-fixed">
                                All
                            </button>
                            <button className="px-6 py-2 bg-surface-container-high text-on-surface font-label-bold text-label-bold rounded-full transition-all hover:bg-primary-container">
                                Original
                            </button>
                            <button className="px-6 py-2 bg-surface-container-high text-on-surface font-label-bold text-label-bold rounded-full transition-all hover:bg-primary-container">
                                Spicy
                            </button>
                            <button className="px-6 py-2 bg-surface-container-high text-on-surface font-label-bold text-label-bold rounded-full transition-all hover:bg-primary-container">
                                Limited
                            </button>
                        </div>
                    </div>
                </section>
                {/* <!-- Product Grid --> */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-section-gap">
                    {cardData.map((card, index) => (
                        <Card
                            key={index}
                            tag={card.tag}
                            colorTag={card.colorTag}
                            img={card.img}
                            title={card.title}
                            description={card.description}
                            price={card.price}
                        />
                    ))}
                </section>
            </main>
            <Footer />
        </div>
    );
}
