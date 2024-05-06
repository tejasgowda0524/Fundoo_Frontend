import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import { DataService } from 'src/app/services/dataService/data.service';
import { NoteService } from 'src/app/services/noteService/note.service';
import { UserService } from 'src/app/services/userService/user.service';

import {OTHER_MENU_ICON,MENU_ICON,SEARCH_ICON ,REFRESH_ICON,LIST_VIEW_ICON,SETTING_ICON,MORE_ICON} from 'src/assets/svg-icons';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  drawerState:boolean=false;
  subscription!:Subscription
  searchString:string=''
  Name:string=''
  Email:string=''
  constructor(private domSanitizer:DomSanitizer,private matIconRegistry:MatIconRegistry,private dataService : DataService,private route:Router,private noteService:NoteService) { 
    matIconRegistry.addSvgIconLiteral("menu-icon", domSanitizer.bypassSecurityTrustHtml(MENU_ICON)),
    matIconRegistry.addSvgIconLiteral("search-icon", domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    matIconRegistry.addSvgIconLiteral("refresh-icon", domSanitizer.bypassSecurityTrustHtml(REFRESH_ICON)),
    matIconRegistry.addSvgIconLiteral("setting-icon", domSanitizer.bypassSecurityTrustHtml(SETTING_ICON))
    matIconRegistry.addSvgIconLiteral("list-view-icon", domSanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON))
    matIconRegistry.addSvgIconLiteral("other-menu-icon", domSanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON))
   }

  ngOnInit(): void {
    this.subscription=this.dataService.currDrawerState.subscribe(res=>this.drawerState=res)
  }
  handleDrawerClick()
  {
   this.dataService.toggleDrawerState(!this.drawerState) 
  }

  handleSearchString(){
    this.dataService.updateSearchString(this.searchString)
 }
 
 handleLogout()
 {
  this.route.navigate([""])
  localStorage.clear()
 }

setNameAndEmail()
 {
  this.noteService.getNameAndEmailApiCall().subscribe(res=>{this.Name=res.firstName,this.Email=res.emailId
    console.log(res);
    
  },err=>console.log(err) 
  
  )
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
