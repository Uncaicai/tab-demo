import { useEffect, useMemo, useRef } from 'react'
import styles from './style.module.less'
import { TabList } from './core/TabList'
import { useSize } from 'ahooks'
import useTopbarLocalStorage from './hooks/useTopbarLocalStorage'
import { ITabItem } from './core/type'

export default function TopBarTabs() {
    const ref = useRef<HTMLDivElement>(null)
    const size = useSize(ref);
    const { list, setList } = useTopbarLocalStorage<ITabItem[]>();

    const direction = useMemo(() => {
        return [1, ref.current?.clientWidth ? Math.floor(ref.current?.clientWidth / 120) : 1];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current?.clientWidth]);
    useEffect(() => {
        const myTabList = new TabList(list || [], { width: 120, direction: [1, 2] }, ref as { current: HTMLElement })
        myTabList.show()
        return () => {
            myTabList.remove()
        }
    }, [list])

    return (
        <div className={styles.container}>
            <div className={styles.main} ref={ref}></div>
        </div>
    )
}
