// import { Component, OnInit } from '@angular/core';
// import { MatIconRegistry } from '@angular/material/icon';
// import { DomSanitizer } from '@angular/platform-browser';
// import { ARCHIVE_ICON, BRUSH_ICON, EDIT_ICON, IMG_ICON, LIST_VIEW_ICON, NOTE_ICON, REMINDER_ICON, SEARCH_ICON, TICK_ICON, TRASH_ICON } from 'src/assets/svg-icons';

// @Component({
//   selector: 'app-create-note',
//   templateUrl: './create-note.component.html',
//   styleUrls: ['./create-note.component.scss']
// })
// export class CreateNoteComponent implements OnInit {

//   constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
//     iconRegistry.addSvgIconLiteral("note-icon", sanitizer.bypassSecurityTrustHtml(NOTE_ICON))
//     iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
//     iconRegistry.addSvgIconLiteral("edit-icon", sanitizer.bypassSecurityTrustHtml(EDIT_ICON))
//     iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
//     iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
//     iconRegistry.addSvgIconLiteral('search-icon', sanitizer.bypassSecurityTrustHtml(SEARCH_ICON))
//     iconRegistry.addSvgIconLiteral('list-icon', sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
//     iconRegistry.addSvgIconLiteral('tick-icon', sanitizer.bypassSecurityTrustHtml(TICK_ICON))
//     iconRegistry.addSvgIconLiteral('img-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON))
//     iconRegistry.addSvgIconLiteral('brush-icon', sanitizer.bypassSecurityTrustHtml(BRUSH_ICON))
    

//   }
    
//   ngOnInit(): void {
//   }

// }

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Action } from 'rxjs/internal/scheduler/Action';
import { NoteService } from 'src/app/services/noteService/note.service';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON } from 'src/assets/svg-icons';
import { NoteObj } from 'src/assets/type';

@Component({
  selector: 'app-create-note',
  templateUrl:'./create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  title: string = ""
  description: string = ""

  createNote : boolean=false;
  showMsg: boolean = false; 

  @Output() handleUpdateList=new EventEmitter<{action: string, data: NoteObj}>()
 


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private noteService:NoteService) {
    iconRegistry.addSvgIconLiteral("list-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
  }

  ngOnInit(): void {
  }


  // handleCreateNote(value:String){
  //   // if(value=='close')
  //   //   {
  //   //     this.noteService.createNoteApiCall({title:this.title,description:this.description}).subscribe(res=>{
  //   //       this.updateList.emit(res)
  //   //     })
  //   //   }
    



  //   // this.createNote=!this.createNote
  //   this.showMsg=!this.showMsg
  // }

  handleCreateNote(action: string){
    this.showMsg = !this.showMsg

    if(action === 'open' || this.title==="" || this.description==="") return

    this.noteService.createNoteApiCall({title: this.title, description: this.description}).subscribe(res => {
      console.log(res.data)
      this.handleUpdateList.emit({action: "create", data: res.data})
      })
  }


}