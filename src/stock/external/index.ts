import { apiTiingoRequest } from "../requests";

class ApiTiingo {
    async searchStock(search: string) {
        try {
            const stock = await apiTiingoRequest.get(`/utilities/search/${search}`);

            return stock.data;
        } catch (error) {
            return error;
        }
    }

    async stockMeta(ticker: string) {
        try {
            const meta = await apiTiingoRequest.get(`/daily/${ticker}`);

            return meta.data;
        } catch (error) {
            return error;
        }
    }
}

export { ApiTiingo };
