import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

  isDarkMode = false;

  showAnnouncement = true;

  isAnnouncementClosing = false;

  private readonly announcementStorageKey =
    'interviewPrepAnnouncementDismissed';

  constructor() {
    this.restoreAnnouncementState();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    document.body.classList.toggle(
      'dark-theme',
      this.isDarkMode
    );
  }

  closeAnnouncement(): void {
    this.isAnnouncementClosing = true;

    window.setTimeout(() => {
      this.showAnnouncement = false;

      localStorage.setItem(
        this.announcementStorageKey,
        'true'
      );
    }, 350);
  }

  private restoreAnnouncementState(): void {
    const isDismissed = localStorage.getItem(
      this.announcementStorageKey
    );

    this.showAnnouncement = isDismissed !== 'true';
  }
}