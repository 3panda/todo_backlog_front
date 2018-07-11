import * as React from 'react';
import fetch from 'isomorphic-fetch';


// Propsの型定義
interface IProps {
    toDoList: any;
}
  
interface IState {
    toDoList: any;
    textTitle: string;
    textContent: string;
 }
  
  export class ToDoList extends React.Component<IProps, IState> {
    constructor(props) {
      super(props);
      this.state = {
        toDoList: props.toDoList,
        textTitle: '',
        textContent: ''
      };
      this.updateTodo();
      
    }
      
      updateTodo() {
        fetch("")
          .then(response =>{
            console.log("a");
            console.log(response.json());
            return response.json();
          })
      }

      addToDo() {
        let form = document.getElementById('form');
        fetch("", {
          mode: 'cors',
          headers: {
            'content-type': 'application/json'
          },
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          body: new FormData(form as HTMLFormElement) 
        })
        .then(response =>{
          console.log("b");
          console.log(response.json());
          return response.json();
        })

        let list = this.state.toDoList;
        list.push({ title: this.state.textTitle, content: this.state.textContent });
        this.setState({toDoList: list});
      }   

      deleteToDo(i){
        let num = {test: 1000} 
        fetch("", {
          mode: 'cors',
          headers: {
            'content-type': 'application/json'
          },
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(num)
        })
        .then(response =>{
          console.log("c");
          console.log(response.json());
          return response.json();
        })


        let list = this.state.toDoList;
        list.splice(i, 1);
        this.setState({toDoList: list});



      }


      render() {

        const domList = this.state.toDoList.map((m, i) =>{
            return <li key={i}>
              タイトル：{m.title}<br/>
              内容：{m.content}<br/>
              <button onClick={e => this.deleteToDo(i)}>完了にする</button>
            </li>;
          });

        return (
            <div>
                <div id= "form">
                    タイトル：<input name="title" type="text" value={this.state.textTitle} onChange={e => this.setState({textTitle: e.target.value})}/>
                    内容：<input name='contents' type="text" value={this.state.textContent} onChange={e => this.setState({textContent: e.target.value})}/>
                </div>
                <div onClick={e => this.addToDo()}>追加</div>
                <ul>{domList}</ul>
            </div>
            
        );
      }

}