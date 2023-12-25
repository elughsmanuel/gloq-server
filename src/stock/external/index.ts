import { apiTiingoRequest } from "../requests";
import BadRequest from '../../errors/BadRequest';

class ApiTiingo {
    async searchStock(search: string) {
        try {
            const response = await apiTiingoRequest.get(`/utilities/search/${search}`);

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async stockMeta(ticker: string) {
        try {
            const response = await apiTiingoRequest.get(`/daily/${ticker}`);

            return response.data;
        } catch (error) {
            return error;
        }
    }

    async dailyStock(ticker: string) {
        try {
            const response = await apiTiingoRequest.get(`/daily/${ticker}/prices`);

            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export { ApiTiingo };
