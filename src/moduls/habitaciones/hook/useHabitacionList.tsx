import {listarHabitacionesApi} from "../service/habitacionService";
import type {HabitacionType} from "../type/habitacionType";
import { useState } from "react";

export const useHabitacionList = () => {

    const [habitaciones, setHabitaciones] = useState<HabitacionType[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const listarHabitaciones = async (page: number = 1) => {
        try {
            setLoading(true);
            const response = await listarHabitacionesApi(page);
            if (response?.status === 200) {
                console.log(response.data);
                setHabitaciones(response.data.data);
                setLastPage(response.data.last_page);
                setCurrentPage(response.data.current_page);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

   

    return { listarHabitaciones, habitaciones, currentPage, lastPage, loading, error };
};

















