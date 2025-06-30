import { RANKING_PRIZES } from "../const/rankingPrizes";

export async function fetchRankingData() {
  try {
    const response = await fetch('https://affiliate.shuffle.com/stats/5bf0a7d3-9fac-4cb6-b1e9-3f01faf639ec');

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
            prize: RANKING_PRIZES[index] ?? 0
        }));

    console.log('Ranking data:', filteredData);
    return filteredData;

  } catch (error) {
    console.error('Error en fetchRankingData:', error);
    throw error; // vuelve a lanzar para que el componente pueda capturar el error
  }
}