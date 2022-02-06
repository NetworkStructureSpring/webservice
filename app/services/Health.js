import axios from "axios";
export const getServiceHealth = async () => {
    try {
        const response = await axios.get('https://virtserver.swaggerhub.com/spring2022-csye6225/app/1.0.0/healthz')
        return response.status;
    }
    catch (error) {
        throw error;
      }
}
