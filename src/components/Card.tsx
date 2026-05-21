import { ShoppingCartIcon } from '@phosphor-icons/react';

type CardProps = {
    tag: string;
    colorTag: string;
    img: string;
    title: string;
    description: string;
    price: number;
};

export default function Card(props: CardProps) {
    const { tag, colorTag, img, title, description, price } = props;
    return (
        <div className="group w-72 bg-surface-container-low p-4 border border-white/5 relative overflow-hidden transition-all duration-300 hover:border-primary rounded-lg">
            {/* tag */}
            <div
                className={`absolute top-0 right-0 z-10 bg-${colorTag} px-4 py-1 text-on-primary font-label-bold tracking-widest ridge-mask`}
            >
                {tag}
            </div>

            {/* image */}
            <div className="w-full h-64 mb-4 overflow-hidden">
                <img
                    className="object-contain  group-hover:scale-110 transition-transform duration-500"
                    data-alt="img..."
                    src={img}
                />
            </div>

            <div className="space-y-2">
                {/* judul */}
                <h3 className="text-headline-md font-headline-md text-white">{title}</h3>

                {/* deskripsi */}
                <p className="text-body-md font-body-md text-on-surface-variant">{description}</p>

                <div className="flex justify-between items-center pt-4">
                    {/* harga */}
                    <span className="text-secondary-fixed font-bold text-xl">
                        Rp {price.toLocaleString('id-ID')}
                    </span>
                    <button className="bg-primary-container flex items-center text-white px-4 gap-2 py-1 font-label-bold text-xl tracking-widest rounded-sm chip-shadow-var active:bg-inverse-primary chip-hover-var transition-all active:scale-95">
                        BELI <ShoppingCartIcon weight="bold" />
                    </button>
                </div>
            </div>
        </div>
    );
}
