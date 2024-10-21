import './style.css'
import { Tabs } from "antd-mobile";
import { useTabs } from './useTabs';
import HomeList from './HomeList';
const List = () => {
  const { channels } = useTabs()
    return (
      <div>
        <div className="tatabContainer">
          <Tabs defaultActiveKey={'0'}>
            { channels?.channels.map(item => (
              <Tabs.Tab key={item.id} title={item.name}>
                <div className='listContainer'>
                <HomeList channelId={''+item.id}></HomeList>
                </div>
                </Tabs.Tab>
              ))}
          </Tabs>
        </div>
      </div>
    )
}

export default List