import { Pipe, PipeTransform } from '@angular/core';
import { Task, workflow } from '../classes/task';

@Pipe({
  name: 'workflow'
})
export class WorkflowPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return workflow(value);
  }
}
