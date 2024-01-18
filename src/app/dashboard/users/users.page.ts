import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Database, getDatabase, ref, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class UsersPage implements OnInit {
  public teams: any;
  public numberOfTeams: number = 0;
  private database: Database = inject(Database);
  public theme: String = 'dark';
  constructor() {
    const db: any = getDatabase();
    const dataRef: any = ref(db, 'data/teams');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      this.teams = data ? Object.values(data) : [];
      this.numberOfTeams = this.teams.length;
    });
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
