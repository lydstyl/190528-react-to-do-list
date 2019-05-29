import React from 'react';
import './App.css';

const Add = (props) => {
  return(
    <div>
      <input type="text"/>
      <button onClick={props.onAdd}>+</button>
    </div>
  )
}

const Todos = (props) => {
  let list = props.list;
  list = list.map((todo, index) =>{
    return(
      <li key={index} id={index}>
        {todo}
        <button onClick={props.onRemove}>x</button>
        <button onClick={props.onEdit}>edit</button>
        <button onClick={props.onUp}>up</button>
      </li>
    )
  })

  return(
    <ul>
      {list}
    </ul>
  )
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      list: ['un', 'deux', 'trois'],
    }
  }

  handleAdd (e){
    const newList = [...this.state.list];
    const input = e.target.parentNode.childNodes[0];
    const editIndex = input.getAttribute('edit-index');
    if (editIndex) {
      newList[editIndex] = input.value;
      input.removeAttribute('edit-index');
      input.value = '';
      this.setState({
        list: newList,
      })
    }else{
      this.setState({
        list: [input.value, ...newList],
      })
    }
  }
  handleRemove (e){
    const index = e.target.parentNode.getAttribute('id');
    const newList = [...this.state.list];
    newList.splice(index,1);
    
    this.setState({
      list: newList,
    });
  }

  handleEdit (e){
    const index = e.target.parentNode.getAttribute('id');
    const addInput = document.querySelector('input');
    addInput.setAttribute('edit-index', index)
    addInput.value = this.state.list[index];
    addInput.focus();
  }

  handleUp(e){
    const index = e.target.parentNode.getAttribute('id');
    const newList = [...this.state.list];
    const liToMoveVal = newList[index];
    const liFuturPlaceVal = newList[index - 1];
    newList[index - 1] = liToMoveVal;
    newList[index] = liFuturPlaceVal;
    this.setState({
      list: newList,
    });
  }

  render() {
    return (
      <div className="App">
        <Add onAdd={(e) => { this.handleAdd(e)}} />
        <Todos 
          list={this.state.list}
          onRemove={(e)=>{this.handleRemove(e)}}  
          onEdit={(e)=>{this.handleEdit(e)}}
          onUp={(e)=>{this.handleUp(e)}}
        />
      </div>
    );
  }
}

export default App;