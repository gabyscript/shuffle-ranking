import { RANKING_PRIZES } from "../const/rankingPrizes";
import { formatCurrency } from "../const/formatCurrency";

const BACKUP_KEY = 'ranking_backup';

export async function fetchRankingData() {
  try {
    const startTime = Math.floor(new Date('2025-07-18T03:29:29Z').getTime() / 1000);
    const endTime = Math.floor(new Date('2025-08-09T02:59:59Z').getTime() / 1000);

    const url = `/.netlify/functions/ranking?startTime=${startTime}&endTime=${endTime}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se pudieron obtener los datos del ranking (Código: ${response.status}).
        \nAsegúrate de desactivar los bloqueadores de anuncios en este sitio para acceder a la información completa.`);
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