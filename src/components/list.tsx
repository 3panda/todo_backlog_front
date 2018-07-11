import * as React from 'react';
import fetch from 'isomorphic-fetch';
import { isNull } from 'util';


// Propsの型定義
interface IProps {
    toDoList: any;
}
  
interface IState {
    toDoList: any;
    issues_id: Number;
    textTitle: string;
    textContent: string;
 }
  
  export class ToDoList extends React.Component<IProps, IState> {
    constructor(props) {
      super(props);
      this.state = {
        toDoList: props.toDoList,
        issues_id: NaN,
        textTitle: '',
        textContent: ''
      };
      //this.updateTodo();
      
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
        let issues_date = {
          project_id: 32538,
          summary: this.state.textTitle,
          assignee_id: 84381,
          issue_type_id: 147348,
          priority_id: 1,
          description: this.state.textContent
        }
        let issues_id;

        fetch("", {
          mode: 'cors',
          headers: {
            'content-type': 'application/json'
          },
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(issues_date) 
        }).then(response =>{
          console.log("b");
          return response.json();
        }).then(json_data => {
          console.log("b:" + json_data);
          issues_id = json_data.data.issues_id;
          this.setState({issues_id: issues_id});

        let list = this.state.toDoList;
        list.push({
          title: this.state.textTitle,
          content: this.state.textContent,
          issues_id: this.state.issues_id
          });
        this.setState({toDoList: list});
        console.table(this.state.toDoList);

        });
      }   

      deleteToDo(i){
        
        let list = this.state.toDoList;
        let issues_id = {issues_id: list[i]['issues_id']}
        
        fetch("", {
          mode: 'cors',
          headers: {
            'content-type': 'application/json'
          },
          cache: 'no-cache',
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(issues_id)
        })
        .then(response =>{
          console.log("c");
          return response.json();
        }).then(json_data => {
          console.table(json_data.data);
          list.splice(i, 1);
          this.setState({toDoList: list});
        });

      }


      render() {

        const domList = this.state.toDoList.map((m, i) =>{
            return <li key={i}>
              issue :{m.issues_id}<br />
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