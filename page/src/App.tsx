import React, { Component } from 'react';
import './App.css';
import { Task } from 'task-simplified'

interface IAppProps {
}

type ItemStatus = "unprocessed" | "processed" | "processing";
interface IItem {
  name: string;
  status: ItemStatus;
}
interface IAppState {
  items: IItem[];
}

class App extends Component<IAppProps, IAppState> {
  state: IAppState = {
    items: [
      { name: "Item 1", status: "processed" },
      { name: "Item 2", status: "processing" },
      { name: "Item 3", status: "unprocessed" },
      { name: "Item 4", status: "unprocessed" },
      { name: "Item 5", status: "unprocessed" },
      { name: "Item 6", status: "unprocessed" },
      { name: "Item 7", status: "unprocessed" },
      { name: "Item 8", status: "unprocessed" },
      { name: "Item 9", status: "unprocessed" },
    ]
  }

  hangleProcess = async (item: IItem) => {
    this.setState(state => {
      const newItems = [...state.items];
      const i = newItems.findIndex(i => i.name === item.name);
      newItems[i] = { ...newItems[i], status: 'processing' };
      return { items: newItems };
    });

    await Task.Run(() => {
      //simulating some processing of 5-15 seconds
      const randomInt = (start: number, end: number) => Math.floor(Math.random() * (end - start)) + start;
      const now = () => (new Date()).getTime();

      const duration = randomInt(5000, 15000);//ms
      const startTime = now();
      while (now() <= startTime + duration) { }
    }, undefined);

    this.setState(state => {
      const newItems = [...state.items];
      const i = newItems.findIndex(i => i.name === item.name);
      newItems[i] = { ...newItems[i], status: 'processed' };
      return { items: newItems };
    });
  }

  render() {
    return (
      <div>
        <p className='description'>This is simple wrapper to web worker. You can try by clicking on Process button</p>
        <div className='items'>
          {this.state.items.map(item => (
            <Item key={item.name} val={item} onProcess={() => this.hangleProcess(item)} />))}
        </div>
      </div>
    );
  }
}

interface IItemProps {
  val: IItem;
  onProcess: () => void;
}

const Item = ({ val, onProcess }: IItemProps) => {
  const renderProcessed = () => (<button type="button" className="btn btn-success" disabled>Processed</button>);
  const renderProcessing = () => (
    <button className="btn btn-primary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Processing...
    </button>);
  const renderUnprocessed = () => (<button type="button" className="btn btn-primary" onClick={onProcess}>Process</button>);
  return (
    <div className='item'>
      <label>{val.name}</label>
      {{
        'processed': renderProcessed,
        'processing': renderProcessing,
        "unprocessed": renderUnprocessed
      }[val.status]()}
    </div>
  );
}

export default App;
