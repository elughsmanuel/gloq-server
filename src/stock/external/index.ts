import { apiTiingoRequest } from "../requests";

class ApiTiingo {
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
