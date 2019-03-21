import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private notifier: NotifierService,
  ) {
  }

  ngOnInit() {
  }

  logout() {
    this.spinner.show();
    this.authenticationService.logout().subscribe(
      (data) => {
        this.spinner.hide();
        this.notifier.notify('success', 'You have been logged out');
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        this.spinner.hide();
        this.notifier.notify('error', 'Ops! We could not reach the server, Try again.');
      }
    );
  }
}
