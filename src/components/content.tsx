import * as React from 'react';
import fetch from 'isomorphic-fetch';

// Propsの型定義
interface IProps {
  id: Number;
  issuesId: Number;
  textTitle: string;
  textContent: string;
  parentMethod: Function;
}

// Stateの型定義
interface IState {
  id: Number;
  issuesId: Number;
  textTitle: string;
  textContent: string;
 }
  
export class Content extends React.Component<IProps, IState> {
  constructor(process) {
    super(process);
    this.state = {
      id: this.props.id,
      issuesId : this.props.issuesId,
      textTitle : this.props.textTitle,
      textContent : this.props.textContent
    };
    
  }

  // Todoの削除
  private deleteTodo(id:Number):void {
    this.props.parentMethod(id);
  }

  render() {

    return (
        <div>
          <h2>{this.state.textTitle}(id:{this.state.id})</h2>
          <p>issues_id:{this.state.issuesId}</p>
          <p>タイトル:{this.state.textTitle}</p>
          <p>内容:{this.state.textContent}</p>
          <div onClick={e => this.deleteTodo(this.state.id)}>完了にする</div>
        </div>
    );
  }

}