import * as React from 'react';

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
        <div className='content'>
          <h2>{this.state.textTitle}<span className="issue_id">({this.state.issuesId})</span></h2>
          <p>{this.state.textContent}</p>
          <div className="button" onClick={e => this.deleteTodo(this.state.id)}>完了にする</div>
        </div>
    );
  }

}