
/* const TickerCard: FC<TickerCardProps> = () => (
 <TickerCardWrapper data-testid="TickerCard">
    TickerCard Component
 </TickerCardWrapper>
);
 */


import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";


interface Ticker {
    id: string;
    symbol: string;
    name: string;
    price_usd: string;
    market_cap_usd: string;
    volume24: string;
    percent_change_24h: string;
}

interface TickerCardProps {
    ticker: Ticker;
}

const TickerCard: React.FC<TickerCardProps> = ({ ticker }) => {
   const imgSrc = `/src/assets/${ticker.symbol}.png`;
   const imgSize = 35;

   return (

            <div className="card-body justify-content-between media d-flex">

                <div className="text-start">
			        <h3>{ticker.name}</h3><img src={imgSrc} alt={ticker.symbol} className="img-fluid" height={imgSize} width={imgSize} />
                </div>

                <div className="text-middle">
                    <span style={{ display: "inline-block", width: "20px" }}></span>
                </div>

                <div className="text-right">
                    <h2>${parseFloat(ticker.price_usd).toLocaleString()}</h2>
                    <h5>
                        <span style={{ color: parseFloat(ticker.percent_change_24h) >= 0 ? '#52c41a' : '#f5222d' }}>
                        {parseFloat(ticker.percent_change_24h)}% 
                        {/* {parseFloat(ticker.percent_change_24h) >= 0 ? '\u2005 \u2191' : '\u2005 \u2193' } */}
                        </span>
                    </h5>
                </div>

            </div>
)};

const CryptoTicker = () => {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const showCoins = 6;

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await fetch('https://api.coinlore.net/api/tickers/');
                const data = await response.json();
                setTickers(data.data.slice(0, showCoins)); // Limiting to showCoins
            } catch (err) {
                setError('Failed to fetch Coinlore data.');
            } finally {
                setLoading(false);
            }
        };
        fetchTickers();
    }, []);

    if (loading) return <div className="flex items-center justify-center p-10">
      {/* <Loader2 className="animate-spin text-gray-500 w-10 h-10" /> */}
      </div>;
    if (error) return <div className="flex items-center justify-center p-10 text-red-600">
      {/* <AlertTriangle className="mr-2 w-6 h-6" /> */}
      {error}</div>;

    return (
        <div className="row">
            <Marquee>
                {tickers.map(ticker => (
                    <div className="card ms-2" key={ticker.id}>
                        <div className="card-content">
                            <TickerCard key={ticker.id} ticker={ticker} />
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default CryptoTicker;