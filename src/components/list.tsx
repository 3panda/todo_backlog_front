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
    project_id: Number;
    my_id: Number;
    issue_type_id: Number;
    priority_id: Number;
 }
  
  export class ToDoList extends React.Component<IProps, IState> {
    constructor(props) {
      super(props);
      this.state = {
        toDoList: props.toDoList,
        issues_id: NaN,
        textTitle: '',
        textContent: '',
        project_id: NaN,
        my_id: NaN,
        issue_type_id: NaN,
        priority_id: NaN,
      };
      this.updateTodo();
      
    }
      
      updateTodo() {
        fetch("")
          .then(response =>{
            console.log("a");
            return response.json();
          }).then(json_data =>{
            console.table(json_data.project_info);
            let project_info = json_data.project_info;
            this.setState({project_id: project_info.project_id});
            this.setState({my_id: project_info.my_id});
            this.setState({issue_type_id: project_info.issue_type_id});
            this.setState({priority_id: project_info.priority_id});

            let list = this.state.toDoList;
            console.log(project_info.issues[0].summary)
            let issues = project_info.issues; 
            for(let i in issues) {
              console.log(issues[i].summary);
              list.push({
                title: issues[i].summary,
                content: issues[i].description,
                issues_id: issues[i].id
              })
              this.setState({toDoList: list});
            }
            console.table(this.state);
          })
      }

      addToDo() {
        let issues_date = {
          project_id: this.state.project_id,
          summary: this.state.textTitle,
          assignee_id: this.state.my_id,
          issue_type_id: this.state.issue_type_id,
          priority_id: this.state.priority_id,
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