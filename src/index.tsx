import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ToDoList} from './components/todo_list';


class App extends React.Component {
  constructor(process) {
    super(process);
  }

  render() {
    return (<ToDoList/>);
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'));