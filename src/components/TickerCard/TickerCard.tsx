
/* const TickerCard: FC<TickerCardProps> = () => (
 <TickerCardWrapper data-testid="TickerCard">
    TickerCard Component
 </TickerCardWrapper>
);
 */




import React, { useEffect, useState,FC } from 'react';

/* import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 */
//import { Card, CardContent } from '~/components/ui/card';
//import { Loader2, AlertTriangle } from 'lucide-react'; @/components/ui
//import { TickerCardWrapper } from './TickerCard.styled';

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

   return (



        
            <div className="card-body">
              <div className="media d-flex">
                <div className="align-self-center">
			<h3>{ticker.name}</h3><img src={imgSrc} alt={ticker.symbol} className="img-fluid" height={35} width={35} />
                </div>



                <div className="media-body text-right">
			<h2>${parseFloat(ticker.price_usd).toLocaleString()}</h2>
			
			   <h5>

            <span style={{ color: parseFloat(ticker.percent_change_24h) >= 0 ? '#52c41a' : '#f5222d' }}>
            {parseFloat(ticker.percent_change_24h)}% 
            {/* {parseFloat(ticker.percent_change_24h) >= 0 ? '\u2005 \u2191' : '\u2005 \u2193' } */}
            </span>
            </h5>


                </div>


              </div>

            </div>


          



)};

const CryptoTicker = () => {
    const [tickers, setTickers] = useState<Ticker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickers = async () => {
            try {
                const response = await fetch('https://api.coinlore.net/api/tickers/');
                const data = await response.json();
                setTickers(data.data.slice(0, 20)); // Limiting to 20 results for simplicity
            } catch (err) {
                setError('Failed to fetch data.');
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




             <div className="grey-bg container-fluid">

      <div className="row">
               

          {tickers.map(ticker => (


<div className="col-4 mt-6 mb-1 col-xl-4 col-sm-5 ">
   {/* col-6 mt-3 mb-1    col-xl-4 col-sm-5 col-6 */}
<div className="card">
     <div className="card-content">

                <TickerCard key={ticker.id} ticker={ticker} />
                </div>
</div>
           
       </div>

  

 
 )
 
  
 
 )}


     </div>

  </div> 




    );
};

export default CryptoTicker;