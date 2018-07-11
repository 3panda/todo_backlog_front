import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ToDoList} from './components/list';

const list = [];
class App extends React.Component {
  render() {
    return (
        <div>
          <ToDoList toDoList={list}/>
        </div>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));