import { useEffect, useRef } from 'react'
import styles from './style.module.less'
import { TabList } from './core/TabList'

const width = 80

const list = [
    {
        text: 'dashboard',
        selected: true
    },
    {
        text: 'test1',
        selected: false
    },
    {
        text: 'test2',
        selected: false
    },
]


export default function TopBarTabs() {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const myTabList = new TabList(list, { width }, ref as { current: HTMLElement })
        myTabList.show()
        return () => {
            myTabList.remove()
        }
    }, [])

    return (
        <div className={styles.container} ref={ref}></div>
    )
}
