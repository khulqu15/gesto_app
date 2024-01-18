import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template:
    '<ion-list><ion-item *ngfor="let team of teams$ | async">{{ team.id }}</ion-item></ion-list>',
})
export class UsersPage implements OnInit {
  teams$: Observable<any[]>;
  public theme: String = 'dark';
  constructor(private db: AngularFireDatabase) {
    this.teams$ = this.db.list('data/teams').valueChanges();
  }
  changeTheme(e: any) {
    if (this.theme == 'dark') this.theme = 'light';
    else this.theme = 'dark';
    const html: HTMLElement | null = document.querySelector('html');
    html?.setAttribute('data-theme', this.theme.toString());
    localStorage.setItem('theme', this.theme.toString());
  }
  ngOnInit(): void {
    const theme_data = localStorage.getItem('theme');
    if (theme_data != undefined && theme_data != null) this.theme = theme_data;
  }
}
