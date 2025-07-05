export const setItem = (key: string, value: unknown) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        console.warn("LocalStorage is not available in this environment.");
    }
};

export const getItem = (key: string) => {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    return null;
};

export const removeItem = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};