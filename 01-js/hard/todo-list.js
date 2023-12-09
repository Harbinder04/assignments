/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.task = []; 
  }
 add(todo){
   this.task.push(todo);
 }

 remove(indexOfTodo){
  if(indexOfTodo >= 0 && indexOfTodo < this.task.length){
    this.task.splice(indexOfTodo, 1);
  }
 }

 update(index, updateTodo){
  if(index >= 0 && index < this.task.length)
  this.task[index] = updateTodo;
 }

 getAll(){
  return this.task;
 }

 get(indexOfTodo){
  if(indexOfTodo >= 0 && indexOfTodo < this.task.length)
  return this.task[indexOfTodo];
else
 return null;
 }

 clear(){
  this.task = [];
 }
}

module.exports = Todo;
