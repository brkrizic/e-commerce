import axios from "axios";

const SignService = {
    registerUser: async (data) => {
        try {
            const response = await axios.post("http://localhost:3001/api/v1/users/register", data);
            console.log(response);
            if(response.status === 201){
                return response.data;
            }

        } catch (error) {
            console.error(error);
        }
    }
}
export default SignService;