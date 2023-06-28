import { useLocalStorageState } from 'ahooks';
import { ITabItem } from '../core/type';
const innerList: ITabItem[] = [
    {
        text: 'Dashboard',
        id: '/dashboard',
        route: {
            pathname: '/dashboard',
        },
    },
];

export const topbarLocalStorageKey = 'use-local-storage-state-topBarTabs';

export const clearTopBarLocalStorage = () => {
    try {
        localStorage.removeItem(topbarLocalStorageKey);
    } catch (error) {
        console.log(error)
    }
};

function useTopbarLocalStorage<T>(p?: { defaultValue: T }) {
    const [list, setList] = useLocalStorageState(topbarLocalStorageKey, {
        defaultValue: p?.defaultValue || innerList,
    });
    return {
        list,
        setList,
    };
}

export default useTopbarLocalStorage;
