export class Task {
    _id:string;
    subject:string;
    issue:string;
    history:object;
    owner:string;
    //messages:Message[];
}

export function workflow(x?){
  console.log("Workflow executed.");
  if(typeof x == "object"){
    let y = x
    y.state = y.history[y.history.length - 1]; // append current state time and its code
    y.state.phase = model.findIndex((state)=>state.code==y.state.code); // where in workflow
    return y;
  }else if(typeof x == "number"){
    return model[x];
  }else{
    return model;
  }
}

const model = [
  {code:"A",name:"Draft",icon:"📜"},
  {code:"B",name:"Queued",icon:"🗃️"},
  {code:"C",name:"Processing",icon:"⚙️"},
  {code:"D",name:"Testing",icon:"🧪"},
  {code:"E",name:"Resolved",icon:"🎉"}
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
