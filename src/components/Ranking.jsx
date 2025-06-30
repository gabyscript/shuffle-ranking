import { useEffect, useState } from 'react';
import { fetchRankingData } from '../services/rankingService';
const Ranking = () => {
    const [ranking, setRanking] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRankingData();
        setRanking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

    return (
        <div className=''>
            <table className="table table-dark ranking-table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Total Wager</th>
                    <th>Premio</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((item, index) => (
                    <tr key={index + 1}>
                        <td>{item.rank}</td>
                        <td>{item.username}</td>
                        <td>{item.wagerAmount}</td>
                        <td>{item.prize}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default Ranking;