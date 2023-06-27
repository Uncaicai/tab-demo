import { useEffect, useMemo, useRef } from 'react'
import styles from './style.module.less'
import { TabViewer } from './core/view/TabView'
import { TabList } from './core/TabList'
import { Select } from './core/Select'
import { IActionList } from './core/type'
import { Drag } from './core/Drag'

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
    const myTabList = useMemo(() => {
        return new TabList(list, { width })
    }, [])
    useEffect(() => {
        let actions: IActionList[] = []
        if (ref.current) {
            ref.current.innerHTML = ''
            myTabList.list.forEach((item) => {
                const select = new Select()
                select.initEvent(myTabList, item)
                const drag = new Drag()
                drag.initEvent(myTabList, item)
                actions.push(drag, select)
                ref.current?.appendChild((item.TabViewer as TabViewer).dom)
            })
        }
        return () => {
            actions.forEach(item => {
                item?.removeEvent()
            })
            actions = []
        }
    }, [myTabList])

    return (
        <div className={styles.container} ref={ref}></div>
    )
}
