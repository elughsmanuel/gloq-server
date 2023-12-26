import { apiTiingoRequest } from "../requests";
import BadRequest from '../../errors/BadRequest';

import { AxiosError } from 'axios';


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

            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.isAxiosError) {
                const axiosError = error as AxiosError;
                
                if (axiosError.response) {
                    const statusCode = axiosError.response.status;

                    if (statusCode === 404) {
                        return {
                            success: false,
                            message: 'Stock not found for the given ticker.',
                        };
                    }

                }

            }

            return error;
        }
    }

}

export { ApiTiingo };
