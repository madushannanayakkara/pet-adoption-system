import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { fetchTestData } from "../services/donatorsService";
import FormButton from "../components/FormButton";

interface TestResponse {
  message?: string;
  [key: string]: any;
}

const Donators = () => {
  const [response, setResponse] = useState<TestResponse | null>(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await fetchTestData();
      setResponse(res.data);
      console.log("Response from test route:", res.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { errors } = err.response.data;
        setResponse(err.response.data);
        console.log("Error response from test route:", err.response.data);
        if (errors && errors.goAuthPage) {
          navigate("/login");
        }
      } else {
        setResponse({ err: JSON.stringify(err) });
        console.log("Error fetching test route:", err);
      }
    }
  };

  return (
    <div>
      <div>Donators</div>
      <FormButton
        name="login"
        label="LOGIN"
        borderRadius={55}
        fullWidth
        onClick={fetchData}
      />
      <div style={{ marginTop: "1rem", color: "black" }}>
        {response ? JSON.stringify(response, null, 2) : "No response yet"}
      </div>
    </div>
  );
};

export default Donators;
