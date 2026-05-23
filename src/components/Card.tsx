import ButtonSec from './ButtonSec';

type CardProps = {
    tag: string;
    colorTag: string;
    img: string;
    title: string;
    description: string;
    price: number;
    addToCart?: () => void;
};

export default function Card(props: CardProps) {
    const { tag='secondary-fixed', colorTag, img, title, description, price, addToCart } = props;
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
                    <ButtonSec onClick={addToCart} />
                </div>
            </div>
        </div>
    );
}
