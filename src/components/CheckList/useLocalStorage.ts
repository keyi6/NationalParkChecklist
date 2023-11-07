import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Optional<T> = T | undefined;

export function useLocalStorage<T>(key: string, initialValue: T):
    [Optional<T>, Dispatch<SetStateAction<Optional<T>>>] {
    const [data, setData] = useState<T>();

    useEffect(() => {
        try {
            const l = localStorage.getItem(key);
            if (!l) throw new Error(`key "${key}" does not exist`);

            setData(JSON.parse(l));
        } catch (err) {
            setData(initialValue);
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (data === undefined) return;
        localStorage.setItem(key, JSON.stringify(data));
    }, [data]);

    return [
        data,
        setData,
    ];
}
