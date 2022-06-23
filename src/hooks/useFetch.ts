import useSWR from "swr";
import api from "../services/api";

export function useFetch<Data = any>(url: string) {
  //armazena alguns parâmetros que retornam do useSRW, como a data e os erros
  const { data, error, mutate } = useSWR<Data>(url, async (url) => {
    const response = await api.get(url);
    console.log(response);
    //envia os dados obtidos da api
    if (response.status != 200) {
      return response.status;
    }
    return response.data;
  });

  return { data, error, mutate };
}
