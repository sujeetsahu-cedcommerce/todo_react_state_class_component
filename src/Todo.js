
import React, { Component } from "react";

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input_value:"",
      get_index_id:"",
      incomplete: [],
      complete: [],
      get_array_name:""
    };
  }

  Getvalue = (event) => {
    this.setState({
      input_value: event.target.value,
    });
    console.log(this.state.input_value)
  };

  Add = () => {
    this.setState({
      incomplete: [...this.state.incomplete, this.state.input_value],
    });
    // console.log(this.state.incomplete);
  };

  Add_to_Completed = (event) => {
    event.preventDefault()
    //alert(event.target.id)
    this.setState({
    //   get_index_id: event.target.id,
      complete: [...this.state.complete, this.state.incomplete[event.target.id]]
    });
   
    this.state.incomplete.splice(event.target.id, 1);
    console.log(this.state.incomplete);
    // console.log(this.state.complete);
  };

  delete_incomplete_Data = (event) => {
      event.preventDefault()
      this.state.incomplete.splice(event.target.id, 1);
      this.setState({
        incomplete:this.state.incomplete
      });
  } 

  delete_Completed_Data = (event) => {
    event.preventDefault()
    this.state.complete.splice(event.target.id, 1);
    this.setState({
        complete:this.state.complete
    });
  }

  edit_data = (event) => {
    document.getElementById("add_button").hidden=true;
    document.getElementById("update_button").hidden=false;

    event.preventDefault()
    let class_edit = event.target.className;
    // alert(class_edit);
    var i = event.target.id;
    // alert(i);
    this.state.get_index_id=i;
    this.state.get_array_name=class_edit;
    if(class_edit === 'edit_incomplete'){
        document.getElementById("new-task").value=this.state.incomplete[event.target.id];
        this.setState({
            input_value:this.state.incomplete[event.target.id],
            get_index_id:this.state.get_index_id,
            get_array_name: this.state.get_array_name
        })
    }
    else{
        document.getElementById("new-task").value=this.state.complete[event.target.id];
        this.setState({
            input_value: this.state.complete[event.target.id],
            get_index_id:this.state.get_index_id,
            get_array_name: this.state.get_array_name
        })
    }
    // alert(this.state.get_index_id);
    // alert(this.state.get_array_name);
  }

  Update = () => {
    document.getElementById("add_button").hidden=false;
    document.getElementById("update_button").hidden=true;
    // alert(this.state.get_index_id);
    // alert(this.state.get_array_name);
    // alert(this.state.input_value);
    if(this.state.get_array_name==='edit_incomplete'){
        this.state.incomplete[this.state.get_index_id] = this.state.input_value
        this.setState({
        //   incomplete: [this.state.incomplete[this.state.get_index_id],this.state.input_value]
        })
    }
    else{
        this.state.complete[this.state.get_index_id] = this.state.input_value
        this.setState({
            // complete: [this.state.complete[this.state.get_index_id],this.state.input_value]
        })
    }  
  }

  render() {
    return (
      <div className="container">
        <h2>TODO LIST</h2>
        <h3>Add Item</h3>
        <p>
          <input id="new-task" onChange={this.Getvalue} type="text"/>
          <button id="add_button" onClick={this.Add}>Add</button>
          <button id="update_button" onClick={this.Update} hidden>update</button>
        </p>
        <h3>Todo</h3>
        <ul id="incomplete-tasks">
          {this.state.incomplete.map((item, index) => (
            <li>
              <input type="checkbox" className="check" id={index} onClick={this.Add_to_Completed} />
              <label>{item}</label>
              <input type="text" />
              <button className="edit_incomplete" onClick={this.edit_data} id={index}>Edit</button>
              <button className="delete" onClick={this.delete_incomplete_Data} id={index}>Delete</button>
            </li>
          ))}
        </ul>

        <h3>Completed</h3>
        <ul id="completed-tasks">
          {this.state.complete.map((item, index) => (
            <li>
              <input type="checkbox" checked />
              <label>{item}</label>
              <input type="text" />
              <button className="edit" onClick={this.edit_data} id={index}>Edit</button>
              <button className="delete" onClick={this.delete_Completed_Data} id={index}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
