import { RANKING_PRIZES } from "../const/rankingPrizes";
import { formatCurrency } from "../const/formatCurrency";

const BACKUP_KEY = 'ranking_backup';

export async function fetchRankingData() {
  try {
    console.log('Entorno:', import.meta.env.DEV ? 'Desarrollo' : 'Producción');

    const id = "5bf0a7d3-9fac-4cb6-b1e9-3f01faf639ec";

    const baseUrl = import.meta.env.DEV
      ? `/api/stats/${id}`
      : `https://affiliate.shuffle.com/stats/${id}`;    

    const startTime = Math.floor(new Date('2025-07-02T00:00:00Z').getTime() / 1000);
    const endTime = Math.floor(new Date('2025-07-17T23:59:59Z').getTime() / 1000);
    console.log(startTime, endTime)

    const url = `${baseUrl}?startTime=${startTime}&endTime=${endTime}`;

    const response = await fetch(url);
    console.log('HTTP response:', response);

    if (!response.ok) {
      throw new Error(`Error al obtener datos del ranking: ${response.status}`);
    }
    
    const data = await response.json();
    const filteredData= data.
        filter(user => user.wagerAmount > 0)
        .sort((a,b) => b.wagerAmount - a.wagerAmount)
        .slice(0, 15)
        .map((user, index) => ({
            ...user,
            rank: index + 1,
            prize: RANKING_PRIZES[index] ?? 0,
            formattedWaggerAmount: formatCurrency(user.wagerAmount)
        }));

    console.log('Ranking data:', filteredData);

    localStorage.setItem(BACKUP_KEY, JSON.stringify(filteredData));

    return filteredData;

  } catch (error) {
    console.error('Error en fetchRankingData:', error);

    const cached = localStorage.getItem(BACKUP_KEY);
    if (cached) {
      console.warn('Usando datos cacheados en localStorage');
      return JSON.parse(cached);
    }

    throw error;
  }
}