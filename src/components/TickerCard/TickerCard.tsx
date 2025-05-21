
/* const TickerCard: FC<TickerCardProps> = () => (
 <TickerCardWrapper data-testid="TickerCard">
    TickerCard Component
 </TickerCardWrapper>
);
 */


import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import 'bootstrap/dist/css/bootstrap.min.css';


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

 // get currency symbol icon from my Cloudinary storage, icons need to be named as Cloudfare API's currency symbol name.
let cld = new Cloudinary({ cloud: { cloudName: 'ddjpunfg4' } });

// Ticker data in card body - Using css Bootstrap as libraries can't align card text properly
const TickerCard: React.FC<TickerCardProps> = ({ ticker }) => {
   //const imgSrc = `/src/assets/${ticker.symbol}.png`;
   const imgSize = 38
   const coinSymbol= ticker.symbol.toUpperCase() ?? 'BTC'; // Default to BTC if symbol is not available
   const img = cld
    .image(coinSymbol) 
    .format('auto') 
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(imgSize).height(imgSize)); 

   return (
            <div className="card-body justify-content-between media d-flex">
                <div className="text-start">
			        <h3>{ticker.name}</h3>
                    {/* <img src={img} alt={ticker.symbol} className="img-fluid" height={imgSize} width={imgSize} /> */}
                    <AdvancedImage cldImg={img}/>
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

interface ICryptoTickerState {
      coinNumber : number,
}

const coinLoreAPITickerUri = "https://api.coinlore.net/api/tickers/";
const fetchFrequency = 60000; // Fetch data from Coinore every minute
const DEFAULT_COIN_NUMBER = 6 ;

//TODO: Set max limit
//const top10 = "https://api.coinlore.com/api/tickers/?start=0&limit=10";

// Coinlore API data Fetch, ticket Marquee and Bootstrap Card. Note that cards body is in TickerCard component
const CryptoTicker: React.FC<ICryptoTickerState> =  ({coinNumber}) => {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const showCoins: number = (coinNumber) < 1 ? DEFAULT_COIN_NUMBER : coinNumber;

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await fetch(coinLoreAPITickerUri);
                const data = await response.json();
                setTickers(data.data.slice(0, showCoins)); // Limit to showCoins
                //setFetchtime(new Date().toLocaleString());
            } catch (err) {
                setError('Failed to fetch Coinlore data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickers();

        const intervalId = setInterval(() => {
            fetchTickers();
        }, fetchFrequency); 

        return () => clearInterval(intervalId);

    }, []);

    if (loading) return <div className="flex items-center justify-center p-10">
      Loading...
      </div>;
    if (error) return <div className="flex items-center justify-center p-10 text-red-600">
      Error: {error}
      </div>;

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