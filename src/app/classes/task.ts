export class Task {
    _id:string;
    subject:string;
    issue:string;
    history:object;
    owner:string;
    //messages:Message[];
}

export function workflow(x){
  console.log("Workflow executed.");
  if(typeof x == "object"){
    x.state = x.history[x.history.length - 1]; // append current state time and its code
    x.state.phase = model.findIndex((state)=>state.code==x.state.code); // where in workflow
  }
  if(typeof x == "number"){
    return model[x]; // chain with .name or .code, or adjust the number to obtain neighbors
  }
}

const model = [
  {code:"A",name:"Draft"},
  {code:"B",name:"Queued"},
  {code:"C",name:"Processing"},
  {code:"D",name:"Testing"},
  {code:"E",name:"Resolved"}
]

/*
workflow(task) load with properties, run as the task called from the server
task.state.time // entered the state
workflow(task.state.phase).name // describe the state it occupies
workflow(task.state.phase + 1).code // what gets saved next in the history as it's advanced
*/

/*
issues:
- can't call workflow directly from the frontend without redeclaring
- frontend executes repeatedly on screen update
*/

/*
export class Task {
  constructor(
    public subject: string,
    public issue: string,
    public maturity: number,
    //public messages: Message[],
    public _id?: string
  ){}
}
*/
