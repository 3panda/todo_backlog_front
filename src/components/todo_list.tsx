import * as React from 'react';
import fetch from 'isomorphic-fetch';
import {Input} from './Input';
import {Content} from './content';

// 定数
namespace apiConst {
  export const GET_BACKLOG_DAT = '';
  export const ADD_BACKLOG_ISSUE = '';
  export const UPDATE_BACKLOG_ISSUE = '';
}

// Todoの型定義
interface IToDo {
  issuesId: number;
  textTitle: string;
  textContent: string;
}

// Stateの型定義
interface IState {
  toDoList: IToDo[];
  issues_id: number;
  textTitle: string;
  textContent: string;
  project_id: number;
  my_id: number;
  issue_type_id: number;
  priority_id: number;
  is_loaded: boolean;
  is_issue_completed: boolean;
 }
  
  export class ToDoList extends React.Component<null, IState> {
    constructor(process) {
      super(process);
      //　初期値用
      const list:IToDo[] = [];

      this.state = {
        toDoList: list,
        issues_id: NaN,
        textTitle: '',
        textContent: '',
        project_id: NaN,
        my_id: NaN,
        issue_type_id: NaN,
        priority_id: NaN,
        is_loaded: false,
        is_issue_completed: false
      };

      this.updateTodo();
    }
    
    // Backlogから未対応の一覧を取得しTdoListとして表示
    private updateTodo() :void {

      // Backlogから未対応の一覧を取得
      fetch(apiConst.GET_BACKLOG_DAT)
      .then(response =>{
        this.setState({is_loaded: false})

        //console.log("update");
        //console.log("通信中");
        return response.json();
      }).then(json_data =>{
        //console.log("Json取得");
        //console.table(json_data.project_info);
        let project_info = json_data.project_info;
        this.setState({project_id: project_info.project_id});
        this.setState({my_id: project_info.my_id});
        this.setState({issue_type_id: project_info.issue_type_id});
        this.setState({priority_id: project_info.priority_id});

        let l:IToDo[] = this.state.toDoList;
        //console.log(project_info.issues[0].summary)
        let issues = project_info.issues;
        //console.log('jsonのlistの大きさ:' + issues.length)

        if (issues.length <= 0) {
          this.setState({is_issue_completed: true});
          this.setState({is_loaded: true});
          return;
        } else {
          this.setState({is_issue_completed: false});
        }

        for(let i in issues) {
          //console.log("リストの展開");
          //console.log(issues[i].summary);
          l.push({
            issuesId: issues[i].id,
            textTitle: issues[i].summary,
            textContent: issues[i].description
            
          })
          this.setState({toDoList: l});
          this.setState({is_loaded: true})
        }
        //console.table(this.state);
      })

    }

    // ToDoをListに追加 Backlogのissuesへも追加 
    private addTodo(obj: {textTitle: string; textContents: string}) :void{
      //console.log("add");
      this.setState({is_loaded: false})
      let l:IToDo[] = this.state.toDoList;
      let issuesId;
      let issues_date = {
        project_id: this.state.project_id,
        summary: obj.textTitle,
        assignee_id: this.state.my_id,
        issue_type_id: this.state.issue_type_id,
        priority_id: this.state.priority_id,
        description: obj.textContents
      }
      

      fetch(apiConst.ADD_BACKLOG_ISSUE, {
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        },
        cache: 'no-cache',
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(issues_date) 
      }).then(response =>{
        //console.log("b");
        return response.json();
      }).then(json_data => {
        //console.log("成功");
        //console.log("b:" + json_data);
        issuesId = json_data.data.issues_id;
        this.setState({issues_id: issuesId});

      l.push({
        issuesId: issuesId,
        textTitle: obj.textTitle,
        textContent: obj.textContents
        });
      this.setState({toDoList: l});
      this.setState({is_loaded: true})
      this.setState({is_issue_completed: false});
      //console.table(this.state.toDoList);
      });

    }

    // ToDoをListから削除 Backlogのissuesも削除 
    private deleteTodo(id:number) :void {
      //console.log("delete");
      this.setState({is_loaded: false})
      let l = this.state.toDoList;
      //console.table(this.state.toDoList);
      //console.log(l[id]['issuesId']);
      let issues_id = {issues_id: l[id]['issuesId']}
      
      fetch(apiConst.UPDATE_BACKLOG_ISSUE, {
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
        //console.log("c");
        return response.json();
      }).then(json_data => {
        //console.table(json_data.data);
        l.splice(id, 1);
        this.setState({toDoList: l});
        this.setState({is_loaded: true})
        if (this.state.toDoList.length <= 0)
        {
          this.setState({is_issue_completed: true});
        }
        
      });
    }

    render() {
      //console.log("render");
      let todos:any = this.state.toDoList.map((todo, i) =>{
        return <Content 
                key={i} 
                id={i} 
                issuesId={todo.issuesId} 
                textTitle={todo.textTitle} 
                textContent={todo.textContent} 
                parentMethod ={this.deleteTodo.bind(this)}/>;
      });

      let is_loaded:boolean = this.state.is_loaded;
      let list_count:number = this.state.toDoList.length;
      let is_issue_completed:boolean = this.state.is_issue_completed;
      let  marquee_text:string = '現在、未解決の課題はありません'
      //console.log("is_loaded:" + is_loaded);
      //console.log("list_count:" + list_count);
      //console.log("is_issue_completed:" + is_issue_completed);
      return (
           
          <div>
            {(() => {
                if (is_loaded && !this.state.is_issue_completed){
                  return <><Input parentMethod ={this.addTodo.bind(this)}/><div className="contents-box bg_gray">{todos}</div></>;
                } else if (is_loaded && this.state.is_issue_completed) {
                  return <><Input parentMethod ={this.addTodo.bind(this)}/><div className="contents-box bg_white marquee_box"><p className="target">{marquee_text}</p></div></>;
                } else {
                  return <div className="loader">Loading...</div>;
                }
              
              })()}
        
           </div>
      );
    }

}