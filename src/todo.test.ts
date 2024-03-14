/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToDoList } from './TodoList'

// Definindo uma tarefa de exemplo para uso nos testes
const anyTask = {
  title: 'any_title',
  description: 'any_description',
  targetDate: '01/01/2025',
  type: 'any_type',
  priority: '1',
  subTasks: []
}

describe('ToDoList', () => {
  // Testes para a função add da classe ToDoList
  describe('Testing add', () => {
    // Teste para verificar se uma nova tarefa é adicionada à lista corretamente
    test('should add a new task to the list', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([anyTask])
    })

    // Teste para verificar se uma tarefa inválida não é adicionada à lista
    test('should add a valid tasks', () => {
      const todoInstance = new ToDoList()
      const invalidValue: any = {
        invalidField: 'invalidValue'
      }
      todoInstance.add(invalidValue)
      const tasks = todoInstance.getTasks()
      expect(tasks).toEqual([])
    })
  })

  // Testes para a função removeTask da classe ToDoList
  describe('removeTask', () => {
    // Teste para verificar se uma tarefa é removida da lista corretamente
    it('should remove a task at the specified index', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask)
      todoInstance.removeTask(0);
      expect(todoInstance.getTasks()).toEqual([]);
    });

    // Verificar se a tarefa correta é removida da lista
    it('should remove the correct task', () => {
      const todoInstance = new ToDoList()
      const secondTask = {
        title: 'Second Task',
        description: 'Second Description',
        targetDate: '2024-03-12'
      };
      todoInstance.add(anyTask);
      todoInstance.add(secondTask);
      todoInstance.removeTask(0);
      expect(todoInstance.getTasks()).toEqual([secondTask]);
    });
  });
  
  // Testes para a função updateTask da classe ToDoList
  describe('updateTask', () => {
    // Teste para verificar se uma tarefa é atualizada corretamente
    it('should update a task at the specified index', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask);
      todoInstance.updateTask(0, { title: 'Updated Task' });
      expect(todoInstance.getTasks()[0].title).toBe('Updated Task');
    });

    // Verifica se os campos de atualização são mesclados corretamente
    it('should merge update fields correctly', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask);
      todoInstance.updateTask(0, {
        title: 'Updated Task',
        description: 'Updated Description'
      });
      expect(todoInstance.getTasks()[0]).toEqual({
        title: 'Updated Task',
        description: 'Updated Description',
        targetDate: '2025-01-01'
      });
    });

    // Verifica se campos não existentes não são atualizados
    it('should not update non-existing fields', () => {
      const todoInstance = new ToDoList()
      todoInstance.add(anyTask);
      todoInstance.updateTask(0, { priority: 'High' });
      expect(todoInstance.getTasks()[0].priority).toBeUndefined();
    });
  });
});
