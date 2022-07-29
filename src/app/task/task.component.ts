import { LocalserviceService } from './../localservice.service';
import { Component, OnInit ,Input, Inject} from '@angular/core';
interface mytask{
  id:number;
  name:string;
};
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskList!:mytask[];
  mytask!:any;
  doneTask!:mytask[];
  donecheck:boolean;
  constructor(@Inject(LocalserviceService) private localst:LocalserviceService) {
    let dl= this.localst.getData('doing');
    if(dl!=null){
      this.taskList=JSON.parse(dl);
    }
    else{
      this.taskList=[]
    }
    let dn=this.localst.getData('done');
    if(dn!=null){
      this.doneTask=JSON.parse(dn);
    }
    else{
      this.doneTask=[]
    }
    this.donecheck=true;
   }
  ngOnInit(): void {
  }
  Delete(a:any):void{
    for(let i=0;i<this.taskList?.length;i++){
      if(this.taskList[i].id==a){
        this.taskList?.splice(i,1);
      }
    }
    for(let i=0;i<this.doneTask?.length;i++){
      if(this.doneTask[i].id==a){
        this.doneTask?.splice(i,1);
      }
    }
    let doing=JSON.stringify(this.taskList);
    this.localst.saveData('doing',doing);
    let done=JSON.stringify(this.doneTask);
    this.localst.saveData('done',done);
  }
  newTask():void{
    let a:number;
    a=this.taskList?.length;
    console.log(a)
    let id=a+1;
    let task=this.mytask;
    this.mytask='';
    this.taskList?.push({id:id,name:task});
    let doing=JSON.stringify(this.taskList);
    this.localst.saveData('doing',doing);
 
  }
  markDone(e:any,id:any):void{
    if(e.target.checked){
      for(let i=0;i<this.taskList?.length;i++){
        if(this.taskList[i].id==id){
          this.doneTask.push(this.taskList[i]);
          this.taskList?.splice(i,1);
        }
      }   
    }
    let doing=JSON.stringify(this.taskList);
    this.localst.saveData('doing',doing);
    let done=JSON.stringify(this.doneTask);
    this.localst.saveData('done',done);0
  }
  markUndone(e:any,id:any):void{
    if(!(e.target.checked)){
      for(let i=0;i<this.doneTask?.length;i++){
        if(this.doneTask[i].id==id){
          this.taskList.push(this.doneTask[i]);
          this.doneTask?.splice(i,1);
        }
      }   
    }
    let doing=JSON.stringify(this.taskList);
    this.localst.saveData('doing',doing);
    let done=JSON.stringify(this.doneTask);
    this.localst.saveData('done',done);0
  }
}
