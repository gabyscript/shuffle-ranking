export async function handler(event) {
  const ID = "5bf0a7d3-9fac-4cb6-b1e9-3f01faf639ec";
  const { startTime, endTime } = event.queryStringParameters;

  const url = `https://affiliate.shuffle.com/stats/${ID}?startTime=${startTime}&endTime=${endTime}`;
  const urlWithoutTime = `https://affiliate.shuffle.com/stats/${ID}`;

  console.log("URL en ranking netlify:", urlWithoutTime)

  try {
    const res = await fetch(urlWithoutTime);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener ranking' }),
    };
  }
}
