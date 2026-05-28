import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductFeedCard({ product }) {
    const {
        nameKr, name, category, price, imageColor,
        tag, desc
    } = product;

    return (
        <motion.div
            className="relative flex-shrink-0 w-56 rounded-2xl overflow-hidden bg-void-light border border-ui-border cursor-pointer"
            whileHover={{
                scale: 1.02,
                boxShadow: '0 0 24px rgba(0, 212, 255, 0.15)',
                borderColor: '#2A6885',
            }}
            transition={{ duration: 0.25 }}
        >
            <div className={`relative aspect-[5/6] overflow-hidden ${imageColor || 'bg-void-lighter'} flex items-end`}>
                <img
                    src="/images/placeholder-product.jpg"
                    alt={nameKr || name}
                    className="w-full h-full object-cover absolute inset-0"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
                {tag && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-2xl text-xs font-body font-semibold bg-neon-cyan text-void-deepest">
                        {tag}
                    </span>
                )}
                <div className="absolute top-2 right-2 flex items-center gap-1 text-ui-textMuted">
                    <Heart size={13} strokeWidth={1.5} />
                </div>
            </div>

            <div className="p-3 flex flex-col gap-1">
                <p className="text-xs font-body text-ui-textMuted">{category}</p>
                <p className="text-sm font-title-ko text-ui-textPrimary leading-tight line-clamp-2">{nameKr || name}</p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-title-ko text-neon-cyan font-semibold">{price}</span>
                </div>
                {desc && (
                    <p className="text-xs font-body text-brand-600 mt-1 border-t border-ui-border pt-1 line-clamp-2">
                        {desc}
                    </p>
                )}
            </div>
        </motion.div>
    );
}
