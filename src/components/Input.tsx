import * as React from 'react';
import fetch from 'isomorphic-fetch';

// Propsの型定義
interface IProps {
  parentMethod: Function;
}

interface IState {
  textTitle: string;
  textContent: string;
  parentMethod: Function;
}


export class Input extends React.Component<IProps, IState> {
  constructor(process) {
    super(process);
    this.state = {
      textTitle : '',
      textContent : '',
      parentMethod: this.props.parentMethod
    };
  
  }

  // ToDoを追加
  private addTodo() : void {
    // TodoListの処理を実行
    this.props.parentMethod({
      textTitle: this.state.textTitle,
      textContents:
      this.state.textContent
    });

    // Stateのタイトルと内容の値を初期化
    this.setState(
      {
        textTitle : '',
        textContent : ''
      })
  }
  
  render() {
    return (
        <div id= "form">
            <form>
                <input name="title" type="text" placeholder="課題のタイトル ※必須" 
                  value={this.state.textTitle}
                  onChange={e => this.setState({textTitle: e.target.value})}
                  defaultValue="課題のタイトル" /><br/>
                <textarea name="contents" placeholder="内容を入力" defaultValue="内容を入力してください"
                  value={this.state.textContent}
                  onChange={e => this.setState({textContent: e.target.value})}></textarea><br/>
                {(() => {
                  if (this.state.textTitle != '' && this.state.textContent != '')
                    return <div onClick={() => this.addTodo()}>追加</div>;
                })()}
            </form>
        </div>
    );
  }

}