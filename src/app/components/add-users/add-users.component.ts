import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  data : any;
  form: FormGroup;

  constructor(private userService : UserService , private router: Router) {
      this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {

  }

  submit(){
    if (this.form.valid) {
      const data = this.form.value;
      console.log(data);

      this.userService.create(data).subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }
 }
}
